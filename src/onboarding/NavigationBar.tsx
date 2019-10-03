import { Composite, Listeners, ImageView, Properties, TextView } from 'tabris';
import { getById, component, inject } from 'tabris-decorators';
import { Colors } from '../res/Colors';
import { Images } from '../res/Images';
import { Fonts } from '../res/Fonts';
import { Texts } from '../res/Texts';
import { isAndroid } from '../helper';
import dimen from '../res/dimen';

@component export default class NavigationBar extends Composite {

  public onSkipButton: Listeners<{ target: object }> = new Listeners(this, 'skipButton');
  public onNextButton: Listeners<{ target: object }> = new Listeners(this, 'nextButton');
  @getById private skipView: Composite;
  @getById private nextTextView: TextView;
  @getById private nextImageView: ImageView;
  @getById private progressIndicator: Composite;

  constructor(
    properties: Properties<Composite>,
    @inject protected readonly colors: Colors,
    @inject protected readonly images: Images,
    @inject protected readonly fonts: Fonts,
    @inject protected readonly texts: Texts) {
    super();
    this.createUi();
    this.set(properties);
  }

  private createUi() {
    this.append(
      <$>
        <Composite
          id='skipView'
          left={0} top={0} bottom={0}
          highlightOnTouch={true}
          onTap={() => this.onSkipButton.trigger()}>
          <TextView
            left={dimen.xl} right={dimen.xl} centerY={0}
            text={this.texts.skip}
            font={this.fonts.subtitle1} />
        </Composite>
        <Composite
          top={0} right={0} bottom={0}
          highlightOnTouch={true}
          onTap={() => this.onNextButton.trigger()}>
          <TextView
            id='nextTextView'
            left={dimen.xl} right={dimen.nxs} centerY={0}
            text={this.texts.next}
            font={this.fonts.subtitle1} />
          <ImageView
            id='nextImageView'
            right={dimen.xl} centerY={isAndroid() ? 1 : 0}
            tintColor={this.colors.actionIcon}
            image={this.images.next} />
        </Composite>
        <Composite
          id='progressIndicator'
          centerY={0} centerX={-dimen.xxs} />
      </$>);
  }

  set entries(entries: number) {
    this.progressIndicator.children().dispose();
    for (let i = 0; i < entries; i++) {
      new ImageView({
        left: dimen.pxs, centerY: 0,
        image: this.images.navigationBarProgress
      }).appendTo(this.progressIndicator);
    }
    this.activeEntry = 0;
  }

  set activeEntry(index: number) {
    const lastPage = index === this.progressIndicator.children().length - 1;
    this.nextTextView.set({
      text: lastPage ? this.texts.done : this.texts.next,
      right: lastPage ? dimen.xl : dimen.nxs
    });
    this.nextImageView.set({
      visible: !lastPage,
      excludeFromLayout: lastPage
    });
    this.skipView.excludeFromLayout = lastPage;
    this.progressIndicator.children(ImageView).forEach((indicator: ImageView, i: number) => {
      indicator.tintColor = i === index ? this.colors.actionIcon : this.colors.actionIconMedium;
    });
  }

}
