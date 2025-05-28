import { CartProduct } from "../../domain/Dtos/CartProduct.dto";
import { Product } from "../../domain/Dtos/Product.dto";
import * as fs from "fs";

export const LoadFromFile = async (
  path: string
): Promise<Product[] | CartProduct[]> => {
  try {
    if (fs.existsSync(path)) {
      const data = await fs.promises.readFile(path, "utf8");
      return JSON.parse(data);
    } else {
      await fs.promises.writeFile(path, "[]", "utf8");
      return [];
    }
  } catch (error) {
    console.error("Error loading products:", error);
    return [];
  }
};

export const SaveIntoFile = async (
  path: string,
  items: Product[] | CartProduct[]
): Promise<void> => {
  try {
    await fs.promises.writeFile(path, JSON.stringify(items, null, 2), "utf8");
  } catch (error) {
    console.error("Error saving products:", error);
  }
};
