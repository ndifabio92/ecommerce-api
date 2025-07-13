import { Cart } from "../../domain/entities/Cart";
import { ICartRepository } from "../../domain/repositories/ICartRepository";

export class GetCartByIdUseCase {
  constructor(private cartRepository: ICartRepository) {}

  async execute(cartId: string): Promise<Cart | null> {
    return await this.cartRepository.findById(cartId);
  }
}
