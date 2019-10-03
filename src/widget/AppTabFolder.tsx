import { Properties, TabFolder } from 'tabris';
import {inject} from 'tabris-decorators';
import {Colors} from '../res/Colors';
import ScrollReceiver from './ScrollReceiver';
import AppTab from './AppTab';
import settings from '../settings';

export default class AppTabFolder extends TabFolder<AppTab> {

  private _scrollReceiver: ScrollReceiver;
  private previousTab: AppTab;

  constructor(
    properties: Properties<TabFolder>,
    @inject protected readonly colors: Colors) {
    super({
      tabBarLocation: 'bottom',
      selectedTabTintColor: colors.primary,
      ...properties
    });
    this.onSelectionChanged(({value: tab}) => {
      settings.selectedTabId = tab.id;
      this.updateScrollReceiver(tab);
    });
  }

  set scrollReceiver(scrollReceiver: ScrollReceiver) {
    this._scrollReceiver = scrollReceiver;
    this.previousTab = this.selection;
    this.previousTab.scrollReceiver = scrollReceiver;
  }

  private updateScrollReceiver(tab: AppTab) {
    if (this.previousTab) {
      if (this.previousTab.scrollReceiver) {
        this.previousTab.scrollReceiver.resetScrollPosition(false);
      }
      this.previousTab.scrollReceiver = null;
    }
    this.previousTab = tab;
    this.previousTab.scrollReceiver = this._scrollReceiver;
  }

}
