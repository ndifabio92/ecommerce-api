import { Product } from "../../domain/entities/Product";
import { IProductRepository } from "../../domain/repositories/IProductRepository";
import { UpdateProductDto } from "../dtos/UpdateProductDto";

export class UpdateProductUseCase {
  constructor(private readonly productRepository: IProductRepository) {}

  async execute(
    id: string,
    productData: UpdateProductDto
  ): Promise<Product | null> {
    if (!id || id.trim().length === 0) {
      throw new Error("Product ID is required");
    }

    if (
      productData.title !== undefined &&
      productData.title.trim().length === 0
    ) {
      throw new Error("Product title cannot be empty");
    }

    if (productData.price !== undefined && productData.price <= 0) {
      throw new Error("Product price must be greater than zero");
    }

    if (productData.stock !== undefined && productData.stock < 0) {
      throw new Error("Product stock cannot be negative");
    }

    return await this.productRepository.update(id, productData);
  }
}
