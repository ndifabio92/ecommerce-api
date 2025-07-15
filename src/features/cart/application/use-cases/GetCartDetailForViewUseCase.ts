import { ICartRepository } from "../../domain/repositories/ICartRepository";
import { CartDetailViewDto } from "../dtos/CartDetailViewDto";

export class GetCartDetailForViewUseCase {
  constructor(private readonly cartViewRepository: ICartRepository) {}

  async execute(id: string): Promise<CartDetailViewDto | null> {
    return await this.cartViewRepository.findByIdForView(id);
  }
}
