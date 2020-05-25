import { AlertDialog, Composite, app } from 'tabris';
import { resolve } from 'tabris-decorators';
import { ExampleGalleryEntry } from '../model/ExampleGallery';
import { Texts } from '../res/Texts';
import AppLauncher from '../AppLauncher';

const EXAMPLE_BASE_URL = 'http://tabris.eclipsesource.com/3.12';
const EXAMPLE_SOURCE_BASE_URL = 'https://github.com/eclipsesource/tabris-demos/tree/master/com.eclipsesource.tabris.demos/src/com/eclipsesource/tabris/demos/entrypoints';

export default class ExampleView extends Composite {

  public update(_galleryEntry: ExampleGalleryEntry) {
    // to be implemented by subclasses
  }

}

export function launchExample(runPath: string) {
  resolve(AppLauncher).launchUrl(`${EXAMPLE_BASE_URL}/${runPath}`);
}

export function showExampleSource(sourcePath: string) {
  app.launch(`${EXAMPLE_SOURCE_BASE_URL}/${sourcePath}`)
    .catch(() => AlertDialog.open(resolve(Texts).cannotOpenExampleSourceError(sourcePath)));
}
