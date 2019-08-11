import { Composite, Properties } from 'tabris';
import { ComponentJSX, component, property } from 'tabris-decorators';
import { contentTopOffset } from '../helper';
import color from '../res/color';
import dimen from '../res/dimen';
import font from '../res/font';

@component export default class Header extends Composite {

  public jsxProperties: ComponentJSX<this>;
  @property public title: string;
  @property public description: string;

  constructor(properties: Properties<Composite>) {
    super();
    this.createUi();
    this.set({
      background: `linear-gradient(45deg, ${color.primaryDark} 10%, ${color.primaryLight})`,
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
          font={font.h4}
          textColor={color.onPrimary}
          bind-text='title' />
        <textView
          id='description'
          left={dimen.m} top={dimen.pxxxs} right={dimen.m}
          font={font.body1}
          lineSpacing={1.1}
          textColor={color.onPrimaryMedium}
          bind-text='description' />
      </widgetCollection>);
  }

}
