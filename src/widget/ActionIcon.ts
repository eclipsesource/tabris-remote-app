import { ImageView, Properties } from 'tabris';
import { inject } from 'tabris-decorators';
import { Colors } from '../res/Colors';
import dimen from '../res/dimen';

export default class ActionIcon extends ImageView {

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
