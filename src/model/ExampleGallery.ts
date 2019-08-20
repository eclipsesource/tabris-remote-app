export default class ExampleGallery {
  public index: ExampleGalleryEntry[];
}

export class ExampleGalleryEntry {
  public name: string;
  public image: string;
  public description: string;
  public example: Example;
}

export class Example {
  public runPath: string;
  public sourcePath: string;
}
