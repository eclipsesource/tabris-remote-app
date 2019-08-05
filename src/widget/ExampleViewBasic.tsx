import { ActionSheet, Composite, ImageView, Properties, TextView } from 'tabris';
import { getById, ComponentJSX, component } from 'tabris-decorators';
import { ExampleGalleryEntry } from '../model/ExampleGallery';
import { isIos } from '../helper';
import ExampleView, { launchUrl, showExampleDocs } from './ExampleView';
import ActionIcon from './ActionIcon';
import Divider from './Divider';
import color from '../res/color';
import dimen from '../res/dimen';
import font from '../res/font';

interface ActionSheetItem {
  title: string;
  image?: Image;
  style?: 'default' | 'cancel' | 'destructive';
}

@component export default class ExampleViewBasic extends ExampleView {

  public jsxProperties: ComponentJSX<this>;

  @getById private name: TextView;
  @getById private image: ImageView;
  @getById private description: TextView;
  // @getById private divider: Divider;
  private docsVersion: string;
  // private tagVersion: string;
  private galleryEntry: ExampleGalleryEntry;

  constructor(properties: Properties<Composite>) {
    super({ background: color.surface, ...properties });
    this.on({ tap: () => showExampleDocs(this.galleryEntry.name, this.docsVersion) });
    this.createUi();
  }

  public update(docsVersion: string, _tagVersion: string, galleryEntry: ExampleGalleryEntry) {
    this.docsVersion = docsVersion;
    // this.tagVersion = tagVersion;
    this.galleryEntry = galleryEntry;
    this.name.text = galleryEntry.name;
    this.image.image = { src: 'example-gallery/' + galleryEntry.image, scale: 2 };
    this.description.text = galleryEntry.description;
  }

  private createUi() {
    this.append(
      <widgetCollection>
        <ActionIcon
          id='docsLink'
          right={4} top={9}
          image={{ src: 'images/link-external-black-24dp@3x.png', scale: 3 }}
          highlightOnTouch={false} />
        <textView
          id='name'
          left={dimen.m} right={dimen.p} top={dimen.m}
          font={font.h5} maxLines={1} textColor={color.onSurface} />
        <imageView
          id='image'
          top={['#docsLink', dimen.xxs]} left={dimen.m} width={96} height={96}
          background={color.surface}
          elevation={2}
          cornerRadius={2} />
        <textView
          id='description'
          left={dimen.pm} right={dimen.m} top={['#docsLink', dimen.xxs]}
          maxLines={3}
          font={font.body1}
          textColor={color.onSurfaceMedium} />
        <textView
          right={dimen.m} bottom={32}
          markupEnabled
          text='<ins>Show Snippets</ins>'
          font={font.subtitle1}
          highlightOnTouch
          onTap={(_e) => this.showSnippets()} />
        <Divider
          id='divider'
          left={dimen.m} right={dimen.m} bottom={0}
          background={color.onSurfaceDivider} />
      </widgetCollection>
    );
  }

  private async showSnippets() {
    const items: ActionSheetItem[] = this.galleryEntry.snippets
      .map(link => ({
        title: link.title,
        image: { src: 'images/code-black-24dp@3x.png', scale: 3 },
        style: 'default' as 'default'
      }));
    if (isIos()) {
      items.push({
        title: 'Cancel',
        image: { src: 'images/close-black-24dp@3x.png', scale: 3 },
        style: 'cancel' as 'cancel'
      });
    }
    new ActionSheet({ actions: items }).on({
      select: ({ index }) => {
        if (items[index].style === 'default') {
          launchUrl(this.galleryEntry.snippets[index].url);
        }
      }
    }).open();
  }

}
