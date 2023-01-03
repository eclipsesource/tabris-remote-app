Tabris for RAP App Launcher
===========================

This app can be used to connect to any Tabris/RAP server for testing/development.
It can also serve as a template for your own customized Tabris/RAP app launcher or Tabris/Tabris.js hybrid app.

[Tabris for RAP](http://developer.eclipsesource.com/tabris/docs/) (aka. "Tabris" or "Tabris/RAP") is a [RAP framework](http://eclipse.org/rap) extension targeting Android, iOS and Windows 10. It is distinct from [Tabris.js](http://tabrisjs.com), which provides only JavaScript API. Tabris for RAP provides Java API, but the launcher is based on Tabris.js and therefore needs to be written in JavaScript or TypeScript.

How to build the launcher:
1. Get access to `npm.tabrisjs.com`. Contact [EclipseSource](https://eclipsesource.com/about/contact-us/) for details.
2. Log in on [tabrisjs.com](http://tabrisjs.com) using your GitHub credentials.
3. Add this repository or a fork of it to "My Apps" as described [here](https://tabrisjs.com/documentation/latest/build.html#build-service).
4. Create an NPM token for `npm.tabrisjs.com`, e.g. via the [npm CLI](http://nodejs.org):

`npm adduser --registry https://npm.tabrisjs.com`

The token is stored in the user home directory file `.npmrc` and looks something like this:

```
registry=https://npm.tabrisjs.com/
//npm.tabrisjs.com/:_authToken="<token>"
```

5. On tabrisjs.com go the the settings of the app and add an environment Variable `NPM_TOKEN` with the token as the value.
6. Still in the settings, select the correct Tabris.js Version that fits the `tabris-js-remote` dependency specified in the `package.json` of this repository:

| tabris-js-remote        | Tabris/RAP    | RAP     | Tabris.js              |
|-------------------------|---------------|---------|------------------------|
| 3.2.0-beta1             | 3.2.0 nightly | 3.2.0   | 2.0-RC2                |
| >=3.2.0-beta1-nightly.0 | 3.2.0 nightly | 3.2.0   | 2.x-nightly            |
| 3.2.0-beta2             | 3.2.0 nightly | 3.2.0   | 2.0.0                  |
| 3.2.0-beta3             | 3.2.0 nightly | 3.2.0   | 2.0.0 or 2.1.0-nightly |
| 3.2.0-beta4             | 3.2.0 nightly | 3.2.0   | 2.1.0 or 2.1.0-nightly |
| 3.4.0-beta1             | 3.4.0 nightly | 3.4.0   | 2.4.x                  |
| 3.5.0                   | 3.5.0 nightly | 3.5.0   | 2.6.2                  |
| 3.6.0-beta1             | 3.6.0 nightly | 3.6.0   | 2.6.2                  |
| 3.6.0                   | 3.6.0         | 3.6.0   | 2.7.0                  |
| 3.6.19                  | 3.6.0         | 3.6.0   | 2.8.1                  |
| 3.12.0                  | 3.12.0        | 3.12.0  | 3.5.0                  |
| 3.17.0                  | 3.17.0        | 3.17.0  | 3.8.0                  |

7. Build the app for the platform of your choice.
8. Download and install the app and connect to your Tabris/RAP server.

