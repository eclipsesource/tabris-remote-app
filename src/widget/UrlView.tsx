import {
  AlertDialog, Composite, ImageView, Popover, Properties, TextInput, Widget, app
} from 'tabris';
import { ComponentJSX, component, getById, inject, create } from 'tabris-decorators';
import { contentTopOffset, isIos } from '../helper';
import { Images } from '../res/Images';
import { Texts } from '../res/Texts';
import ScrollReceiver from './ScrollReceiver';
import AppLauncher from '../AppLauncher';
import HistoryCell from './HistoryCell';
import ActionIcon from './ActionIcon';
import Divider from './Divider';
import color from '../res/color';
import dimen from '../res/dimen';
import font from '../res/font';

// tslint:disable-next-line
declare var esbarcodescanner: any;

@component export default class UrlView extends Composite implements ScrollReceiver {

  public jsxProperties: ComponentJSX<this>;
  @getById private urlBar: Composite;
  @getById private urlInput: TextInput;
  @getById private details: Composite;
  @getById private detailsScanQrCode: ActionIcon;
  @getById private detailsCloseIcon: ActionIcon;
  @getById private tabrisLogo: ImageView;
  @getById private scanQrCode: ImageView;
  @getById private qrCodeDivider: Composite;
  @getById private launchIcon: ImageView;
  private qrCodePopover: Popover;
  private expanded: boolean = false;

  constructor(
    properties: Properties<Composite>,
    @inject protected appLauncher: AppLauncher,
    @inject protected readonly images: Images,
    @inject protected readonly texts: Texts) {
    super(properties);
    this.createUi();
    app.on({
      backNavigation: (event) => {
        if (this.qrCodePopover) {
          this.closeQrCodePopover();
        } else if (this.expanded) {
          event.preventDefault();
          this.toggleExpansion();
        }
      }
    });
  }

  public onScroll(delta: number) {
    if (isIos()) { return; }
    let translationY = -delta + this.urlBar.transform.translationY;
    const maxUpwards = -(contentTopOffset() + dimen.urlBarHeight / 2);
    translationY = Math.min(0, Math.max(maxUpwards, translationY));
    this.urlBar.transform = { translationY };
  }

  public resetScrollPosition(animated: boolean, duration: number = 200) {
    if (isIos()) { return; }
    if (!animated) {
      this.urlBar.transform = { translationY: 0 };
      return;
    }
    this.urlBar.animate({ transform: { translationY: 0 } }, { duration: animated ? duration : 0 });
  }

  private createUi() {
    this.append(
      <widgetCollection>
        <composite
          id='details'
          left={0} top={0} right={0} bottom={0}
          background={color.surface}
          visible={false}>
          <composite
            left={0} top={dimen.urlBarTop}
            right={0} height={dimen.urlBarHeight}
            background={color.surface}>
            <ActionIcon
              id='detailsCloseIcon'
              left={dimen.xxs} centerY={0}
              image={this.images.urlViewDetailsCloseIcon}
              onTap={() => this.toggleExpansion()} />
            <ActionIcon
              id='detailsScanQrCode'
              right={dimen.xxs} centerY={0}
              image={this.images.urlViewScanQrCode}
              onTap={() => this.showQrCodeScanner()} />
          </composite>
          <Divider
            id='separator'
            left={0} top={dimen.pxs} right={0}
            background={color.onSurfaceDivider} />
          <collectionView
            left={0} top={dimen.pxs} right={0} bottom={0}
            cellType={index => index === 0 ? 'header' : 'widget'}
            createCell={() => create(HistoryCell, this.urlInput)}
            updateCell={(cell: HistoryCell, index: number) => cell.url = this.appLauncher.recentUrls[index]}
            itemCount={this.appLauncher.recentUrls.length} />
        </composite>
        <composite
          id='urlBar'
          left={dimen.m} top={dimen.urlBarTop} right={dimen.m} height={dimen.urlBarHeight}
          background={color.surface}
          cornerRadius={dimen.urlBarCornerRadius}
          elevation={8}>
          <imageView
            id='tabrisLogo'
            left={dimen.xs} centerY={0}
            image={this.images.urlViewTabrisLogo}
            tintColor={color.actionIcon} />
          <textInput
            id='urlInput'
            left={dimen.pxs} right={dimen.nxs} centerY={0}
            message={this.texts.urlViewInputMessage}
            textColor={color.onSurface}
            borderColor={'transparent'}
            background={'transparent'}
            keyboard='url'
            text={this.appLauncher.getLastLaunchedUrl()}
            enterKeyType='done'
            onTap={() => this.focusGained()}
            onAccept={() => this.appLauncher.launchUrl(this.urlInput.text)} />
          <imageView
            id='scanQrCode'
            right={dimen.xs} centerY={0}
            tintColor={color.actionIcon}
            highlightOnTouch={true}
            image={this.images.urlViewScanQrCode}
            onTap={() => this.showQrCodeScanner()} />
          <composite
            id='qrCodeDivider'
            width={1} top={dimen.xs} right={dimen.ns} bottom={dimen.xs}
            background={color.onSurfaceDivider} />
          <imageView
            id='launchIcon'
            right={dimen.xs} centerY={0}
            tintColor={color.actionIcon}
            highlightOnTouch={true}
            image={this.images.urlViewLaunchIcon}
            onTap={() => this.appLauncher.launchUrl(this.urlInput.text)} />
        </composite>
      </widgetCollection>
    );
    this.updateLaunchIconVisibility();
  }

  private focusGained() {
    this.resetScrollPosition(true, 100);
    if (!this.expanded) {
      this.toggleExpansion();
    }
    if (this.urlInput.text.length === 0) {
      this.urlInput.text = 'http://';
    }
  }

  private toggleExpansion() {
    this.expanded = !this.expanded;
    this.urlBar.set({
      elevation: this.expanded ? 0 : 8,
      background: this.expanded ? 'initial' : color.surface,
      left: this.expanded ? dimen.xxl : dimen.m,
      right: this.expanded ? dimen.xxl : dimen.m
    });
    this.tabrisLogo.visible = !this.expanded;
    this.urlInput.focused = this.expanded;
    this.details.visible = this.expanded;
    this.animateIconExpansion();
    this.updateLaunchIconVisibility();
    if (!this.expanded && !this.urlTextInputHasInput()) {
      this.urlInput.text = '';
    }
  }

  private updateLaunchIconVisibility() {
    this.launchIcon.visible = this.urlTextInputHasInput() && !this.expanded;
    this.qrCodeDivider.visible = !this.expanded && this.launchIcon.visible;
    this.scanQrCode.set({
      visible: !this.expanded,
      right: this.qrCodeDivider.visible ? dimen.nxs : dimen.xs
    });
    this.urlInput.set({
      left: this.expanded ? dimen.xs : dimen.pxs,
      right: this.expanded ? dimen.xs : dimen.nxs
    });
  }

  private urlTextInputHasInput() {
    const text = this.urlInput.text;
    return !(text.length === 0 || text === 'http://' || text === 'https://');
  }

  private animateIconExpansion() {
    if (this.expanded) {
      this.animateMove(this.detailsScanQrCode, -dimen.m);
      this.animateMove(this.detailsCloseIcon, dimen.m);
    }
  }

  private animateMove(target: Widget, translationX: number) {
    target.transform = { translationY: 0, translationX };
    // tslint:disable-next-line: no-floating-promises
    target.animate(
      { transform: { translationX: 0, translationY: 0 } },
      { duration: 250, easing: 'ease-out' });
  }

  private showQrCodeScanner() {
    // @ts-ignore
    const diagnostic = cordova.plugins.diagnostic;
    // getting the architecture from the diagnostic core module activates the core module
    // which is required to let ios properly handle the camera permission request result.
    diagnostic.getArchitecture();
    diagnostic.requestCameraAuthorization(
      (status: any) => this.cameraAuthorizationSuccess(diagnostic, status),
      (error: any) => this.cameraAuthorizationError(error),
      false);
  }

  private cameraAuthorizationSuccess(diagnostic: any, status: any) {
    if (status === diagnostic.permissionStatus.GRANTED) {
      this.showQrCodeScannerPopover();
      return;
    }
    new AlertDialog({
      message: this.texts.urlViewCameraPermissionError,
      buttons: { ok: this.texts.ok }
    }).open();
  }

  private cameraAuthorizationError(error: any) {
    new AlertDialog({
      message: this.texts.urlViewCameraAuthorizationError(error),
      buttons: { ok: this.texts.ok }
    }).open()
  }

  private showQrCodeScannerPopover() {
    this.qrCodePopover = new Popover({
      width: 300, height: 400,
      anchor: this.urlInput
    }).on('close', () => this.qrCodePopover = null)
      .open();
    this.appendQrCodePopoverContent();
    // @ts-ignore
    this.qrCodePopover.contentView.find('#scanner')
      .only(esbarcodescanner.BarcodeScannerView)
      .start(['qr']);
  }

  private appendQrCodePopoverContent() {
    // @ts-ignore
    this.qrCodePopover.contentView.append(
      <widgetCollection>
        <esbarcodescanner.BarcodeScannerView
          id='scanner'
          left={0} top={0} right={0} bottom={0}
          scaleMode='fill'
          onDetect={(event: any) => this.handleQrCodeScanSuccess(event)}
          onError={(error: any) => this.handleQrCodeScanError(error)} />
        <textView
          left={0} right={0} bottom={0} height={dimen.xxxl}
          text={this.texts.cancel}
          highlightOnTouch={true}
          textColor='white'
          alignment='center'
          font={font.h6}
          background='#00000070'
          onTap={() => this.closeQrCodePopover()} />
      </widgetCollection>
    );
  }

  private handleQrCodeScanSuccess(event: { data: string }) {
    this.closeQrCodePopover();
    let url = event.data;
    this.appLauncher.launchApp(url, appUrl => {
      this.urlInput.text = url;
      this.appLauncher.addToRecentUrls(appUrl);
    });
  }

  private handleQrCodeScanError(error: { message: string }) {
    this.closeQrCodePopover();
    new AlertDialog({
      message: this.texts.urlViewQrCodeScanError(error.message),
      buttons: { ok: this.texts.ok }
    }).open();
  }

  private closeQrCodePopover() {
    this.qrCodePopover.close();
    this.qrCodePopover = null;
  }

}
