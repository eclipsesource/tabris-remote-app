import { shared } from 'tabris-decorators';
import { isIos } from '../helper';

/* tslint:disable:max-line-length */

@shared export class Texts {

  public readonly examples: string = 'Examples';
  public readonly exampleGalleryTabHeaderDescription: string = 'Create beautiful apps faster with the build in set of high quality UI widgets.';
  public readonly about: string = 'About';
  public readonly aboutTabHeaderDescription: string = 'Tabris for Eclipse RAP is brought to you by EclipseSource.';
  public readonly aboutTabRights: string = `© ${new Date().getFullYear()} EclipseSource. All rights reserved.<br/><a href="https://tabris.com">www.tabris.com</a>`;
  public readonly feedback: string = 'Feedback';
  public readonly aboutTabFeedbackKey: string = 'Provide feedback';
  public readonly aboutTabFeedbackValue: string = 'Help us make Tabris for Eclipse RAP better.';
  public readonly versions: string = 'Versions';
  public readonly aboutTabTabrisVersionKey: string = 'Bundled tabris module';
  public readonly aboutTabAppVersionKey: string = 'App version';
  public readonly aboutTabAppVersionCodeKey: string = 'App version code';
  public readonly aboutTabPluginsHeader: string = 'Bundled cordova plugins';
  public readonly aboutTabPluginsDescription: string = '<i>To add a custom set of plugins you need to build your own app as described on <a href="https://docs.tabris.com/latest/cordova.html">www.tabris.com</a>.</i>';
  public readonly aboutTabNpmModulesHeader: string = 'Bundled npm modules';
  public readonly settings: string = 'Settings';
  public readonly aboutTabSettingsSubHeader: string = 'Gather usage data';
  public readonly aboutTabSettingsDescription: string = 'Help make Tabris for Eclipse RAP better by sending usage statistics and crash reports to EclipseSource.';
  public readonly urlViewInputMessage: string = 'Connect to remote app...';
  public readonly urlViewCameraPermissionError: string = 'To use the qr-code scanner the camera permission is required.';
  public readonly ok: string = 'OK';
  public readonly urlViewCameraAuthorizationError = (error: any) => `Could not request camera permission. ${error}`;
  public readonly cancel: string = 'Cancel';
  public readonly urlViewQrCodeScanError = (message: string) => `Scanning qr-code failed with error: ${message}`;
  public readonly showSnippets: string = '<ins>Show Snippets</ins>';
  public readonly invalidUrlError = (appUrl: string) => `The url "${appUrl}" is not valid.`;
  public readonly connectionFailed: string = 'Connection failed';
  public readonly loadError = (url: string, status: number) => `Could not load file: ${url}` + (status !== 0 ? `\n\nStatus code: ${status}` : '');
  public readonly error: string = 'Error';
  public readonly devConsoleTabMessage: string = 'Use the developer console to get insights into your app';
  public readonly devConsoleTabSubMessage: string = `Swipe from the right edge ${isIos() ? 'of the main screen ' : '\n'}to open the developer console.`;
  public readonly welcomeTabMessage: string = 'Welcome to Tabris for Eclipse RAP';
  public readonly welcomeTabSubMessage: string = 'Mobile development\nwith confidence.';
  public readonly skip: string = 'Skip';
  public readonly next: string = 'Next';
  public readonly done: string = 'Done';
  public readonly cannotOpenExampleSourceError = (fileName: string) => `Can not open example ${fileName}.`;
  public readonly cannotOpenDocumentationError: string = 'Can not open documentation.';

}
