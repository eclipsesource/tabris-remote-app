import { CollectionView, CollectionViewScrollEvent, Composite, Properties } from 'tabris';
import { ComponentJSX, component } from 'tabris-decorators';
import { isIos, isAndroid } from '../helper';
import ExampleViewAdvanced from '../widget/ExampleViewAdvanced';
import ExampleViewBasic from '../widget/ExampleViewBasic';
import ExampleGallery from '../model/ExampleGallery';
import ExampleView from '../widget/ExampleView';
import AppTab from '../widget/AppTab';
import Header from '../widget/Header';
import dimen from '../res/dimen';

@component export default class ExampleGalleryTab extends AppTab {

  public jsxProperties: ComponentJSX<this>;
  private widgetList: CollectionView;
  private exampleGallery: ExampleGallery;

  constructor(properties: Properties<AppTab>) {
    super({
      title: 'Examples',
      image: { src: 'images/widgets-black-24dp@3x.png', scale: 3 },
      background: '#efefef',
      ...properties
    });
  }

  public onSelectWhileAppeared() {
    super.onSelectWhileAppeared();
    this.widgetList.reveal(0);
  }

  protected createUi() {
    this.append(
      this.widgetList = <collectionView
        id='widgetList'
        left={0} top={0} right={0} bottom={0}
        cellHeight={isIos() ? 192 : 'auto'}
        cellType={index => index === 0 ? 'header' : 'widget'}
        createCell={ExampleGalleryTab.createCell}
        updateCell={(cell: Composite, index: number) => this.updateCell(cell, index)}
        onScroll={(e) => this.updateScrollReceiver(e)} />
    );
    this.loadExampleGallery();
  }

  private updateCell(cell: Composite, index: number) {
    if (index > 0) {
      const galleryEntry = this.exampleGallery.index[index - 1];
      const exampleView = (cell instanceof ExampleView) ? cell : cell.find(ExampleView).first();
      exampleView.update(this.exampleGallery.docsVersion, this.exampleGallery.tagVersion, galleryEntry);
      if (isAndroid()) {
        exampleView.top = index === 1 ? dimen.m : dimen.m - dimen.xs;
        exampleView.bottom = index === this.exampleGallery.index.length ? dimen.l : dimen.xs;
      }
    }
  }

  private updateScrollReceiver(e: CollectionViewScrollEvent) {
    if (this.scrollReceiver) {
      this.scrollReceiver.onScroll(e.deltaY);
    }
  }

  private loadExampleGallery() {
    fetch('example-gallery/index.json')
      .then(result => result.json())
      .then((result) => this.updateExampleGallery(result))
      .catch(e => console.error('Could not populate example gallery.', e));
  }

  private updateExampleGallery(exampleGallery: ExampleGallery) {
    this.exampleGallery = exampleGallery;
    this.widgetList.load(this.exampleGallery.index.length + 1);
    this.animateAppearance();
  }

  private static createCell(type: string) {
    if (type === 'header') {
      return <Header
        title='Examples'
        description='Create beautiful apps faster with the build in set of high quality UI widgets.' />;
    } else if (type === 'widget') {
      if (isIos()) {
        return <ExampleViewBasic
          left={0} top={dimen.xs} right={0}
          highlightOnTouch={true} />;
      } else {
        return (
          <composite>
            <ExampleViewAdvanced
              left={dimen.isSmallDevice() ? 0 : dimen.m}
              top={dimen.xs}
              right={dimen.isSmallDevice() ? 0 : dimen.m}
              highlightOnTouch={true} />
          </composite>
        );
      }
    }
  }

}
