export class FileSelectedData {
  uri: string;
  type: string;
  name: string;

  constructor(uri: string, type: string, name: string) {
    this.uri = uri;
    this.type = type;
    this.name = name;
  }
}
