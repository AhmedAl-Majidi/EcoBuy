export interface Product {
  id: number;
  title: string;
  description: string;
  category: string;
  price: number;
  discountPercentage: number;
  rating: number;
  stock: number;
  brand: string;
  images: string[];
}


export interface ProductResponse {
  products: Product[];
  total: number;
  skip: number;
  limit: number;
}  