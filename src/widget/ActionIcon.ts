import { ImageView, Properties } from 'tabris';
import { ComponentJSX, inject } from 'tabris-decorators';
import { Colors } from '../res/Colors';
import dimen from '../res/dimen';

export default class ActionIcon extends ImageView {

  public jsxProperties: ComponentJSX<this>;

  constructor(
    properties: Properties<ImageView>,
    @inject protected readonly colors: Colors) {
    super({
      width: dimen.xxl,
      height: dimen.xxl,
      cornerRadius: dimen.xxl / 2,
      tintColor: colors.actionIcon,
      highlightOnTouch: true,
      ...properties
    });
  }

}
