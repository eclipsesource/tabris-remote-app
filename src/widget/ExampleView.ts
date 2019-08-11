import { AlertDialog, Composite, app } from 'tabris';
import { resolve } from 'tabris-decorators';
import { ExampleGalleryEntry } from '../model/ExampleGallery';
import AppLauncher from '../AppLauncher';
import analytics from '../analytics';

export default class ExampleView extends Composite {

  public update(_docsVersion: string, _tagVersion: string, _galleryEntry: ExampleGalleryEntry) {
    // to be implemented by subclasses
  }

}

export function launchUrl(url: string) {
  resolve(AppLauncher).launchUrl(url);
  analytics.logLaunchUrl(url);
}

export function showSnippetSource(fileName: string, version: string) {
  app.launch(`https://github.com/eclipsesource/tabris-js/blob/${version}/snippets/${fileName}`)
    .then(() => analytics.logShowSnippetSource(fileName))
    .catch(() => new AlertDialog({
      message: `Can not open snippet ${fileName}.`,
      buttons: { ok: 'OK' }
    }).open());
}

export function showExampleDocs(widgetName: string, version: string) {
  app.launch(`https://docs.tabris.com/${version}/api/${widgetName}.html`)
    .then(() => analytics.logShowDocs(widgetName))
    .catch(() => new AlertDialog({
      message: `Can not open docs for ${widgetName}.`,
      buttons: { ok: 'OK' }
    }).open());
}
