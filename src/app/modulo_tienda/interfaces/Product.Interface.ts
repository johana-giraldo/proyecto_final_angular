export interface ProductInterface {
  _id: string;
  name: string;
  code: string;
  description: string;
  purchasePrice: string;
  salePrice: string;
  quantity: number;
  stock: number;
  dateCreate: Date;
  dateUpdate: Date;
}
