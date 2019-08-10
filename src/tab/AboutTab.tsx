import { Composite, Properties, ScrollView, app } from 'tabris';
import { ComponentJSX, component, property, inject } from 'tabris-decorators';
import { Images } from '../res/Images';
import { Texts } from '../res/Texts';
import { isIos } from '../helper';
import CordovaPlugin from '../model/CordovaPlugin';
import SubHeader from '../widget/SubHeader';
import Divider from '../widget/Divider';
import AppTab from '../widget/AppTab';
import Header from '../widget/Header';
import analytics from '../analytics';
import settings from '../settings';
import color from '../res/color';
import dimen from '../res/dimen';
import font from '../res/font';
// @ts-ignore
import * as tabrisPackageJson from '../../node_modules/tabris/package.json';
// @ts-ignore
import * as packageJson from '../../package.json';

const NPM_MODULE_URL = 'https://www.npmjs.com/package';

// tslint:disable-next-line:no-any
declare let cordova: any;

@component export default class AboutTab extends AppTab {

  public jsxProperties: ComponentJSX<this>;
  private scrollView: ScrollView;
  private previousScrollOffset: number = 0;

  constructor(
    properties: Properties<AppTab>,
    @inject protected readonly images: Images,
    @inject protected readonly texts: Texts) {
    super({
      title: texts.about,
      image: images.aboutTabImage,
      ...properties
    });
  }

  public onSelectWhileAppeared() {
    super.onSelectWhileAppeared();
    this.scrollView.scrollToY(0, { animate: true });
  }

  protected createUi() {
    this.append(
      this.scrollView = <scrollView
        id='scrollView'
        left={0} top={0} right={0} bottom={0}
        onScrollY={(event) => this.updateScrollReceiver(event.offset)}>
        <Header
          id='header'
          left={0} top={0} right={0}
          title={this.texts.about}
          description={this.texts.aboutTabHeaderDescription} />
        {this.createFeedbackSection()}
        {this.createVersionsSection()}
        {this.createCordovaPluginsSection()}
        {this.createNpmModulesSection()}
        {this.createDivider()}
        {this.createSettingsSection()}
        {this.createDivider()}
        <textView
          left={dimen.m} top={dimen.pl} right={dimen.m}
          font={`italic ${font.body2}`}
          markupEnabled={true}
          lineSpacing={1.2}
          textColor={color.onBackgroundMedium}
          alignment='center'
          text={this.texts.aboutTabRights}
          onTapLink={({ url }) => app.launch(url)} />
        <composite left={0} top={dimen.p} right={0} height={dimen.l} />
      </scrollView>
    );
  }

  private createFeedbackSection() {
    return (
      <widgetCollection>
        <SubHeader
          text={this.texts.feedback}
          left={dimen.m} top={dimen.pl} right={dimen.m} />
        <KeyValueView
          left={0} top={dimen.p} right={0}
          key={this.texts.aboutTabFeedbackKey}
          value={this.texts.aboutTabFeedbackValue}
          icon={this.images.aboutTabFeedbackIcon}
          highlightOnTouch={true}
          onTap={() => app.launch('mailto:care@tabris.com?subject=Tabris.js%20feedback')} />
      </widgetCollection>);
  }

  private createVersionsSection() {
    return (
      <widgetCollection>
        <SubHeader
          text={this.texts.versions}
          left={dimen.m} top={dimen.pl} right={dimen.m} />
        <KeyValueView
          left={0} top={dimen.p} right={0}
          key={this.texts.aboutTabTabrisVersionKey}
          value={tabrisPackageJson.version}
          icon={this.images.aboutTabTabrisVersionIcon}
          highlightOnTouch={true}
          onTap={() => app.launch(`${NPM_MODULE_URL}/tabris`)} />
        <KeyValueView
          left={0} top={dimen.p} right={0}
          key={this.texts.aboutTabAppVersionKey}
          value={app.version}
          icon={this.images.aboutTabAppVersionIcon} />
        <KeyValueView
          left={0} top={dimen.p} right={0}
          key={this.texts.aboutTabAppVersionCodeKey}
          value={app.versionCode.toString()}
          icon={this.images.aboutTabAppVersionCodeIcon} />
      </widgetCollection>);
  }

  private createCordovaPluginsSection() {
    const plugins = AboutTab.getCordovaPlugins().map((plugin) =>
      <KeyValueView
        left={0} top={dimen.p} right={0}
        key={plugin.name}
        value={plugin.version}
        icon={this.images.aboutTabPluginsIcon}
        highlightOnTouch={true}
        onTap={() => app.launch(`${NPM_MODULE_URL}/${plugin.name}`)} />);
    return (
      <widgetCollection>
        <SubHeader
          left={dimen.m} top={dimen.pxl} right={dimen.m}
          text={this.texts.aboutTabPluginsHeader} />
        <textView
          left={dimen.m} top={dimen.p} right={dimen.m}
          text={this.texts.aboutTabPluginsDescription}
          font={font.body2}
          textColor={color.onBackgroundMedium}
          markupEnabled={true}
          lineSpacing={1.2}
          onTapLink={({ url }) => app.launch(url)}>
        </textView>
        {plugins}
      </widgetCollection>);
  }

  private createNpmModulesSection() {
    const dependencies = packageJson.dependencies;
    const modules = Object.keys(dependencies).map((moduleName) =>
      <KeyValueView
        left={0} top={dimen.p} right={0}
        key={moduleName}
        value={dependencies[moduleName]}
        icon={this.images.aboutTabNpmModulesIcon}
        highlightOnTouch={true}
        onTap={() => app.launch(`${NPM_MODULE_URL}/${moduleName}`)} />);
    return (
      <widgetCollection>
        <SubHeader
          left={dimen.m} top={dimen.pxl} right={dimen.m}
          text={this.texts.aboutTabNpmModulesHeader} />
        {modules}
      </widgetCollection>);
  }

  private createSettingsSection() {
    return (
      <widgetCollection>
        <SubHeader
          left={dimen.m} top={dimen.pl} right={dimen.m}
          text={this.texts.settings} />
        <composite left={0} top={dimen.pxs} right={0}>
          <textView
            left={dimen.m} top={0} right={dimen.xxxl}
            font={font.body1}
            text={this.texts.aboutTabSettingsSubHeader} />
          <textView
            top={dimen.pxs} left={dimen.m} right={dimen.xxxl}
            lineSpacing={1.2}
            font={font.body2}
            textColor={color.onBackgroundMedium}
            text={this.texts.aboutTabSettingsDescription} />
          <switch
            top={dimen.xs} right={dimen.m}
            checked={settings.analyticsEnabled}
            trackOffColor={isIos() ? color.secondary : null}
            trackOnColor={isIos() ? color.secondary : null}
            onSelect={event => {
              settings.analyticsEnabled = event.checked;
              analytics.enabled = event.checked;
            }} />
        </composite>
      </widgetCollection>);
  }

  private createDivider() {
    return (
      <Divider
        left={0} top={dimen.pl} right={0}
        background={color.onBackgroundDivider} />);
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

  public jsxProperties: ComponentJSX<this>;
  @property public key: string;
  @property public value: string;
  @property public icon: Image;

  constructor(properties: Properties<Composite>) {
    super({ height: 72, ...properties });
    this.append(
      <widgetCollection>
        <imageView
          id='icon'
          left={dimen.m} centerY={0} width={40} height={40}
          cornerRadius={20}
          tintColor={color.onPrimary}
          background={color.primary}
          bind-image='icon' />
        <composite
          left={dimen.pm} right={dimen.m} centerY={0}>
          <textView
            id='key'
            left={0} top={0} right={0}
            font={font.body2}
            textColor={color.onBackgroundMedium}
            bind-text='key' />
          <textView
            id='value'
            left={0} top={dimen.p} right={0}
            markupEnabled={true}
            font={font.body1}
            textColor={color.onBackground}
            onTapLink={({ url }) => app.launch(url)}
            bind-text='value' />
        </composite>
      </widgetCollection>
    );
  }

}
