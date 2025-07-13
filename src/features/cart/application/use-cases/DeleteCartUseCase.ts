import { ICartRepository } from "../../domain/repositories/ICartRepository";

export class DeleteCartUseCase {
  constructor(private cartRepository: ICartRepository) {}

  async execute(cartId: string): Promise<boolean> {
    return await this.cartRepository.delete(cartId);
  }
}
