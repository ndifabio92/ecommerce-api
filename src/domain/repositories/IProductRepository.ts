import { Product } from "../Dtos/Product.dto";

export interface IProductRepository {
  findAll(): Promise<Product[]>;
  findById(id: string): Promise<Product | null>;
  create(product: Omit<Product, "id">): Promise<Product>;
  update(id: string, product: Partial<Product>): Promise<Product | null>;
  delete(id: string): Promise<boolean>;
}
