import { ui } from 'tabris';
import { resolve } from 'tabris-decorators';
import { Colors } from './res/Colors';
import { isIos } from './helper';
import ExampleGalleryTab from './tab/ExampleGalleryTab';
import OnboardingView from './onboarding/OnboardingView';
import AppTabFolder from './widget/AppTabFolder';
import AboutTab from './tab/AboutTab';
import UrlView from './widget/UrlView';
import AppTab from './widget/AppTab';
import settings from './settings';

export default class UILauncher {

  constructor() {
    ui.contentView.background = resolve(Colors).background;
    if (settings.onboardingComplete) {
      this.showApp();
    } else {
      this.showOnboarding();
    }
  }

  private showOnboarding() {
    ui.statusBar.set({
      theme: 'light',
      background: resolve(Colors).background
    });
    this.createOnboardingUi();
  }

  private createOnboardingUi() {
    ui.contentView.append(
      <OnboardingView
        left={0} top={0} right={0} bottom={0}
        onComplete={event => {
          event.target.dispose();
          settings.onboardingComplete = true;
          this.showApp();
        }} />
    );
  }

  private showApp() {
    ui.statusBar.set({
      background: isIos() ? '#00a4ff' : 'rgba(0,0,0,0.22)',
      theme: 'dark'
    });
    this.createAppUi();
    const tabFolder = ui.contentView.find(AppTabFolder).first();
    tabFolder.scrollReceiver = ui.contentView.find(UrlView).first();
    const selection = tabFolder.find('#' + settings.selectedTabId).first(AppTab);
    if (selection) {
      tabFolder.selection = selection;
    }
  }

  private createAppUi() {
    ui.contentView.append(
      <widgetCollection>
        <AppTabFolder
          left={0} top={0} right={0} bottom={0}>
          <ExampleGalleryTab
            id='exampleGalleryTab' />
          <AboutTab
            id='aboutTab' />
        </AppTabFolder>
        <UrlView
          left={0} top={0} right={0} bottom={0} />
      </widgetCollection>
    );
  }

}
