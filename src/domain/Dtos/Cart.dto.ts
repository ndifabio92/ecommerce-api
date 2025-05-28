import { CartProduct } from "./CartProduct.dto";

export interface Cart {
  id: string;
  products: CartProduct[];
}
