// This file can be replaced during build by using the `fileReplacements` array.
// `ng build` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,
  firebaseConfig : {
    apiKey: process.env["NG_APP_API_KEY"],
    authDomain: "races-app-534ee.firebaseapp.com",
    databaseURL: "https://races-app-534ee-default-rtdb.firebaseio.com",
    projectId: "races-app-534ee",
    storageBucket: "races-app-534ee.appspot.com",
    messagingSenderId: "891836155528",
    appId: "1:891836155528:web:90cfc8a8d82fd79b1c013d",
    measurementId: "G-DDL52SKVFM"
  }
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/plugins/zone-error';  // Included with Angular CLI.
