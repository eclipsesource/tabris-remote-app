import { Properties, Tab } from 'tabris';
import { ComponentJSX } from 'tabris-decorators';
import OnboardingTab from './OnboardingTab';
import color from '../res/color';
import font from '../res/font';
import dimen from '../res/dimen';

export default class WelcomeTab extends OnboardingTab {

  public jsxProperties: ComponentJSX<this>;

  constructor(properties: Properties<Tab>) {
    super({ id: 'onboardingWelcomeTab', ...properties });
    this.createUi();
  }

  private createUi() {
    this.append(
      <scrollView left={0} centerY={0} right={0}>
        <imageView
          top={0} centerX={0} width={256} height={256}
          cornerRadius={128}
          image={{ src: 'images/onboarding-tabris-logo@3x.png', width: 200, height: 200 }}
          background={`linear-gradient(25deg, ${color.primaryDark} 10%, ${color.primaryLight})`} />
        <textView
          left={dimen.m} top={dimen.pxxl} right={dimen.m}
          font={font.h5}
          text='Welcome to Tabris.js'
          alignment='center' />
        <textView
          left={dimen.m} top={dimen.pm} right={dimen.m}
          font={font.subtitle1}
          textColor={color.onBackgroundMedium}
          text={'Mobile development\nwith confidence.'}
          alignment='center' />
      </scrollView>
    );
  }

}
