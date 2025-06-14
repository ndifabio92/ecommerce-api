import * as path from "path";
import { v4 as uuidv4 } from "uuid";
import { Product } from "../../domain/Dtos/Product.dto";
import { IProductRepository } from "../../domain/repositories/IProductRepository";
import { LoadFromFile, SaveIntoFile } from "../utils/filesMethod";

export class ProductRepository implements IProductRepository {
  private readonly PATH: string;

  constructor() {
    this.PATH = path.join(__dirname, "../../data/products.json");
  }

  async findAll(): Promise<Product[]> {
    return await LoadFromFile<Product>(this.PATH);
  }

  async findById(id: string): Promise<Product | null> {
    const products = await this.findAll();
    return products.find((product) => product.id === id) || null;
  }

  async create(productData: Omit<Product, "id">): Promise<Product> {
    const products = await this.findAll();
    const newProduct: Product = {
      ...productData,
      id: uuidv4(),
      status: true,
    };

    products.push(newProduct);
    await SaveIntoFile(this.PATH, products);
    return newProduct;
  }

  async update(
    id: string,
    productData: Partial<Product>
  ): Promise<Product | null> {
    const products = await this.findAll();
    const index = products.findIndex((product) => product.id === id);

    if (index === -1) return null;

    products[index] = { ...products[index], ...productData };
    await SaveIntoFile(this.PATH, products);
    return products[index];
  }

  async delete(id: string): Promise<boolean> {
    const products = await this.findAll();
    const filteredProducts = products.filter((product) => product.id !== id);

    if (filteredProducts.length === products.length) return false;

    await SaveIntoFile(this.PATH, filteredProducts);
    return true;
  }
}
