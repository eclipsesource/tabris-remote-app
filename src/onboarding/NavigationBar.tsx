import { Composite, ImageView, Properties, TextView } from 'tabris';
import { ComponentJSX, Listeners, getById, component } from 'tabris-decorators';
import { isAndroid } from '../helper';
import color from '../res/color';
import dimen from '../res/dimen';
import font from '../res/font';

@component export default class NavigationBar extends Composite {

  public jsxProperties: ComponentJSX<this>;
  public onSkipButton: Listeners<{ target: object }> = new Listeners(this, 'skipButton');
  public onNextButton: Listeners<{ target: object }> = new Listeners(this, 'nextButton');
  @getById private skipView: Composite;
  @getById private nextTextView: TextView;
  @getById private nextImageView: ImageView;
  @getById private progressIndicator: Composite;

  constructor(properties: Properties<Composite>) {
    super();
    this.createUi();
    this.set(properties);
  }

  private createUi() {
    this.append(<widgetCollection>
      <composite
        id='skipView'
        top={0} bottom={0}
        highlightOnTouch={true}
        onTap={() => this.onSkipButton.trigger()}>
        <textView
          left={dimen.xl} top={0} right={dimen.xl} bottom={0} centerY={0}
          text='Skip'
          font={font.subtitle1} />
      </composite>
      <composite
        top={0} right={0} bottom={0}
        highlightOnTouch={true}
        onTap={() => this.onNextButton.trigger()}>
        <textView
          id='nextTextView'
          left={dimen.xl} right={dimen.nxs} centerY={0}
          text='Next'
          font={font.subtitle1} />
        <imageView
          id='nextImageView'
          right={dimen.xl} centerY={isAndroid() ? 1 : 0}
          tintColor={color.actionIcon}
          image={{ src: 'images/next-black-24dp@3x.png', scale: 3 }} />
      </composite>
      <composite
        id='progressIndicator'
        top='#separator' bottom={0} centerX={0} />
    </widgetCollection>);
  }

  set entries(entries: number) {
    this.progressIndicator.children().dispose();
    for (let i = 0; i < entries; i++) {
      new ImageView({
        left: dimen.pxs, centerY: 0,
        image: { src: 'images/navbar-progress-8dp@3x.png', scale: 3 }
      }).appendTo(this.progressIndicator);
    }
    this.activeEntry = 0;
  }

  set activeEntry(index: number) {
    const lastPage = index === this.progressIndicator.children().length - 1;
    this.nextTextView.set({
      text: lastPage ? 'Done' : 'Next',
      right: lastPage ? dimen.xl : ['next()', dimen.xs]
    });
    this.nextImageView.visible = !lastPage;
    this.skipView.visible = !lastPage;
    this.progressIndicator
      .children(ImageView)
      .forEach((indicator: ImageView, i: number) => {
        indicator.tintColor = i === index ? color.actionIcon : color.actionIconMedium;
      });
  }

}
