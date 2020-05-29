import { contentView, statusBar, navigationBar } from 'tabris';
import { resolve } from 'tabris-decorators';
import { Colors } from './res/Colors';
import { isIos } from './helper';
import ExampleGalleryTab from './tab/ExampleGalleryTab';
import OnboardingView from './onboarding/OnboardingView';
import AppTabFolder from './tab/AppTabFolder';
import AboutTab from './tab/AboutTab';
import UrlView from './widget/UrlView';
import AppTab from './tab/AppTab';
import settings from './settings';

export default class UILauncher {

  constructor() {
    this.initUi();
    if (settings.onboardingComplete) {
      this.showApp();
    } else {
      this.showOnboarding();
    }
  }

  private initUi() {
    const background = resolve(Colors).background;
    navigationBar.set({
      background: background,
      theme: 'light'
    });
    contentView.background = background;
  }

  private showOnboarding() {
    statusBar.set({
      theme: 'light',
      displayMode: 'float',
      background: resolve(Colors).background
    });
    this.createOnboardingUi();
  }

  private createOnboardingUi() {
    contentView.append(
      <OnboardingView
        stretch
        onComplete={event => {
          event.target.dispose();
          settings.onboardingComplete = true;
          this.showApp();
        }} />
    );
  }

  private showApp() {
    statusBar.set({
      background: isIos() ? '#00a4ff' : 'rgba(0,0,0,0.22)',
      theme: 'dark',
      displayMode: isIos() ? 'default' : 'float'
    });
    this.createAppUi();
    const tabFolder = $(AppTabFolder).only();
    tabFolder.scrollReceiver = $(UrlView).only();
    const selection = tabFolder.find('#' + settings.selectedTabId).first(AppTab);
    if (selection) {
      tabFolder.selection = selection;
    }
  }

  private createAppUi() {
    contentView.append(
      <$>
        <AppTabFolder stretch>
          <ExampleGalleryTab id='exampleGalleryTab' />
          <AboutTab id='aboutTab' />
        </AppTabFolder>
        <UrlView stretch />
      </$>
    );
  }

}
