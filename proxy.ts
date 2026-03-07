import { NextRequest, NextResponse } from "next/server";
import { match as matchLocale } from "@formatjs/intl-localematcher";
import Negotiator from "negotiator";
import { i18n, LanguageType } from "./i18n.config";

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

export default async function proxy(request: NextRequest) {
  /// Fetch Header Of Request & Variable Store
  const requestHeaders = new Headers(request.headers);  

  /// Set New Header Item To request
  requestHeaders.set("x-url", request.url);

  const pathname = request.nextUrl.pathname;

  const pathnameIsMissingLocale = i18n.locales.every(
    (locale) => !pathname.startsWith(`/${locale}`),
  );

<<<<<<< HEAD
    // لو المستخدم داخل على /
=======
      // لو المستخدم داخل على /
>>>>>>> 7848054cbcfd6b9462df974c957010197f910bfd
  if (pathname === "/") {
    return NextResponse.redirect(new URL("/en", request.url));
  }
  
  // // Redirect if there is no locale
  // if (pathnameIsMissingLocale) {
  //   const locale = getLocale(request);
  //   return NextResponse.redirect(new URL(`/${locale}${pathname}`, request.url));
  // }

  // // Redirect if there is no locale
  // if (pathnameIsMissingLocale) {
  //   const locale = getLocale(request);
  //   return NextResponse.redirect(new URL(`/${locale}${pathname}`, request.url));
  // }

  return NextResponse.next({
    request: {
      headers: requestHeaders,
    },
  });
}

export const config = {
  matcher: [
    // Skip all internal paths (_next , /api)
    "/((?!api|_next/static|_next/image|favicon.ico|robots.txt|sitemap.xml).*)",
    // Optional: only run on root (/) URL
    // '/'
  ],
};
