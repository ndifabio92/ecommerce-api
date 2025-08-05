import { Cart } from "../../domain/entities/Cart";
import { ICartRepository } from "../../domain/repositories/ICartRepository";

export class CreateCartUseCase {
  constructor(private cartRepository: ICartRepository) {}

  async execute(userId: string): Promise<Cart> {
    return await this.cartRepository.create(userId);
  }
}
