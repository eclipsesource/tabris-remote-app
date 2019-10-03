import {
  AlertDialog, Composite, ImageView, Popover, Properties,
  TextInput, Widget, app, CollectionView, TextView, Bounds, permission
} from 'tabris';
import { component, getById, inject, create } from 'tabris-decorators';
import { contentTopOffset, isIos } from '../helper';
import { Colors } from '../res/Colors';
import { Images } from '../res/Images';
import { Fonts } from '../res/Fonts';
import { Texts } from '../res/Texts';
import ScrollReceiver from './ScrollReceiver';
import AppLauncher from '../AppLauncher';
import HistoryCell from './HistoryCell';
import ActionIcon from './ActionIcon';
import Divider from './Divider';
import dimen from '../res/dimen';

// tslint:disable-next-line
declare var esbarcodescanner: any;

@component export default class UrlView extends Composite implements ScrollReceiver {

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
    @inject protected readonly colors: Colors,
    @inject protected readonly images: Images,
    @inject protected readonly fonts: Fonts,
    @inject protected readonly texts: Texts) {
    super(properties);
    this.createUi();
    app.onBackNavigation(event => {
      if (this.qrCodePopover) {
        this.closeQrCodePopover();
      } else if (this.expanded) {
        event.preventDefault();
        this.toggleExpansion();
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
      <$>
        <Composite
          id='details'
          stretch
          background={this.colors.surface}
          visible={false}>
          <Composite
            left top={dimen.urlBarTop}
            right height={dimen.urlBarHeight}
            background={this.colors.surface}>
            <ActionIcon
              id='detailsCloseIcon'
              left={dimen.xxs} centerY
              image={this.images.urlViewDetailsCloseIcon}
              onTap={() => this.toggleExpansion()} />
            <ActionIcon
              id='detailsScanQrCode'
              right={dimen.xxs} centerY
              image={this.images.urlViewScanQrCode}
              onTap={() => this.showQrCodeScanner()} />
          </Composite>
          <Divider
            id='separator'
            stretchX top={dimen.pxs}
            background={this.colors.onSurfaceDivider} />
          <CollectionView
            stretchX top={dimen.pxs} bottom
            cellType={index => index === 0 ? 'header' : 'widget'}
            createCell={() => create(HistoryCell, this.urlInput)}
            updateCell={(cell: HistoryCell, index: number) => cell.url = this.appLauncher.recentUrls[index]}
            itemCount={this.appLauncher.recentUrls.length} />
        </Composite>
        <Composite
          id='urlBar'
          left={dimen.m} top={dimen.urlBarTop} right={dimen.m} height={dimen.urlBarHeight}
          background={this.colors.surface}
          cornerRadius={dimen.urlBarCornerRadius}
          elevation={8}>
          <ImageView
            id='tabrisLogo'
            left={dimen.xs} centerY
            image={this.images.urlViewTabrisLogo}
            tintColor={this.colors.actionIcon} />
          <TextInput
            id='urlInput'
            left={dimen.pxs} right={dimen.nxs} centerY
            style='none'
            message={this.texts.urlViewInputMessage}
            textColor={this.colors.onSurface}
            floatMessage={false}
            borderColor={'transparent'}
            background={'transparent'}
            keyboard='url'
            keepFocus
            text={this.appLauncher.getLastLaunchedUrl()}
            enterKeyType='done'
            onFocus={() => this.focusGained()}
            onAccept={() => this.appLauncher.launchUrl(this.urlInput.text)} />
          <ImageView
            id='scanQrCode'
            right={dimen.xs} centerY
            tintColor={this.colors.actionIcon}
            highlightOnTouch
            image={this.images.urlViewScanQrCode}
            onTap={() => this.showQrCodeScanner()} />
          <Composite
            id='qrCodeDivider'
            width={1} top={dimen.xs} right={dimen.ns} bottom={dimen.xs}
            background={this.colors.onSurfaceDivider} />
          <ImageView
            id='launchIcon'
            right={dimen.xs} centerY
            tintColor={this.colors.actionIcon}
            highlightOnTouch
            image={this.images.urlViewLaunchIcon}
            onTap={() => this.appLauncher.launchUrl(this.urlInput.text)} />
        </Composite>
      </$>
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
      background: this.expanded ? 'initial' : this.colors.surface,
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
      this.animateMove(this.detailsScanQrCode, this.scanQrCode.absoluteBounds, this.detailsScanQrCode.absoluteBounds);
      this.animateMove(this.detailsCloseIcon, this.tabrisLogo.absoluteBounds, this.detailsCloseIcon.absoluteBounds);
    }
  }

  private animateMove(target: Widget, srcBounds: Bounds, destBounds: Bounds) {
    target.transform = { translationY: 0, translationX: srcBounds.left - destBounds.left };
    // tslint:disable-next-line: no-floating-promises
    target.animate(
      { transform: { translationX: 0, translationY: 0 } },
      { duration: 250, easing: 'ease-out' });
  }

  private showQrCodeScanner() {
    permission.withAuthorization('camera',
      () => this.showQrCodeScannerPopover(),
      () => AlertDialog.open(this.texts.urlViewCameraPermissionError),
      (error: any) => AlertDialog.open(this.texts.urlViewCameraAuthorizationError(error)));
  }

  private showQrCodeScannerPopover() {
    this.qrCodePopover = new Popover({
      width: 300, height: 400,
      anchor: this.urlInput
    }).onClose(() => this.qrCodePopover = null)
      .open();
    this.appendQrCodePopoverContent();
    // @ts-ignore
    this.qrCodePopover.contentView.find('#scanner').only(esbarcodescanner.BarcodeScannerView).start(['qr']);
  }

  private appendQrCodePopoverContent() {
    // @ts-ignore
    this.qrCodePopover.contentView.append(
      <$>
        <esbarcodescanner.BarcodeScannerView
          id='scanner'
          stretch
          scaleMode='fill'
          onDetect={(event: any) => this.handleQrCodeScanSuccess(event)}
          onError={(error: any) => this.handleQrCodeScanError(error)} />
        <TextView
          stretchX bottom height={dimen.xxxl}
          text={this.texts.cancel}
          highlightOnTouch
          textColor='white'
          alignment='centerX'
          font={this.fonts.h6}
          background='#00000070'
          onTap={() => this.closeQrCodePopover()} />
      </$>
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
