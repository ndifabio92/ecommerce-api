export interface ProductDetailViewDto {
  id: string;
  title: string;
  description: string;
  code: string;
  price: number;
  stock: number;
  category: string;
  thumbnails: string[];
  status: boolean;
  createdAt: Date;
  updatedAt: Date;
} 