import { Composite, TextInput } from 'tabris';
import { component, property, inject } from 'tabris-decorators';
import AppLauncher from '../AppLauncher';
import ActionIcon from './ActionIcon';
import color from '../res/color';
import dimen from '../res/dimen';
import font from '../res/font';

@component export default class HistoryCell extends Composite {

  @property public url: string;
  private urlInput: TextInput;

  constructor(
    urlInput: TextInput,
    @inject protected appLauncher: AppLauncher) {
    super({ highlightOnTouch: true });
    this.urlInput = urlInput;
    this.on({ tap: () => appLauncher.launchUrl(this.url) });
    this.append(
      <widgetCollection>
        <imageView
          left={dimen.m} centerY={0}
          image={{src: 'images/history-black-24dp@3x.png', scale: 3}}
          tintColor={color.actionIcon} />
        <textView
          id='historyUrl'
          left={dimen.pm} right={dimen.nm} centerY={0}
          font={font.body2}
          maxLines={2}
          textColor={color.onSurfaceMedium}
          bind-text='url' />
        <ActionIcon
          right={dimen.xxs} centerY={0}
          image={{src: 'images/edit-url-black-24dp@3x.png', scale: 3}}
          onTap={() => this.updateUrlInput(this.url)} />
      </widgetCollection>
    );
  }

  private updateUrlInput(url: string) {
    this.urlInput.set({
      text: url,
      selection: [url.length, url.length]
    });
  }

}
