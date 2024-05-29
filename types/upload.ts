export type UploadFolderType =
  | 'post'
  | 'gallery'
  | 'product'
  | 'membership'
  | 'profile';

export type UploadModel = {
  createdAt: Date;
  uid: string;
  name: string;
  status: string;
  url: string;
  size: number;
  productId: string;
  path: string;
};
