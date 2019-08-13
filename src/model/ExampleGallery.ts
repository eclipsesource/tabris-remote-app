export default class ExampleGallery {
  public index: ExampleGalleryEntry[];
}

export class ExampleGalleryEntry {
  public name: string;
  public image: string;
  public description: string;
  public examples: Example[];
}

export class Example {
  public title: string;
  public fileName: string;
  public urlPathParameter: string;
}
