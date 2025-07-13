import { Cart } from "../../domain/entities/Cart";
import { ICartRepository } from "../../domain/repositories/ICartRepository";

export class RemoveProductFromCartUseCase {
  constructor(private cartRepository: ICartRepository) {}

  async execute(cartId: string, productId: string): Promise<Cart> {
    return await this.cartRepository.removeProductFromCart(cartId, productId);
  }
}
