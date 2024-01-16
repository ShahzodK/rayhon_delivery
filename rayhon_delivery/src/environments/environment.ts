import { ELocales } from "src/app/shared/enums/ELocales";

export const environment = {
    production: false,
    locales: Object.keys(ELocales),
    defaultLocale: ELocales.RU,
    firebase: {
      apiKey: "AIzaSyDQIyGrSs0e5Kv9taxnyfvJrOrn4tZ6r-A",
      authDomain: "rayhon-milliy.firebaseapp.com",
      projectId: "rayhon-milliy",
      storageBucket: "rayhon-milliy.appspot.com",
      messagingSenderId: "625289778437",
      appId: "1:625289778437:web:99de50a0e5b8ff8220136c",
      measurementId: "G-PNM10MHBB8",
      vapidKey: "BDOS9S2GTF0RWXBD6RnrLZX5tRDL5d0wrbC5cUXjxiJf_bUNwW7SNZDWTsyMlEYWMmbFSdtY3JIZRAgt2y_8naM"
    }
  };