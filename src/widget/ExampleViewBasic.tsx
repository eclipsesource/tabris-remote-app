import { Composite, ImageView, Properties, TextView } from 'tabris';
import { component, getById, inject } from 'tabris-decorators';
import { ExampleGalleryEntry, Example } from '../model/ExampleGallery';
import { Colors } from '../res/Colors';
import { Images } from '../res/Images';
import { Fonts } from '../res/Fonts';
import { Texts } from '../res/Texts';
import ExampleView, { launchExample, showExampleSource } from './ExampleView';
import ActionIcon from './ActionIcon';
import Divider from './Divider';
import dimen from '../res/dimen';

@component export default class ExampleViewBasic extends ExampleView {

  @getById private name: TextView;
  @getById private image: ImageView;
  @getById private description: TextView;
  private example: Example;

  constructor(
    properties: Properties<Composite>,
    @inject protected readonly colors: Colors,
    @inject protected readonly images: Images,
    @inject protected readonly fonts: Fonts,
    @inject protected readonly texts: Texts) {
    super({ background: colors.surface, ...properties });
    this.on({ tap: () => launchExample(this.example.runPath) });
    this.createUi();
  }

  public update(galleryEntry: ExampleGalleryEntry) {
    this.example = galleryEntry.example;
    this.name.text = galleryEntry.name;
    this.image.image = { src: 'example-gallery/' + galleryEntry.image, scale: 2 };
    this.description.text = galleryEntry.description;
  }

  private createUi() {
    this.append(
      <$>
        <ActionIcon
          id='docsLink'
          right={dimen.xxs} top={dimen.xxs}
          image={this.images.docsLink}
          highlightOnTouch={false} />
        <TextView
          id='name'
          left={dimen.m} top={dimen.m} right={dimen.pxxs}
          font={this.fonts.h5}
          maxLines={1}
          textColor={this.colors.onSurface} />
        <ImageView
          id='image'
          left={dimen.m} top={['#name', dimen.m]} width={100} height={100}
          background={this.colors.surface}
          elevation={2}
          cornerRadius={2} />
        <TextView
          id='description'
          left={dimen.pm} top={['#name', dimen.m]} right={dimen.m}
          maxLines={3}
          font={this.fonts.body1}
          textColor={this.colors.onSurfaceMedium} />
        <TextView
          right={dimen.m} bottom={dimen.m}
          markupEnabled={true}
          text={this.texts.showSourceCode}
          font={this.fonts.subtitle1}
          highlightOnTouch
          onTap={() => showExampleSource(this.example.sourcePath)} />
        <Divider
          id='divider'
          left={dimen.m} right={dimen.m} bottom={0}
          background={this.colors.onSurfaceDivider} />
      </$>
    );
  }

}
