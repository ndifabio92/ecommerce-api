import { Product } from "../../domain/entities/Product";
import { IProductRepository } from "../../domain/repositories/IProductRepository";

export class GetProductUseCase {
  constructor(private readonly productRepository: IProductRepository) {}

  async execute(id: string): Promise<Product | null> {
    if (!id || id.trim().length === 0) {
      throw new Error("Product ID is required");
    }
    return await this.productRepository.findById(id);
  }
}
