export default class ExampleGallery {
  public docsVersion: string;
  public tagVersion: string;
  public index: ExampleGalleryEntry[];
}

export class ExampleGalleryEntry {
  public name: string;
  public image: string;
  public description: string;
  public snippets: Snippet[];
}

export class Snippet {
  public title: string;
  public url: string;
}
