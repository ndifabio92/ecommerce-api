export interface CartProduct {
  id_product: string;
  quantity: number; 
}
export interface Cart {
  id: string;
  products: CartProduct[];
}