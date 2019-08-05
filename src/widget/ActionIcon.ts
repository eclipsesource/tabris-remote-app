import { ImageView, Properties } from 'tabris';
import { ComponentJSX } from 'tabris-decorators';
import color from '../res/color';
import dimen from '../res/dimen';

export default class ActionIcon extends ImageView {

  public jsxProperties: ComponentJSX<this>;

  constructor(properties: Properties<ImageView>) {
    super({
      width: dimen.xxl,
      height: dimen.xxl,
      cornerRadius: dimen.xxl / 2,
      tintColor: color.actionIcon,
      highlightOnTouch: true,
      ...properties
    });
  }

}
