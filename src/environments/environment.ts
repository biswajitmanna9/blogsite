// The file contents for the current environment will overwrite these during build.
// The build system defaults to the dev environment which uses `environment.ts`, but if you do
// `ng build --env=prod` then `environment.prod.ts` will be used instead.
// The list of which env maps to which file can be found in `.angular-cli.json`.

export const environment = {
  production: false,
  firebase: {
    apiKey: "AIzaSyCn_l_mayVtpcwXscOASA8xhAr0hi7Cs8I",
    authDomain: "angular-auth-5a44a.firebaseapp.com",
    databaseURL: "https://angular-auth-5a44a.firebaseio.com",
    projectId: "angular-auth-5a44a",
    storageBucket: "angular-auth-5a44a.appspot.com",
    messagingSenderId: "299801575273"
  },
  GoogleOAuthClientId: "299801575273",
  FacebookAppId: "299801575273"
};
