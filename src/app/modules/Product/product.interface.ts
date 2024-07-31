export interface IProduct {
  name: string;
  brand: string;
  price: number;
  quantity: number;
  rating: number;
  description: string;
  imageUrl?: string;
  isDeleted: boolean;
  inStock: boolean;
}

export interface CloudinaryResponse {
  secure_url: string;
}
