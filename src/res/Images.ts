import { inject, shared } from 'tabris-decorators';
import { ImageProvider } from '../services/ImageProvider';
import { isIos } from '../helper';

@shared export class Images {

  constructor(@inject protected imageProvider: ImageProvider) { }

  public exampleGalleryTabImage: Image = this.imageProvider.getImage('widgets-black-24dp@3x');
  public aboutTabImage: Image = this.imageProvider.getImage('info-black-24dp@3x');
  public aboutTabFeedbackIcon: Image = this.imageProvider.getImage('feedback-white-24dp@3x');
  public aboutTabTabrisVersionIcon: Image = this.imageProvider.getImage('tabris-logo-black-24dp@3x');
  public aboutTabAppVersionIcon: Image = this.imageProvider.getImage('device-black-24dp@3x');
  public aboutTabAppVersionCodeIcon: Image = this.imageProvider.getImage('device-black-24dp@3x');
  public aboutTabPluginsIcon: Image = this.imageProvider.getImage('cordova-black-24dp@3x');
  public aboutTabNpmModulesIcon: Image = this.imageProvider.getImage('npm-black-24dp@3x');
  public urlViewScanQrCode: Image = this.imageProvider.getImage('qrcode-scan-black-24dp@3x');
  public urlViewDetailsCloseIcon: Image = this.imageProvider.getImage('arrow-back-black-24dp@3x', true);
  public urlViewTabrisLogo: Image = this.imageProvider.getImage(isIos() ? 'tabris-logo-black-32dp@3x' : 'tabris-logo-black-40dp@3x');
  public urlViewLaunchIcon: Image = this.imageProvider.getImage('send-black-24dp@3x');
  public docsLink: Image = this.imageProvider.getImage('link-external-black-24dp@3x');
  public codeLink: Image = this.imageProvider.getImage('code-black-24dp@3x');
  public close: Image = this.imageProvider.getImage('close-black-24dp@3x');
  public history: Image = this.imageProvider.getImage('history-black-24dp@3x');
  public edit: Image = this.imageProvider.getImage('edit-url-black-24dp@3x');

}
