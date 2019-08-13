import { Composite, ImageView, Properties, TextView } from 'tabris';
import { ComponentJSX, component, getById, inject } from 'tabris-decorators';
import { ExampleGalleryEntry, Example } from '../model/ExampleGallery';
import { Colors } from '../res/Colors';
import { Images } from '../res/Images';
import { Fonts } from '../res/Fonts';
import ExampleView, { launchExample, showExampleSource, showDocumentation } from './ExampleView';
import ActionIcon from './ActionIcon';
import Divider from './Divider';
import dimen from '../res/dimen';

const MAX_LINKS = 5;

@component export default class ExampleViewAdvanced extends ExampleView {

  public jsxProperties: ComponentJSX<this>;
  @getById private name: TextView;
  @getById private image: ImageView;
  @getById private description: TextView;
  @getById private divider: Divider;
  private links: LinkView[];

  constructor(
    properties: Properties<Composite>,
    @inject protected readonly colors: Colors,
    @inject protected readonly images: Images,
    @inject protected readonly fonts: Fonts) {
    super({
      background: colors.surface,
      elevation: 4,
      cornerRadius: dimen.isSmallDevice() ? 0 : dimen.cardCornerRadius,
      ...properties
    });
    this.on({ tap: () => showDocumentation() });
    this.createUi();
  }

  public update(galleryEntry: ExampleGalleryEntry) {
    this.name.text = galleryEntry.name;
    this.image.image = { src: 'example-gallery/' + galleryEntry.image, scale: 5 };
    this.description.text = galleryEntry.description;
    const examplesCount = Math.min(galleryEntry.examples ? galleryEntry.examples.length : 0, MAX_LINKS);
    this.updateExamples(galleryEntry, examplesCount);
    this.padding = { bottom: examplesCount > 0 ? dimen.xs : dimen.m };
  }

  private createUi() {
    this.append(
      <widgetCollection>
        <ActionIcon
          id='docsLink'
          right={dimen.xxs} top={dimen.xxs}
          image={this.images.docsLink}
          highlightOnTouch={false} />,
        <textView
          id='name'
          left={dimen.m} top={dimen.m} right={dimen.pxxs}
          font={this.fonts.h5}
          maxLines={1}
          textColor={this.colors.onSurface} />,
        <textView
          id='description'
          left={dimen.m} top={dimen.pxxs} right={dimen.m}
          maxLines={3}
          textColor={this.colors.onSurfaceMedium}
          lineSpacing={1.1}
          font={this.fonts.body1} />,
        <imageView
          id='image'
          top={dimen.ps} centerX={0} />,
        <Divider
          id='divider'
          left={0} top={dimen.ps} right={0}
          background={this.colors.onSurfaceDivider} />
      </widgetCollection>
    );
    this.links = new Array(MAX_LINKS).fill(null).map(() => <LinkView left={0} top={dimen.p} right={0} />);
    this.append(this.links);
  }

  private updateExamples(galleryEntry: ExampleGalleryEntry, examplesCount: number) {
    this.divider.visible = examplesCount !== 0;
    this.links.forEach((link) => link.set({ visible: false, height: 0 }));
    if (examplesCount > 0) {
      galleryEntry.examples
        .slice(0, examplesCount)
        .forEach((example, index) => {
          // Setting properties as below prevents TS error 'is not assignable...'.
          const properties = {
            visible: true,
            height: null as number,
            top: index === 0 ? dimen.pxs : dimen.p,
            example
          };
          this.links[index].set(properties);
        });
    }
  }

}

@component class LinkView extends Composite {

  public jsxProperties: ComponentJSX<this>;
  @getById private title: TextView;
  private _example: Example;

  constructor(
    properties: Properties<Composite>,
    @inject protected readonly images: Images,
    @inject protected readonly fonts: Fonts) {
    super();
    this.append(
      <widgetCollection>
        <ActionIcon
          left={dimen.xxs} centerY={0}
          image={this.images.codeLink}
          onTap={() => showExampleSource(this._example.fileName)} />
        <textView
          id='title'
          left={dimen.pxxs} right={dimen.m} centerY={0}
          markupEnabled={true}
          maxLines={2}
          font={fonts.subtitle2} />
      </widgetCollection>
    );
    this.set({
      highlightOnTouch: true,
      height: 40,
      ...properties
    });
    this.on({ tap: () => launchExample(this._example.urlPathParameter) });
  }

  set example(example: Example) {
    this._example = example;
    this.title.text = `<ins>${example.title}</ins>`;
  }

}
