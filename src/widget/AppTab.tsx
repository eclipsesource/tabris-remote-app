import { Properties, Tab, Widget } from 'tabris';
import { Colors } from '../res/Colors';
import ScrollReceiver from './ScrollReceiver';
import { resolve } from 'tabris-decorators';

export default class AppTab extends Tab {

  public scrollReceiver: ScrollReceiver;
  public appeared: boolean;

  constructor(
    properties: Properties<Tab>) {
    super({ background: resolve(Colors).background, ...properties });
    this.on({
      appear: () => this.createUiOnce(),
      resize: () => this.resetScrollReceiver()
    });
  }

  public animateAppearance() {
    this.children().forEach((child: Widget) => {
      const translationY = this.bounds.height * 0.04;
      child.transform = { translationY: child.transform.translationY + translationY };
      child.opacity = 0;
      // tslint:disable-next-line: no-floating-promises
      child.animate({
        transform: { translationY: child.transform.translationY - translationY },
        opacity: 1
      }, {
          easing: 'ease-out',
          duration: 150
        });
    });
  }

  public onSelectWhileAppeared() {
    if (this.scrollReceiver) {
      this.scrollReceiver.resetScrollPosition(true);
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

  private resetScrollReceiver() {
    if (this.scrollReceiver) {
      this.scrollReceiver.resetScrollPosition(false);
    }
  }

}
