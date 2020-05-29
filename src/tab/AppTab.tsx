import { Properties, Tab, Widget } from 'tabris';
import { resolve } from 'tabris-decorators';
import { isAndroid } from '../helper';
import { Colors } from '../res/Colors';
import ScrollReceiver from '../widget/ScrollReceiver';

export default class AppTab extends Tab {

  public scrollReceiver: ScrollReceiver;
  public appeared: boolean;

  constructor(
    properties: Properties<Tab>) {
    super({ background: resolve(Colors).background, ...properties });
    this.onAppear(() => this.createUiOnce());
    this.onResize(() => this.resetScrollReceiver(false));
    this.onReselect(() => this.resetScrollReceiver(true));
  }

  public animateAppearance() {
    if (isAndroid) {
      this.children().forEach((child: Widget) => {
        const translationY = this.bounds.height * 0.04;
        child.transform = {translationY: child.transform.translationY + translationY};
        child.opacity = 0;
        // eslint-disable-next-line @typescript-eslint/no-floating-promises
        child.animate({
          transform: {translationY: child.transform.translationY - translationY},
          opacity: 1
        }, {
          easing: 'ease-out',
          duration: 150
        });
      });
    }
  }

  protected createUi() {
    // to be implemented by subclasses
  }

  private createUiOnce() {
    if (!this.appeared) {
      this.createUi();
      this.appeared = true;
    }
  }

  private resetScrollReceiver(animated: boolean) {
    if (this.scrollReceiver) {
      this.scrollReceiver.resetScrollPosition(animated);
    }
  }

}
