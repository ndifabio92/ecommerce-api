import * as path from "path";
import { v4 as uuidv4 } from "uuid";
import {
  LoadFromFile,
  SaveIntoFile,
} from "../../../infrastructure/utils/filesMethod";
import { Product } from "../../../domain/Dtos/Product.dto";

const PATH = path.join(__dirname, "../../../data/products.json");

export const readFile = async (): Promise<Product[]> => {
  const data = await LoadFromFile(PATH);
  return data as Product[];
};

export const insertFile = async (productData: Omit<Product, "id">) => {
  const products = await readFile();
  const newProduct: Product = {
    ...productData,
    id: uuidv4(),
    status: true,
  };

  products.push(newProduct);
  await SaveIntoFile(PATH, products);
  return newProduct;
};

export const findById = async (id: string) => {
  const products = await readFile();
  return products.find((x) => x.id === id) ?? [];
};

export const deleteById = async (id: string) => {
  const products = await readFile();
  await SaveIntoFile(
    PATH,
    products.filter((x) => x.id !== id)
  );
  return true;
};
