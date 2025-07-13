import { Cart } from "../../domain/entities/Cart";
import { ICartRepository } from "../../domain/repositories/ICartRepository";

export class ClearCartUseCase {
  constructor(private cartRepository: ICartRepository) {}

  async execute(cartId: string): Promise<Cart> {
    return await this.cartRepository.clearCart(cartId);
  }
}
