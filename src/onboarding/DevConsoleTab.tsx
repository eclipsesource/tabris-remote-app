import { Properties, Tab, Composite, ImageView, TextView } from 'tabris';
import { inject } from 'tabris-decorators';
import { Colors } from '../res/Colors';
import { Images } from '../res/Images';
import { Fonts } from '../res/Fonts';
import { Texts } from '../res/Texts';
import OnboardingTab from './OnboardingTab';
import dimen from '../res/dimen';

export default class DevConsoleTab extends OnboardingTab {

  constructor(
    properties: Properties<Tab>,
    @inject protected readonly colors: Colors,
    @inject protected readonly images: Images,
    @inject protected readonly fonts: Fonts,
    @inject protected readonly texts: Texts) {
    super({ id: 'onboardingDevConsoleTab', ...properties });
    this.createUi();
  }

  private createUi() {
    this.append(
      <Composite
        left={0} centerY={0} right={0}>
        <ImageView
          top={0} centerX={0} width={256} height={256}
          cornerRadius={128}
          image={this.images.devConsoleTabImage}
          background={`linear-gradient(25deg, ${this.colors.primaryDark} 10%, ${this.colors.primaryLight})`} />
        <TextView
          left={dimen.l} top={dimen.pxxl} right={dimen.l}
          alignment='centerX'
          font={this.fonts.h5}
          text={this.texts.devConsoleTabMessage} />
        <TextView
          left={dimen.l} top={dimen.pm} right={dimen.l}
          alignment='centerX'
          font={this.fonts.subtitle1}
          textColor={this.colors.onBackgroundMedium}
          text={this.texts.devConsoleTabSubMessage} />
      </Composite>
    );
  }

}
