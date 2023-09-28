import { ELocales } from "src/app/shared/enums/ELocales";

export const environment = {
    production: false,
    locales: Object.keys(ELocales),
    defaultLocale: ELocales.RU,
    firebase: {
      apiKey: "AIzaSyBQDH7nzOTrbHvPxHf2U5iNe4vnH5Z93Rw",
      authDomain: "rayhon-push-notifications.firebaseapp.com",
      projectId: "rayhon-push-notifications",
      storageBucket: "rayhon-push-notifications.appspot.com",
      messagingSenderId: "370579126482",
      appId: "1:370579126482:web:4046195260aaa0f513d50b",
      measurementId: "G-MST0W3SNMY",
      vapidKey: "BDU06qaoLqflt8t4g7R_Umpg2YZvSdgbwp895koC9_lkzgU8iWYtVhwzv8bNaM2-Pgx1jR9TT_KUG5EbQ1DA0wc"
    }
  };