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
    // Workaround: 'navigationBar.set({})' causes tsl error "Argument of type...is not assignable...".
    navigationBar.background = background;
    navigationBar.theme = 'light';
    contentView.background = background;
  }

  private showOnboarding() {
    // Workaround: 'statusBar.set({})' causes tsl error "Argument of type...is not assignable...".
    statusBar.theme = 'light';
    statusBar.displayMode = 'float';
    statusBar.background = resolve(Colors).background;
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
    // Workaround: 'statusBar.set({})' causes tsl error "Argument of type...is not assignable...".
    statusBar.background = isIos() ? '#00a4ff' : 'rgba(0,0,0,0.22)';
    statusBar.theme = 'dark';
    statusBar.displayMode = isIos() ? 'default' : 'float';
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
