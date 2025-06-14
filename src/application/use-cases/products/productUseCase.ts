import * as path from "path";
import { v4 as uuidv4 } from "uuid";
import {
  LoadFromFile,
  SaveIntoFile,
} from "../../../infrastructure/utils/filesMethod";
import { Product } from "../../../domain/Dtos/Product.dto";
import { IProductRepository } from "../../../domain/repositories/IProductRepository";

const PATH = path.join(__dirname, "../../../data/products.json");

export class ProductUseCase {
  constructor(private readonly productRepository: IProductRepository) {}

  async getAllProducts(): Promise<Product[]> {
    return await this.productRepository.findAll();
  }

  async getProductById(id: string): Promise<Product | null> {
    return await this.productRepository.findById(id);
  }

  async createProduct(productData: Omit<Product, "id">): Promise<Product> {
    return await this.productRepository.create(productData);
  }

  async updateProduct(
    id: string,
    productData: Partial<Product>
  ): Promise<Product | null> {
    return await this.productRepository.update(id, productData);
  }

  async deleteProduct(id: string): Promise<boolean> {
    return await this.productRepository.delete(id);
  }
}
