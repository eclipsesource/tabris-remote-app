import { Composite, Properties, ScrollView, app, TextView, ImageValue, ImageView, StackLayout } from 'tabris';
import { component, property, inject } from 'tabris-decorators';
import { Colors } from '../res/Colors';
import { Images } from '../res/Images';
import { Fonts } from '../res/Fonts';
import { Texts } from '../res/Texts';
import CordovaPlugin from '../model/CordovaPlugin';
import SubHeader from '../widget/SubHeader';
import Divider from '../widget/Divider';
import AppTab from './AppTab';
import Header from '../widget/Header';
import dimen from '../res/dimen';
// @ts-ignore
import * as tabrisJsRemotePackageJson from '../../node_modules/tabris-js-remote/package.json';
// @ts-ignore
import * as tabrisPackageJson from '../../node_modules/tabris/package.json';

const NPM_MODULE_URL = 'https://www.npmjs.com/package';

// tslint:disable-next-line:no-any
declare let cordova: any;

@component export default class AboutTab extends AppTab {

  private scrollView: ScrollView;
  private previousScrollOffset: number = 0;

  constructor(
    properties: Properties<AppTab>,
    @inject protected readonly colors: Colors,
    @inject protected readonly images: Images,
    @inject protected readonly fonts: Fonts,
    @inject protected readonly texts: Texts) {
    super({
      title: texts.about,
      image: images.aboutTabImage,
      ...properties
    });
    this.onReselect(() => this.scrollView.scrollToY(0, {animate: true}));
  }

  protected createUi() {
    this.append(
      this.scrollView = <ScrollView
        id='scrollView'
        stretch
        layout={new StackLayout({ alignment: 'stretchX' })}
        scrollbarVisible={false}
        onScrollY={(event) => this.updateScrollReceiver(event.offset)}>
        <Header
          id='header'
          stretchX top
          title={this.texts.about}
          description={this.texts.aboutTabHeaderDescription} />
        {this.createFeedbackSection()}
        {this.createVersionsSection()}
        {this.createCordovaPluginsSection()}
        {this.createDivider()}
        <TextView
          left={dimen.m} top={dimen.l} right={dimen.m}
          font={`italic ${this.fonts.body2}`}
          markupEnabled
          lineSpacing={1.2}
          textColor={this.colors.onBackgroundMedium}
          alignment='centerX'
          text={this.texts.aboutTabRights}
          onTapLink={({ url }) => app.launch(url)} />
        <Composite stretchX height={dimen.l} />
      </ScrollView>
    );
  }

  private createFeedbackSection() {
    return (
      <$>
        <SubHeader
          text={this.texts.feedback}
          left={dimen.m} top={dimen.l} right={dimen.m} />
        <KeyValueView
          key={this.texts.aboutTabFeedbackKey}
          value={this.texts.aboutTabFeedbackValue}
          icon={this.images.aboutTabFeedbackIcon}
          highlightOnTouch
          onTap={() => app.launch('mailto:care@tabris.com?subject=Tabris%20for%20Eclipse%20RAP%20feedback')} />
      </$>);
  }

  private createVersionsSection() {
    return (
      <$>
        <SubHeader
          text={this.texts.versions}
          left={dimen.m} top={dimen.l} right={dimen.m} />
        <KeyValueView
          key={this.texts.aboutTabTabrisJsRemoteVersionKey}
          value={tabrisJsRemotePackageJson.version}
          icon={this.images.aboutTabTabrisVersionIcon} />
        <KeyValueView
          key={this.texts.aboutTabTabrisVersionKey}
          value={tabrisPackageJson.version}
          icon={this.images.aboutTabTabrisVersionIcon}
          highlightOnTouch
          onTap={() => app.launch(`${NPM_MODULE_URL}/tabris`)} />
        <KeyValueView
          key={this.texts.aboutTabAppVersionKey}
          value={app.version}
          icon={this.images.aboutTabAppVersionIcon} />
        <KeyValueView
          key={this.texts.aboutTabAppVersionCodeKey}
          value={app.versionCode.toString()}
          icon={this.images.aboutTabAppVersionCodeIcon} />
      </$>);
  }

  private createCordovaPluginsSection() {
    const plugins = AboutTab.getCordovaPlugins().map((plugin) =>
      <KeyValueView
        key={plugin.name}
        value={plugin.version}
        icon={this.images.aboutTabPluginsIcon}
        highlightOnTouch
        onTap={() => app.launch(`${NPM_MODULE_URL}/${plugin.name}`)} />);
    return (
      <$>
        <SubHeader
          left={dimen.m} top={dimen.xl} right={dimen.m}
          text={this.texts.aboutTabPluginsHeader} />
        {plugins}
      </$>);
  }

  private createDivider() {
    return (
      <Divider
        background={this.colors.onBackgroundDivider} />);
  }

  private updateScrollReceiver(offset: number) {
    this.scrollReceiver.onScroll(offset - this.previousScrollOffset);
    this.previousScrollOffset = offset;
  }

  private static getCordovaPlugins() {
    const plugins = Array<CordovaPlugin>();
    if (typeof cordova !== 'undefined') {
      // @ts-ignore
      const pluginList = cordova.require('cordova/plugin_list');
      const metadata = pluginList.metadata;
      for (const key in metadata) {
        if (metadata.hasOwnProperty(key)) {
          plugins.push({ name: key, version: metadata[key] });
        }
      }
      // Cordova 5.4+ returns empty metadata object. Extract plugin names from the list
      if (plugins.length === 0) {
        const pluginIds = [];
        for (let pluginId of pluginList) {
          pluginId = pluginId.substring(0, pluginId.lastIndexOf('.'));
          if (pluginIds.indexOf(pluginId) === -1) {
            pluginIds.push(pluginId);
            plugins.push({ name: pluginId, version: '' });
          }
        }
      }
    }
    return plugins.sort((a, b) => a.name.localeCompare(b.name));
  }
}

@component class KeyValueView extends Composite {

  @property public key: string;
  @property public value: string;
  @property public icon: ImageValue;

  constructor(
    properties: Properties<Composite>,
    @inject protected readonly colors: Colors,
    @inject protected readonly fonts: Fonts) {
    super({ height: 72, ...properties });
    this.append(
      <$>
        <ImageView
          id='icon'
          left={dimen.m} centerY width={40} height={40}
          cornerRadius={20}
          tintColor={colors.onPrimary}
          background={colors.primary}
          bind-image='icon' />
        <Composite
          left={dimen.pm} right={dimen.m} centerY>
          <TextView
            id='key'
            stretchX top
            font={this.fonts.body2}
            textColor={colors.onBackgroundMedium}
            bind-text='key' />
          <TextView
            id='value'
            stretchX top={dimen.p}
            markupEnabled
            font={this.fonts.body1}
            textColor={colors.onBackground}
            onTapLink={({ url }) => app.launch(url)}
            bind-text='value' />
        </Composite>
      </$>
    );
  }

}
