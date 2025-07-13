import { Product } from "../../domain/entities/Product";
import { IProductRepository } from "../../domain/repositories/IProductRepository";
import { CreateProductDto } from "../dtos/CreateProductDto";

export class CreateProductUseCase {
  constructor(private readonly productRepository: IProductRepository) {}

  async execute(productData: CreateProductDto): Promise<Product> {
    if (!productData.title || productData.title.trim().length === 0) {
      throw new Error("Product title is required");
    }

    if (productData.price <= 0) {
      throw new Error("Product price must be greater than zero");
    }

    if (productData.stock < 0) {
      throw new Error("Product stock cannot be negative");
    }

    return await this.productRepository.create({
      ...productData,
      status: true,
    });
  }
}
