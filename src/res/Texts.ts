import { shared } from 'tabris-decorators';

/* tslint:disable:max-line-length */

@shared export class Texts {
  public readonly examples: string = 'Examples';
  public readonly exampleGalleryTabHeaderDescription: string = 'Create beautiful apps faster with the build in set of high quality UI widgets.';
  public readonly about: string = 'About';
  public readonly aboutTabHeaderDescription: string = 'Tabris.js is brought to you by EclipseSource.';
  public readonly aboutTabRights: string = `© ${new Date().getFullYear()} EclipseSource. All rights reserved.<br/><a href="https://tabris.com">www.tabris.com</a>`;
  public readonly feedback: string = 'Feedback';
  public readonly aboutTabFeedbackKey: string = 'Provide feedback';
  public readonly aboutTabFeedbackValue: string = 'Help us make Tabris.js better.';
  public readonly versions: string = 'Versions';
  public readonly aboutTabTabrisVersionKey: string = 'Bundled tabris module';
  public readonly aboutTabAppVersionKey: string = 'App version';
  public readonly aboutTabAppVersionCodeKey: string = 'App version code';
  public readonly aboutTabPluginsHeader: string = 'Bundled cordova plugins';
  public readonly aboutTabPluginsDescription: string = '<i>To add a custom set of plugins you need to build your own app as described on <a href="https://docs.tabris.com/latest/cordova.html">www.tabris.com</a>.</i>';
  public readonly aboutTabNpmModulesHeader: string = 'Bundled npm modules';
  public readonly settings: string = 'Settings';
  public readonly aboutTabSettingsSubHeader: string = 'Gather usage data';
  public readonly aboutTabSettingsDescription: string = 'Help make Tabris.js better by sending usage statistics and crash reports to EclipseSource.';
  public readonly urlViewInputMessage: string = 'Connect to Tabris.js remote app...';
  public readonly urlViewCameraPermissionError: string = 'To use the qr-code scanner the camera permission is required.';
  public readonly Ok: string = 'OK';
  public readonly urlViewCameraAuthorizationError = (error: any) => `Could not request camera permission. ${error}`;
  public readonly cancel: string = 'Cancel';
  public readonly urlViewQrCodeScanError = (message: string) => `Scanning qr-code failed with error: ${message}`;

}
