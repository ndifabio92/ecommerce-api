import { Cart } from "../../../domain/Dtos/Cart.dto";
import { CartRepository } from "../../../infrastructure/repositories/CartRepository";

export class CartUseCase {
  constructor(private readonly cartRepository: CartRepository) {}

  async getAllCarts(): Promise<Cart[]> {
    try {
      return await this.cartRepository.findAll();
    } catch (error) {
      console.error("Error in getAllCarts:", error);
      throw new Error("Failed to get all carts");
    }
  }

  async getCartById(id: string): Promise<Cart | null> {
    try {
      if (!id) {
        throw new Error("Cart ID is required");
      }
      return await this.cartRepository.findById(id);
    } catch (error) {
      console.error("Error in getCartById:", error);
      throw error;
    }
  }

  async createCart(): Promise<Cart> {
    try {
      return await this.cartRepository.create();
    } catch (error) {
      console.error("Error in createCart:", error);
      throw new Error("Failed to create cart");
    }
  }

  async addProductToCart(
    cartId: string,
    productId: string
  ): Promise<Cart | null> {
    try {
      if (!cartId || !productId) {
        throw new Error("Cart ID and Product ID are required");
      }

      const cart = await this.cartRepository.findById(cartId);
      if (!cart) {
        throw new Error("Cart not found");
      }

      return await this.cartRepository.addProductToCart(cartId, productId);
    } catch (error) {
      console.error("Error in addProductToCart:", error);
      throw error;
    }
  }

  async deleteCart(id: string): Promise<boolean> {
    try {
      if (!id) {
        throw new Error("Cart ID is required");
      }

      const cart = await this.cartRepository.findById(id);
      if (!cart) {
        throw new Error("Cart not found");
      }

      return await this.cartRepository.delete(id);
    } catch (error) {
      console.error("Error in deleteCart:", error);
      throw error;
    }
  }
}
