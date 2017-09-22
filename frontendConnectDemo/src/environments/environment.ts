// The file contents for the current environment will overwrite these during build.
// The build system defaults to the dev environment which uses `environment.ts`, but if you do
// `ng build --env=prod` then `environment.prod.ts` will be used instead.
// The list of which env maps to which file can be found in `.angular-cli.json`.

export const environment = {
  production: false,
  firebase: {
    apiKey: 'AIzaSyCJZJxpiX6n0LgiW4pEhbAoiO7yUXRHg8A',
    authDomain: 'frontendconnectdemo.firebaseapp.com',
    databaseURL: 'https://frontendconnectdemo.firebaseio.com',
    projectId: 'frontendconnectdemo',
    storageBucket: 'frontendconnectdemo.appspot.com',
    messagingSenderId: '904712463614'
  }
};
