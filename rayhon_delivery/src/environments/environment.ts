import { ELocales } from "src/app/shared/enums/ELocales";

export const environment = {
    production: false,
    locales: Object.keys(ELocales),
    defaultLocale: ELocales.RU,
  };