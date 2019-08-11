import { Composite, ImageView, Properties, TextView } from 'tabris';
import { ComponentJSX, component, getById, property, inject } from 'tabris-decorators';
import { Snippet, ExampleGalleryEntry } from '../model/ExampleGallery';
import { Images } from '../res/Images';
import ExampleView, { launchUrl, showExampleDocs } from './ExampleView';
import ActionIcon from './ActionIcon';
import Divider from './Divider';
import color from '../res/color';
import dimen from '../res/dimen';
import font from '../res/font';

const MAX_LINKS = 5;

@component export default class ExampleViewAdvanced extends ExampleView {

  public jsxProperties: ComponentJSX<this>;
  @getById private name: TextView;
  @getById private image: ImageView;
  @getById private description: TextView;
  @getById private divider: Divider;
  private links: LinkView[];
  private docsVersion: string;
  private tagVersion: string;
  private galleryEntry: ExampleGalleryEntry;

  constructor(
    properties: Properties<Composite>,
    @inject protected readonly images: Images) {
    super({
      background: color.surface,
      elevation: 4,
      cornerRadius: dimen.isSmallDevice() ? 0 : dimen.cardCornerRadius,
      ...properties
    });
    this.on({ tap: () => showExampleDocs(this.galleryEntry.name, this.docsVersion) });
    this.createUi();
  }

  public update(docsVersion: string, tagVersion: string, galleryEntry: ExampleGalleryEntry) {
    this.docsVersion = docsVersion;
    this.tagVersion = tagVersion;
    this.galleryEntry = galleryEntry;
    this.name.text = galleryEntry.name;
    this.image.image = { src: 'example-gallery/' + galleryEntry.image, scale: 5 };
    this.description.text = galleryEntry.description;
    const snippetsCount = Math.min(galleryEntry.snippets ? galleryEntry.snippets.length : 0, MAX_LINKS);
    this.updateSnippets(galleryEntry, snippetsCount);
    this.padding = { bottom: snippetsCount > 0 ? dimen.xs : dimen.m };
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
          font={font.h5}
          maxLines={1}
          textColor={color.onSurface} />,
        <textView
          id='description'
          left={dimen.m} top={dimen.pxxs} right={dimen.m}
          maxLines={3}
          textColor={color.onSurfaceMedium}
          lineSpacing={1.1}
          font={font.body1} />,
        <imageView
          id='image'
          top={dimen.ps} centerX={0} />,
        <Divider
          id='divider'
          left={0} top={dimen.ps} right={0}
          background={color.onSurfaceDivider} />
      </widgetCollection>
    );
    this.links = new Array(MAX_LINKS).fill(null).map(() => <LinkView left={0} top={dimen.p} right={0} />);
    this.append(this.links);
  }

  private updateSnippets(galleryEntry: ExampleGalleryEntry, snippetsCount: number) {
    this.divider.visible = snippetsCount !== 0;
    this.links.forEach((link) => link.set({ visible: false, height: 0 }));
    if (snippetsCount > 0) {
      galleryEntry.snippets
        .slice(0, snippetsCount)
        .forEach((snippet, index) => {
          // Setting properties as below prevents TS error 'is not assignable...'.
          const properties = {
            visible: true,
            height: null as number,
            top: index === 0 ? dimen.pxs : dimen.p,
            snippet,
            version: this.tagVersion
          };
          this.links[index].set(properties);
        });
    }
  }

}

@component class LinkView extends Composite {

  public jsxProperties: ComponentJSX<this>;
  @property public version: string;
  @getById private title: TextView;
  private url: string;

  constructor(
    properties: Properties<Composite>,
    @inject protected readonly images: Images) {
    super();
    this.append(
      <widgetCollection>
        <ActionIcon
          left={dimen.xxs} centerY={0}
          image={this.images.codeLink}
          onTap={() => launchUrl(this.url)} />
        <textView
          id='title'
          left={dimen.pxxs} right={dimen.m} centerY={0}
          markupEnabled={true}
          maxLines={2}
          font={font.subtitle2} />
      </widgetCollection>
    );
    this.set({
      highlightOnTouch: true,
      height: 40,
      ...properties
    });
    this.on({ tap: () => launchUrl(this.url) });
  }

  set snippet(snippet: Snippet) {
    this.url = snippet.url;
    this.title.text = snippet.title ? `<ins>${snippet.title}</ins>` : `<ins>${snippet.url}</ins>`;
  }

}
