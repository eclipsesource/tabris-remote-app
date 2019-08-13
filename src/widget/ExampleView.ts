import { AlertDialog, Composite, app } from 'tabris';
import { resolve } from 'tabris-decorators';
import { ExampleGalleryEntry } from '../model/ExampleGallery';
import { Texts } from '../res/Texts';
import AppLauncher from '../AppLauncher';

const EXAMPLE_BASE_URL = 'http://tabris.eclipsesource.com/3.6/';
const EXAMPLE_SOURCE_BASE_URL = 'https://github.com/eclipsesource/tabris-demos/tree/master/com.eclipsesource.tabris.demos/src/com/eclipsesource/tabris/demos/entrypoints';
const DOCUMENTATION_URL = 'https://github.com/eclipsesource/tabris-demos';

export default class ExampleView extends Composite {

  public update(_galleryEntry: ExampleGalleryEntry) {
    // to be implemented by subclasses
  }

}

export function launchExample(urlPathParameter: string) {
  resolve(AppLauncher).launchUrl(`${EXAMPLE_BASE_URL}/${urlPathParameter}`);
}

export function showExampleSource(fileName: string) {
  app.launch(`${EXAMPLE_SOURCE_BASE_URL}/${fileName}`)
    .catch(() => new AlertDialog({
      message: resolve(Texts).cannotOpenExampleSourceError(fileName),
      buttons: { ok: resolve(Texts).ok }
    }).open());
}

export function showDocumentation() {
  app.launch(DOCUMENTATION_URL)
    .catch(() => new AlertDialog({
      message: resolve(Texts).cannotOpenDocumentationError,
      buttons: { ok: resolve(Texts).ok }
    }).open());
}
