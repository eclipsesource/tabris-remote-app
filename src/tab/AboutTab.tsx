import { app, Composite, Properties, ScrollView } from 'tabris';
import { ComponentJSX, component, property } from 'tabris-decorators';
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

  constructor(properties: Properties<AppTab>) {
    super({
      title: 'About',
      image: { src: 'images/info-black-24dp@3x.png', scale: 3 },
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
        onScrollY={(e) => this.updateScrollReceiver(e.offset)}>
        <Header
          id='header'
          left={0} top={0} right={0}
          title='About'
          description='Tabris.js is brought to you by EclipseSource.' />
        {this.createFeedbackSection()}
        {this.createVersionsSection()}
        {this.createCordovaPluginsSection()}
        {this.createNpmModulesSection()}
        <Divider
          left={0} top={dimen.pl} right={0}
          background={color.onBackgroundDivider} />
        {this.createSettingsSection()}
        <Divider
          left={0} top={dimen.pl} right={0}
          background={color.onBackgroundDivider} />
        <textView
          left={dimen.m} top={dimen.pl} right={dimen.m}
          font={`italic ${font.body2}`}
          markupEnabled={true}
          lineSpacing={1.2}
          textColor={color.onBackgroundMedium}
          alignment='center'
          text={`© ${new Date().getFullYear()} EclipseSource. All rights reserved.<br/>
            <a href="https://tabris.com">www.tabris.com</a>`}
          onTapLink={({ url }) => app.launch(url)} />
        <composite left={0} top={dimen.p} right={0} height={dimen.l} />
      </scrollView>
    );
  }

  private createFeedbackSection() {
    return (
      <widgetCollection>
        <SubHeader
          text='Feedback'
          left={dimen.m} top={dimen.pl} right={dimen.m} />
        <KeyValueView
          left={0} top={dimen.p} right={0}
          key='Provide feedback'
          value='Help us make Tabris.js better.'
          icon='images/feedback-white-24dp@3x.png'
          highlightOnTouch={true}
          onTap={() => app.launch('mailto:care@tabris.com?subject=Tabris.js%20feedback')} />
      </widgetCollection>);
  }

  private createVersionsSection() {
    return (
      <widgetCollection>
        <SubHeader
          text='Versions'
          left={dimen.m} top={dimen.pl} right={dimen.m} />
        <KeyValueView
          left={0} top={dimen.p} right={0}
          key='Bundled tabris module'
          value={tabrisPackageJson.version}
          icon='images/tabris-logo-black-24dp@3x.png'
          highlightOnTouch={true}
          onTap={() => app.launch(`${NPM_MODULE_URL}/tabris`)} />
        <KeyValueView
          left={0} top={dimen.p} right={0}
          key='App version'
          value={app.version}
          icon='images/device-black-24dp@3x.png' />
        <KeyValueView
          left={0} top={dimen.p} right={0}
          key='App version code'
          value={app.versionCode.toString()}
          icon='images/device-black-24dp@3x.png' />
      </widgetCollection>);
  }

  private createCordovaPluginsSection() {
    const plugins = AboutTab.getCordovaPlugins().map((plugin) =>
      <KeyValueView
        left={0} top={dimen.p} right={0}
        key={plugin.name}
        value={plugin.version}
        icon='images/cordova-black-24dp@3x.png'
        highlightOnTouch={true}
        onTap={() => app.launch(`${NPM_MODULE_URL}/${plugin.name}`)} />);
    return (
      <widgetCollection>
        <SubHeader
          left={dimen.m} top={dimen.pxl} right={dimen.m}
          text='Bundled cordova plugins' />
        <textView
          left={dimen.m} top={dimen.p} right={dimen.m}
          text={'<i>To add a custom set of plugins you need to build your own app as described on ' +
            '<a href="https://docs.tabris.com/latest/cordova.html">www.tabris.com</a>.</i>'}
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
        icon='images/npm-black-24dp@3x.png'
        highlightOnTouch={true}
        onTap={() => app.launch(`${NPM_MODULE_URL}/${moduleName}`)} />);
    return (
      <widgetCollection>
        <SubHeader
          left={dimen.m} top={dimen.pxl} right={dimen.m}
          text='Bundled npm modules' />
        {modules}
      </widgetCollection>);
  }

  private createSettingsSection() {
    return (
      <widgetCollection>
        <SubHeader
          left={dimen.m} top={dimen.pl} right={dimen.m}
          text='Settings' />
        <composite left={0} top={dimen.pxs} right={0}>
          <textView
            left={dimen.m} top={0} right={dimen.xxxl}
            font={font.body1}
            text='Gather usage data' />
          <textView
            top={dimen.pxs} left={dimen.m} right={dimen.xxxl}
            lineSpacing={1.2}
            font={font.body2}
            textColor={color.onBackgroundMedium}
            text='Help make Tabris.js better by sending usage statistics and crash reports to EclipseSource.' />
          <switch
            top={dimen.xs} right={dimen.m}
            checked={settings.analyticsEnabled}
            trackOffColor={isIos() ? color.secondary : null}
            trackOnColor={isIos() ? color.secondary : null}
            onSelect={e => {
              settings.analyticsEnabled = e.checked;
              analytics.enabled = e.checked;
            }} />
        </composite>
      </widgetCollection>);
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
  @property public icon: string;

  constructor(properties: Properties<Composite>) {
    super();
    this.append(
      <widgetCollection>
        <imageView
          id='icon'
          centerY={0}
          left={dimen.m} width={32} height={32}
          cornerRadius={16}
          tintColor={color.onPrimary}
          background={color.primary}
          bind-image={{ path: 'icon', converter: (src: string) => ({ src, scale: 3 }) }} />
        <textView
          id='key'
          left={dimen.xxxl} top={dimen.xs} right={dimen.m}
          font={font.body2}
          textColor={color.onBackgroundMedium}
          bind-text='key' />
        <textView
          id='value'
          left={dimen.xxxl} right={dimen.m} top={dimen.p}
          markupEnabled={true}
          font={font.body1}
          textColor={color.onBackground}
          onTapLink={({ url }) => app.launch(url)}
          bind-text='value' />
      </widgetCollection>
    );
    this.set({ height: 56, ...properties });
  }

}
