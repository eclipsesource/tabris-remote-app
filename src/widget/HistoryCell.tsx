import { Composite, TextInput, ImageView, TextView } from 'tabris';
import { component, property, inject } from 'tabris-decorators';
import { Colors } from '../res/Colors';
import { Images } from '../res/Images';
import { Fonts } from '../res/Fonts';
import AppLauncher from '../AppLauncher';
import ActionIcon from './ActionIcon';
import dimen from '../res/dimen';

@component export default class HistoryCell extends Composite {

  @property public url: string;
  private urlInput: TextInput;

  constructor(
    urlInput: TextInput,
    @inject protected appLauncher: AppLauncher,
    @inject protected readonly colors: Colors,
    @inject protected readonly images: Images,
    @inject protected readonly fonts: Fonts) {
    super({ highlightOnTouch: true });
    this.urlInput = urlInput;
    this.on({ tap: () => appLauncher.launchUrl(this.url) });
    this.append(
      <$>
        <ImageView
          left={dimen.m} centerY={0}
          image={images.history}
          tintColor={colors.actionIcon} />
        <TextView
          id='historyUrl'
          left={dimen.pm} right={dimen.nm} centerY={0}
          font={this.fonts.body2}
          maxLines={2}
          textColor={colors.onSurfaceMedium}
          bind-text='url' />
        <ActionIcon
          right={dimen.xxs} centerY={0}
          image={this.images.edit}
          onTap={() => this.updateUrlInput(this.url)} />
      </$>
    );
  }

  private updateUrlInput(url: string) {
    this.urlInput.set({
      text: url,
      selection: [url.length, url.length]
    });
  }

}
