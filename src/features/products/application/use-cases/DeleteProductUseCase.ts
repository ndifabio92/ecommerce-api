import { IProductRepository } from "../../domain/repositories/IProductRepository";

export class DeleteProductUseCase {
  constructor(private readonly productRepository: IProductRepository) {}

  async execute(id: string): Promise<boolean> {
    return await this.productRepository.delete(id);
  }
}
