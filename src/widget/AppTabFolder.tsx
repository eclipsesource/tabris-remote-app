import { Properties, Tab, TabFolder } from 'tabris';
import { ComponentJSX } from 'tabris-decorators';
import ScrollReceiver from './ScrollReceiver';
import AppTab from './AppTab';
import analytics from '../analytics';
import settings from '../settings';

export default class AppTabFolder extends TabFolder {

  public jsxProperties: ComponentJSX<this>;
  private _scrollReceiver: ScrollReceiver;
  private previousTab: AppTab;
  private previouslySelectedTab: Tab;

  constructor(properties: Properties<TabFolder>) {
    super({ tabBarLocation: 'bottom', ...properties });
    this.on({
      selectionChanged: ({ value }) => {
        const tab = value as AppTab;
        settings.selectedTabId = tab.id;
        this.previouslySelectedTab = tab;
        this.updateScrollReceiver(tab);
      },
      select: ({ selection }) => {
        const tab = selection as AppTab;
        analytics.screenName = tab.id;
        if (this.previouslySelectedTab === tab && tab.appeared) {
          tab.onSelectWhileAppeared();
        }
      }
    });
  }

  set scrollReceiver(scrollReceiver: ScrollReceiver) {
    this._scrollReceiver = scrollReceiver;
    this.previousTab = this.selection as AppTab;
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
