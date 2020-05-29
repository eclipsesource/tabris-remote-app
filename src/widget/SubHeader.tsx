import { TextView, Properties } from 'tabris';
import { inject } from 'tabris-decorators';
import { Colors } from '../res/Colors';
import { Fonts } from '../res/Fonts';

export default class SubHeader extends TextView {

  constructor(
    properties: Properties<TextView>,
    @inject protected readonly colors: Colors,
    @inject protected readonly fonts: Fonts) {
    super({
      font: fonts.h6,
      textColor: colors.onBackground,
      ...properties
    });
  }

}
