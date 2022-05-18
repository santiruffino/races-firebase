export const environment = {
  production: true,
  firebaseConfig : {
    apiKey: process.env["API_KEY"],
    authDomain: "races-app-534ee.firebaseapp.com",
    databaseURL: process.env["DATABASE_URL"],
    projectId: "races-app-534ee",
    storageBucket: "races-app-534ee.appspot.com",
    messagingSenderId: process.env["MESSAGING_SENDER_ID"],
    appId: "1:891836155528:web:90cfc8a8d82fd79b1c013d",
    measurementId: process.env["MEASUREMENT_ID"]
  }
};
