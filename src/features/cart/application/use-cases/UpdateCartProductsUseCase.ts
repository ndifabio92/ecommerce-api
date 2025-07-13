import { Cart } from "../../domain/entities/Cart";
import { CartProduct } from "../../domain/entities/CartProduct";
import { ICartRepository } from "../../domain/repositories/ICartRepository";

export class UpdateCartProductsUseCase {
  constructor(private cartRepository: ICartRepository) {}

  async execute(cartId: string, products: CartProduct[]): Promise<Cart> {
    return await this.cartRepository.updateCartProducts(cartId, products);
  }
}
