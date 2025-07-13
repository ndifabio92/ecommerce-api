import { Cart } from "../../domain/entities/Cart";
import { ICartRepository } from "../../domain/repositories/ICartRepository";
export class UpdateProductQuantityUseCase {
  constructor(private cartRepository: ICartRepository) {}

  async execute(
    cartId: string,
    productId: string,
    quantity: number
  ): Promise<Cart> {
    return await this.cartRepository.updateProductQuantity(
      cartId,
      productId,
      quantity
    );
  }
}
