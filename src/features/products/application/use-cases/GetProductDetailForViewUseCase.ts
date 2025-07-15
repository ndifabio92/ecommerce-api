import { IProductRepository } from "../../domain/repositories/IProductRepository";
import { ProductDetailViewDto } from "../dtos/ProductDetailViewDto";

export class GetProductDetailForViewUseCase {
  constructor(private readonly productViewRepository: IProductRepository) {}

  async execute(id: string): Promise<ProductDetailViewDto | null> {
    return await this.productViewRepository.findByIdForView(id);
  }
}
