import { CollectionView, CollectionViewScrollEvent, Composite, Properties } from 'tabris';
import { component, inject } from 'tabris-decorators';
import { Colors } from '../res/Colors';
import { Images } from '../res/Images';
import { Texts } from '../res/Texts';
import { isIos } from '../helper';
import ExampleViewAdvanced from '../widget/ExampleViewAdvanced';
import ExampleViewBasic from '../widget/ExampleViewBasic';
import ExampleGallery from '../model/ExampleGallery';
import ExampleView from '../widget/ExampleView';
import AppTab from '../widget/AppTab';
import Header from '../widget/Header';
import dimen from '../res/dimen';

@component export default class ExampleGalleryTab extends AppTab {

  private exampleList: CollectionView<Composite>;
  private exampleGallery: ExampleGallery;

  constructor(
    properties: Properties<AppTab>,
    @inject protected readonly colors: Colors,
    @inject protected readonly images: Images,
    @inject protected readonly texts: Texts) {
    super({
      title: texts.examples,
      image: images.exampleGalleryTabImage,
      background: colors.tabBackground,
      ...properties
    });
  }

  public onSelectWhileAppeared() {
    super.onSelectWhileAppeared();
    this.exampleList.reveal(0);
  }

  protected createUi() {
    this.append(
      this.exampleList = <CollectionView
        id='exampleList'
        stretch
        cellHeight={isIos() ? 192 : 'auto'}
        cellType={index => index === 0 ? 'header' : 'example'}
        createCell={(type: string) => this.createCell(type)}
        updateCell={(cell: Composite, index: number) => this.updateCell(cell, index)}
        onScroll={(event) => this.updateScrollReceiver(event)} />
    );
    this.loadExampleGallery();
  }

  private updateCell(cell: Composite, index: number) {
    if (index > 0) {
      const galleryEntry = this.exampleGallery.index[index - 1];
      const exampleView = (cell instanceof ExampleView) ? cell : cell.find(ExampleView).first();
      exampleView.update(galleryEntry);
      exampleView.top = index === 1 ? dimen.m : dimen.m - dimen.xs;
      exampleView.bottom = index === this.exampleGallery.index.length ? dimen.l : dimen.xs;
    }
  }

  private updateScrollReceiver(event: CollectionViewScrollEvent) {
    if (this.scrollReceiver) {
      this.scrollReceiver.onScroll(event.deltaY);
    }
  }

  private loadExampleGallery() {
    fetch('example-gallery/index.json')
      .then(result => result.json())
      .then((result) => this.updateExampleGallery(result))
      .catch(error => console.error('Could not populate example gallery.', error));
  }

  private updateExampleGallery(exampleGallery: ExampleGallery) {
    this.exampleGallery = exampleGallery;
    this.exampleList.load(this.exampleGallery.index.length + 1);
    this.animateAppearance();
  }

  private createCell(type: string) {
    if (type === 'header') {
      return <Header
        title={this.texts.examples}
        description={this.texts.exampleGalleryTabHeaderDescription} />;
    } else if (type === 'example') {
      return this.createExampleCell();
    }
  }

  private createExampleCell() {
    if (isIos()) {
      return <ExampleViewBasic
        stretchX top={dimen.xs}
        highlightOnTouch />;
    }
    return (
      <Composite>
        <ExampleViewAdvanced
          left={dimen.isSmallDevice() ? 0 : dimen.m}
          top={dimen.xs}
          right={dimen.isSmallDevice() ? 0 : dimen.m}
          highlightOnTouch />
      </Composite>
    );
  }

}
