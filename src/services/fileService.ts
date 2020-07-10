import HttpService from './httpService';

export interface Metadata {
  ext: string;
  mimetype: string;
}

export interface FileResponse {
  fieldname: string;
  originalname: string;
  encoding: string;
  mimetype: string;
  size: number;
  bucket: string;
  key: string;
  acl: string;
  contentType: string;
  contentDisposition?: any;
  storageClass: string;
  serverSideEncryption?: any;
  metadata: Metadata;
  location: string;
  etag: string;
}

const FileService = {
  async upload(file: File) {
    const formData = new FormData();
    formData.append('file', file);

    await HttpService.postFormData<FileResponse[]>('/file', formData);
    return 'er';
  },
  uploadMultiple(files: File[]) {
    const formData = new FormData();
    files.forEach((file, index) => formData.append('file-' + index, file));

    return HttpService.postFormData<FileResponse[]>('/file/multiple', formData);
  },
  delete() {}
};

export default FileService;
