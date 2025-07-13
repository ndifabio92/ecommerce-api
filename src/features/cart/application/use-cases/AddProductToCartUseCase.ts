import { Cart } from "../../domain/entities/Cart";
import { ICartRepository } from "../../domain/repositories/ICartRepository";

export class AddProductToCartUseCase {
  constructor(private cartRepository: ICartRepository) {}

  async execute(
    cartId: string,
    productId: string,
    quantity: number = 1
  ): Promise<Cart> {
    return await this.cartRepository.addProductToCart(
      cartId,
      productId,
      quantity
    );
  }
}
