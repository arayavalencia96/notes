import Cookies from "js-cookie";

export const getThemeFromCookie = (): string => {
  return Cookies.get("theme") || "light";
};

export const setThemeToCookie = (theme: string): void => {
  Cookies.set("theme", theme, { expires: 365 });
};
