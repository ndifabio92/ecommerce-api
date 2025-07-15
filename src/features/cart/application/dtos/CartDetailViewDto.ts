export interface CartDetailViewDto {
  id: string;
  products: Array<{
    id: string;
    title: string;
    price: number;
    quantity: number;
    category: string;
    thumbnails: string[];
  }>;
  totalPrice: number;
  createdAt: Date;
  updatedAt: Date;
}
