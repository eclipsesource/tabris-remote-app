import { ActionSheet, Composite, ImageView, Properties, TextView } from 'tabris';
import { ComponentJSX, component, getById, inject } from 'tabris-decorators';
import { ExampleGalleryEntry } from '../model/ExampleGallery';
import { Colors } from '../res/Colors';
import { Images } from '../res/Images';
import { Fonts } from '../res/Fonts';
import { Texts } from '../res/Texts';
import ExampleView, { launchUrl, showExampleDocs } from './ExampleView';
import ActionIcon from './ActionIcon';
import Divider from './Divider';
import dimen from '../res/dimen';

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
  private docsVersion: string;
  private galleryEntry: ExampleGalleryEntry;

  constructor(
    properties: Properties<Composite>,
    @inject protected readonly colors: Colors,
    @inject protected readonly images: Images,
    @inject protected readonly fonts: Fonts,
    @inject protected readonly texts: Texts) {
    super({ background: colors.surface, ...properties });
    this.on({ tap: () => showExampleDocs(this.galleryEntry.name, this.docsVersion) });
    this.createUi();
  }

  public update(docsVersion: string, _tagVersion: string, galleryEntry: ExampleGalleryEntry) {
    this.docsVersion = docsVersion;
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
          right={dimen.xxs} top={dimen.xxs}
          image={this.images.docsLink}
          highlightOnTouch={false} />
        <textView
          id='name'
          left={dimen.m} top={dimen.m} right={dimen.pxxs}
          font={this.fonts.h5}
          maxLines={1}
          textColor={this.colors.onSurface} />
        <imageView
          id='image'
          left={dimen.m} top={['#name', dimen.m]} width={100} height={100}
          background={this.colors.surface}
          elevation={2}
          cornerRadius={2} />
        <textView
          id='description'
          left={dimen.pm} top={['#name', dimen.m]} right={dimen.m}
          maxLines={3}
          font={this.fonts.body1}
          textColor={this.colors.onSurfaceMedium} />
        <textView
          right={dimen.m} bottom={dimen.m}
          markupEnabled={true}
          text={this.texts.showSnippets}
          font={this.fonts.subtitle1}
          highlightOnTouch
          onTap={() => this.showSnippets()} />
        <Divider
          id='divider'
          left={dimen.m} right={dimen.m} bottom={0}
          background={this.colors.onSurfaceDivider} />
      </widgetCollection>
    );
  }

  private async showSnippets() {
    const items = this.getActionSheetItems();
    new ActionSheet({ actions: items }).on({
      select: ({ index }) => {
        if (items[index].style === 'default') {
          launchUrl(this.galleryEntry.snippets[index].url);
        }
      }
    }).open();
  }

  private getActionSheetItems() {
    const items: ActionSheetItem[] = this.galleryEntry.snippets
      .map(link => ({
        title: link.title,
        image: this.images.codeLink,
        style: 'default' as 'default'
      }));
    items.push({
      title: this.texts.cancel,
      image: this.images.close,
      style: 'cancel' as 'cancel'
    });
    return items;
  }

}
