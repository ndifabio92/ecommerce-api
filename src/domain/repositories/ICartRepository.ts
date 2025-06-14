import { Cart } from "../Dtos/Cart.dto";

export interface ICartRepository {
  findAll(): Promise<Cart[]>;
  findById(id: string): Promise<Cart | null>;
  create(): Promise<Cart>;
  update(id: string, cart: Partial<Cart>): Promise<Cart | null>;
  delete(id: string): Promise<boolean>;
  addProductToCart(cartId: string, productId: string): Promise<Cart | null>;
}
