import { CartDetailViewDto } from "../../application/dtos/CartDetailViewDto";
import { Cart } from "../entities/Cart";
import { CartProduct } from "../entities/CartProduct";

export interface ICartRepository {
  findById(id: string): Promise<Cart | null>;
  create(userId?: string): Promise<Cart>;
  addProductToCart(
    cartId: string,
    productId: string,
    quantity: number
  ): Promise<Cart>;
  removeProductFromCart(cartId: string, productId: string): Promise<Cart>;
  updateCartProducts(cartId: string, products: CartProduct[]): Promise<Cart>;
  updateProductQuantity(
    cartId: string,
    productId: string,
    quantity: number
  ): Promise<Cart>;
  delete(id: string): Promise<boolean>;
  clearCart(id: string): Promise<Cart>;

  //VIEW
  findByIdForView(id: string): Promise<CartDetailViewDto | null>;
}
