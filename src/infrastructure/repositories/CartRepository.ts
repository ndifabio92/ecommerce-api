import * as path from "path";
import { v4 as uuidv4 } from "uuid";
import { Cart } from "../../domain/Dtos/Cart.dto";
import { ICartRepository } from "../../domain/repositories/ICartRepository";
import { LoadFromFile, SaveIntoFile } from "../utils/filesMethod";

export class CartRepository implements ICartRepository {
  private readonly PATH: string;

  constructor() {
    this.PATH = path.join(__dirname, "../../data/carts.json");
  }

  async findAll(): Promise<Cart[]> {
    try {
      const carts = await LoadFromFile(this.PATH);
      return (carts as Cart[]).map((cart) => ({
        ...cart,
        createdAt: new Date(cart.createdAt || Date.now()),
        updatedAt: new Date(cart.updatedAt || Date.now()),
      }));
    } catch (error) {
      console.error("Error reading carts:", error);
      return [];
    }
  }

  async findById(id: string): Promise<Cart | null> {
    try {
      const carts = await this.findAll();
      const cart = carts.find((cart) => cart.id === id);
      return cart || null;
    } catch (error) {
      console.error("Error finding cart:", error);
      return null;
    }
  }

  async create(): Promise<Cart> {
    try {
      const carts = await this.findAll();
      const newCart: Cart = {
        id: uuidv4(),
        products: [],
        createdAt: new Date(),
        updatedAt: new Date(),
      };
      carts.push(newCart);
      await SaveIntoFile(this.PATH, carts);
      return newCart;
    } catch (error) {
      console.error("Error creating cart:", error);
      throw new Error("Failed to create cart");
    }
  }

  async update(id: string, cartData: Partial<Cart>): Promise<Cart | null> {
    try {
      const carts = await this.findAll();
      const cartIndex = carts.findIndex((cart) => cart.id === id);

      if (cartIndex === -1) return null;

      const updatedCart = {
        ...carts[cartIndex],
        ...cartData,
        updatedAt: new Date(),
      };

      carts[cartIndex] = updatedCart;
      await SaveIntoFile(this.PATH, carts);
      return updatedCart;
    } catch (error) {
      console.error("Error updating cart:", error);
      return null;
    }
  }

  async delete(id: string): Promise<boolean> {
    try {
      const carts = await this.findAll();
      const filteredCarts = carts.filter((cart) => cart.id !== id);

      if (filteredCarts.length === carts.length) return false;

      await SaveIntoFile(this.PATH, filteredCarts);
      return true;
    } catch (error) {
      console.error("Error deleting cart:", error);
      return false;
    }
  }

  async addProductToCart(
    cartId: string,
    productId: string
  ): Promise<Cart | null> {
    try {
      const carts = await this.findAll();
      const cartIndex = carts.findIndex((cart) => cart.id === cartId);

      if (cartIndex === -1) return null;

      const cart = carts[cartIndex];
      const existingProduct = cart.products.find(
        (p) => p.id_product === productId
      );

      if (existingProduct) {
        existingProduct.quantity += 1;
      } else {
        cart.products.push({ id_product: productId, quantity: 1 });
      }

      cart.updatedAt = new Date();
      await SaveIntoFile(this.PATH, carts);
      return cart;
    } catch (error) {
      console.error("Error adding product to cart:", error);
      return null;
    }
  }
}
