import { Product } from "../../domain/entities/Product";
import { IProductRepository } from "../../domain/repositories/IProductRepository";
import { PaginationResult } from "../../../../shared/application/dtos/PaginationDto";
import { PaginationParamsDto } from "../../../../shared/application/dtos/PaginationParamsDto";

export class GetAllProductsUseCase {
  constructor(private readonly productRepository: IProductRepository) {}

  async execute(
    params: PaginationParamsDto
  ): Promise<PaginationResult<Product>> {
    return await this.productRepository.findAll(params);
  }
}
