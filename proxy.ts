import { NextRequest, NextResponse } from "next/server";
import { match as matchLocale } from "@formatjs/intl-localematcher";
import Negotiator from "negotiator";
import { i18n, LanguageType, Locale } from "./i18n.config";
import { withAuth } from "next-auth/middleware";
import { getToken } from "next-auth/jwt";
import { Pages, Routes } from "./contants/enums";
import { UserRoles } from "./lib/generated/prisma/enums";

/// Handle Locale Redirect To Default Locale
function getLocale(request: NextRequest): string | undefined {
  const negotiatorHeaders: Record<string, string> = {};
  request.headers.forEach((value, key) => (negotiatorHeaders[key] = value));

  const locales: LanguageType[] = i18n.locales;
  const languages = new Negotiator({ headers: negotiatorHeaders }).languages();
  let locale = "";

  try {
    locale = matchLocale(languages, locales, i18n.defaultLocale);
    // eslint-disable-next-line @typescript-eslint/no-explicit-any, @typescript-eslint/no-unused-vars
  } catch (error: any) {
    locale = i18n.defaultLocale;
  }
  return locale;
}

/// Function Proxy Wrapped With Next Auth Method To Handle Authenticated Users

export default withAuth(
  async function proxy(request: NextRequest) {
    /// Fetch Header Of Request & Variable Store
    const requestHeaders = new Headers(request.headers);

    /// Set New Header Item To request
    requestHeaders.set("x-url", request.url);

    const pathname = request.nextUrl.pathname;

    const pathnameIsMissingLocale = i18n.locales.every(
      (locale) => !pathname.startsWith(`/${locale}`),
    );

    // لو المستخدم داخل على /
    if (pathname === "/") {
      return NextResponse.redirect(new URL(i18n.defaultLocale, request.url));
    }

    // // Redirect if there is no locale
    // if (pathnameIsMissingLocale) {
    //   const locale = getLocale(request);
    //   return NextResponse.redirect(new URL(`/${locale}${pathname}`, request.url));
    // }

    /// Define Is Auth Boolean & Is Auth Page ==========> Handle Routing
    const isAuth = await getToken({ req: request });
    const currentLocale = request.url.split("/")[3] as Locale;
    const isAuthPage = pathname.startsWith(`/${currentLocale}${Routes.AUTH}`);

    /// Define Protected Routes Array Of Pages & Is Protected Boolean
    const protecteRdoutes = [Routes.ADMIN, Routes.PROFILE];
    const isProtectedRoute = protecteRdoutes.some((route) =>
      pathname.startsWith(`/${currentLocale}${route}`),
    );

    /// Case : Authenticated User && Auth Page
    if (isAuth && isAuthPage) {
      if (isAuth.role !== UserRoles.ADMIN) {
        return NextResponse.redirect(
          new URL(`/${currentLocale}${Routes.PROFILE}`, request.url),
        );
      } else {
        return NextResponse.redirect(
          new URL(`/${currentLocale}${Routes.ADMIN}`, request.url),
        );
      }
    }

    /// Case : Authenticated User && Try To Access Admin DashBoard : User Role Condition
    if (isAuth) {
      if (
        pathname.startsWith(`/${currentLocale}${Routes.ADMIN}`) &&
        isAuth.role !== UserRoles.ADMIN
      ) {
        return NextResponse.redirect(
          new URL(`/${currentLocale}${Routes.PROFILE}`, request.url),
        );
      } else if (
        pathname.startsWith(`/${currentLocale}${Routes.PROFILE}`) &&
        isAuth.role !== UserRoles.USER
      ) {
        return NextResponse.redirect(
          new URL(`/${currentLocale}${Routes.ADMIN}`, request.url),
        );
      }
    }

    /// Case : Not Authenticated User && Protected Route
    if (!isAuth && isProtectedRoute) {
      return NextResponse.redirect(
        new URL(`/${currentLocale}${Routes.AUTH}/${Pages.LOGIN}`, request.url),
      );
    }

    return NextResponse.next({
      request: {
        headers: requestHeaders,
      },
    });
  },
  {
    callbacks: {
      async authorized() {
        return true;
      },
    },
  },
);

export const config = {
  matcher: [
    // Skip all internal paths (_next , /api)
    "/((?!api|_next/static|_next/image|favicon.ico|robots.txt|sitemap.xml).*)",
    // Optional: only run on root (/) URL
    // '/'
  ],
};
