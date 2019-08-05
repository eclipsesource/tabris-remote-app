import { Properties, Tab } from 'tabris';
import { ComponentJSX } from 'tabris-decorators';
import { isIos } from '../helper';
import OnboardingTab from './OnboardingTab';
import color from '../res/color';
import dimen from '../res/dimen';
import font from '../res/font';

export default class DevConsoleTab extends OnboardingTab {

  public jsxProperties: ComponentJSX<this>;

  constructor(properties: Properties<Tab>) {
    super({ id: 'onboardingDevConsoleTab', ...properties });
    this.createUi();
  }

  private createUi() {
    const consoleHelp = isIos() ? 'of the main screen ' : '\n';
    this.append(
      <scrollView left={0} centerY={0} right={0}>
        <imageView top={0} centerX={0} width={256} height={256}
          cornerRadius={128}
          image={{ src: 'images/onboarding-dev-console@3x.png', width: 200, height: 200 }}
          background={`linear-gradient(25deg, ${color.primaryDark} 10%, ${color.primaryLight})`} />
        <textView
          left={dimen.l} top={dimen.pxxl} right={dimen.l}
          alignment='center'
          font={font.h5}
          text='Use the developer console to get insights into your app' />
        <textView
          left={dimen.l} top={dimen.pm} right={dimen.l}
          alignment='center'
          font={font.subtitle1}
          textColor={color.onBackgroundMedium}
          text={`Swipe from the right edge ${consoleHelp}to open the developer console.`} />
      </scrollView>
    );
  }

}
