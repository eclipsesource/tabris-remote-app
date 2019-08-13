import { Composite, Properties } from 'tabris';
import { ComponentJSX, component, property, inject } from 'tabris-decorators';
import { contentTopOffset } from '../helper';
import { Colors } from '../res/Colors';
import { Fonts } from '../res/Fonts';
import dimen from '../res/dimen';

@component export default class Header extends Composite {

  public jsxProperties: ComponentJSX<this>;
  @property public title: string;
  @property public description: string;

  constructor(
    properties: Properties<Composite>,
    @inject protected readonly colors: Colors,
    @inject protected readonly fonts: Fonts) {
    super();
    this.createUi();
    this.set({
      background: `linear-gradient(45deg, ${colors.primaryDark} 10%, ${colors.primaryLight})`,
      padding: { bottom: dimen.m },
      ...properties
    });
  }

  private createUi() {
    this.append(
      <widgetCollection>
        <textView
          id='title'
          left={dimen.m} top={contentTopOffset() + dimen.l} right={dimen.m}
          font={this.fonts.h4}
          textColor={this.colors.onPrimary}
          bind-text='title' />
        <textView
          id='description'
          left={dimen.m} top={dimen.pxxxs} right={dimen.m}
          font={this.fonts.body1}
          lineSpacing={1.1}
          textColor={this.colors.onPrimaryMedium}
          bind-text='description' />
      </widgetCollection>);
  }

}
