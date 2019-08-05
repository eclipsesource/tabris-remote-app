import { TextView, Properties } from 'tabris';
import { ComponentJSX } from 'tabris-decorators';
import color from '../res/color';
import font from '../res/font';

export default class SubHeader extends TextView {

  public jsxProperties: ComponentJSX<this>;

  constructor(properties: Properties<TextView>) {
    super({
      font: font.h6,
      textColor: color.onBackground,
      ...properties
    });
  }

}
