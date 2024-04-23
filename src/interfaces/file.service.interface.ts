export default interface IFileService {
  readFile(photoPath: string): unknown;
  readFileInBase64(path: string): Promise<string>;
  }
  