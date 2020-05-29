import { Composite, Listeners, TabFolder, WidgetCollection, Properties } from 'tabris';
import { component, getById, inject } from 'tabris-decorators';
import { Colors } from '../res/Colors';
import DevConsoleTab from './DevConsoleTab';
import NavigationBar from './NavigationBar';
import OnboardingTab from './OnboardingTab';
import WelcomeTab from './WelcomeTab';
import Divider from '../widget/Divider';
import dimen from '../res/dimen';

@component export default class OnboardingView extends Composite {

  public onComplete: Listeners<{ target: OnboardingView }> = new Listeners(this, 'complete');
  @getById private tabFolder: TabFolder;
  @getById private navBar: NavigationBar;
  private tabs: WidgetCollection<OnboardingTab> = (
    <$>
      <WelcomeTab />
      <DevConsoleTab />
    </$>);

  constructor(
    properties: Partial<Properties<Composite>>,
    @inject protected readonly colors: Colors) {
    super({ background: colors.background, ...properties });
    this.createUi();
  }

  private createUi() {
    this.append(
      <$>
        <TabFolder
          id='tabFolder'
          stretchX top bottom={dimen.n}
          tabBarLocation='hidden'
          paging
          onSelectionChanged={() => this.tabSelectionChanged()}>
          {this.tabs}
        </TabFolder>
        <NavigationBar
          id='navBar'
          stretchX bottom height={dimen.xxl}
          entries={this.tabs.length}
          onSkipButton={() => this.skipOnboarding()}
          onNextButton={() => this.showNextTab()} />
        <Divider
          stretchX bottom
          background={this.colors.onBackgroundDivider} />
      </$>
    );
  }

  private skipOnboarding() {
    this.onComplete.trigger();
  }

  private showNextTab() {
    const selectionIndex = this.tabFolder.selectionIndex;
    if (selectionIndex < this.tabs.length - 1) {
      this.tabFolder.selectionIndex = selectionIndex + 1;
    } else {
      this.onComplete.trigger();
    }
  }

  private tabSelectionChanged() {
    this.navBar.activeEntry = this.tabFolder.selectionIndex;
  }

}
