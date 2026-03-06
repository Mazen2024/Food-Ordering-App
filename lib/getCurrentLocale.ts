import { Locale } from "@/i18n.config";
import { headers } from "next/headers";

/// Handle Fetch Current Locale
export const getCurrentLocale = async () => {
  /// Get New Url Item In Proxy
  let url = (await headers()).get("x-url");

  /// Split To / (Get Language Name)
  const locale = url?.split("/")[3] as Locale;
  return locale;
};
