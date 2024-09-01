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
  showMore: boolean;
  weight: number;
  warrantyInformation : string;
  shippingInformation: string;
  availabilityStatus: string;
}