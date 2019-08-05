import { ui } from 'tabris';
import { isIos } from './helper';
import ExampleGalleryTab from './tab/ExampleGalleryTab';
import OnboardingView from './onboarding/OnboardingView';
import AppTabFolder from './widget/AppTabFolder';
import AboutTab from './tab/AboutTab';
import UrlView from './widget/UrlView';
import AppTab from './widget/AppTab';
import settings from './settings';
import color from './res/color';

ui.navigationBar.set({
  background: color.background,
  theme: 'light'
});
ui.contentView.background = color.background;


if (settings.onboardingComplete) {
  showApp();
} else {
  showOnboarding();
}

function showOnboarding() {
  ui.statusBar.set({
    theme: 'light',
    background: color.background
  });
  ui.contentView.append(<OnboardingView
    left={0} top={0} right={0} bottom={0}
    onComplete={event => {
      event.target.dispose();
      settings.onboardingComplete = true;
      showApp();
    }} />);
}

function showApp() {
  ui.statusBar.set({
    background: isIos() ? '#00a4ff' : 'rgba(0,0,0,0.22)',
    theme: 'dark'
  });
  ui.contentView.append(
    <widgetCollection>
      <AppTabFolder left={0} top={0} right={0} bottom={0}>
        <ExampleGalleryTab id='exampleGalleryTab' />
        <AboutTab id='aboutTab' />
      </AppTabFolder>
      <UrlView left={0} top={0} right={0} bottom={0} />
    </widgetCollection>
  );
  const tabFolder = ui.contentView.find(AppTabFolder).first();
  tabFolder.scrollReceiver = ui.contentView.find(UrlView).first();
  const selection = tabFolder.find('#' + settings.selectedTabId).first(AppTab);
  if (selection) {
    tabFolder.selection = selection;
  }
}
