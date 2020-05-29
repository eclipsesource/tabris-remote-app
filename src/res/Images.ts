import { ImageValue } from 'tabris';
import { inject, shared } from 'tabris-decorators';
import { ImageProvider } from '../services/ImageProvider';
import { isIos } from '../helper';

@shared export class Images {

  constructor(@inject protected imageProvider: ImageProvider) { }

  public exampleGalleryTabImage: ImageValue = this.imageProvider.getImage('widgets-black-24dp@3x');
  public aboutTabImage: ImageValue = this.imageProvider.getImage('info-black-24dp@3x');
  public aboutTabFeedbackIcon: ImageValue = this.imageProvider.getImage('feedback-white-24dp@3x');
  public aboutTabTabrisVersionIcon: ImageValue = this.imageProvider.getImage('tabris-logo-black-24dp@3x');
  public aboutTabAppVersionIcon: ImageValue = this.imageProvider.getImage('device-black-24dp@3x');
  public aboutTabAppVersionCodeIcon: ImageValue = this.imageProvider.getImage('device-black-24dp@3x');
  public aboutTabPluginsIcon: ImageValue = this.imageProvider.getImage('cordova-black-24dp@3x');
  public urlViewScanQrCode: ImageValue = this.imageProvider.getImage('qrcode-scan-black-24dp@3x');
  public urlViewDetailsCloseIcon: ImageValue = this.imageProvider.getImage('arrow-back-black-24dp@3x', true);
  public urlViewTabrisLogo: ImageValue = this.imageProvider.getImage(isIos() ? 'tabris-logo-black-32dp@3x' : 'tabris-logo-black-40dp@3x');
  public urlViewLaunchIcon: ImageValue = this.imageProvider.getImage('send-black-24dp@3x');
  public docsLink: ImageValue = this.imageProvider.getImage('link-external-black-24dp@3x');
  public codeLink: ImageValue = this.imageProvider.getImage('code-black-24dp@3x');
  public close: ImageValue = this.imageProvider.getImage('close-black-24dp@3x');
  public history: ImageValue = this.imageProvider.getImage('history-black-24dp@3x');
  public edit: ImageValue = this.imageProvider.getImage('edit-url-black-24dp@3x');
  public devConsoleTabImage: ImageValue = this.imageProvider.getImage('onboarding-dev-console@3x');
  public next: ImageValue = this.imageProvider.getImage('next-black-24dp@3x');
  public navigationBarProgress: ImageValue = this.imageProvider.getImage('navbar-progress-8dp@3x');
  public onboardingTabrisLogo: ImageValue = this.imageProvider.getImage('onboarding-tabris-logo@3x');

}
