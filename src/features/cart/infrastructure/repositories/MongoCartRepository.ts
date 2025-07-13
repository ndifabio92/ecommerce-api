import { Cart } from "../../domain/entities/Cart";
import { CartProduct } from "../../domain/entities/CartProduct";
import { ICartRepository } from "../../domain/repositories/ICartRepository";
import { CartModel } from "../models/CartModel";

export class MongoCartRepository implements ICartRepository {
  async create(): Promise<Cart> {
    try {
      const cartDoc = await CartModel.create({ products: [] });
      return this.mapToEntity(cartDoc);
    } catch (error) {
      throw new Error(`Error creating cart: ${error}`);
    }
  }

  async findById(id: string): Promise<Cart | null> {
    try {
      const cartDoc = await CartModel.findById(id)
        .populate("products.id_product")
        .exec();

      if (!cartDoc) {
        return null;
      }

      return this.mapToEntity(cartDoc);
    } catch (error) {
      throw new Error(`Error getting cart: ${error}`);
    }
  }

  async addProductToCart(
    cartId: string,
    productId: string,
    quantity: number
  ): Promise<Cart> {
    try {
      const cart = await CartModel.findById(cartId);
      if (!cart) {
        throw new Error("Cart not found");
      }

      const existingProductIndex = cart.products.findIndex(
        (item: any) => item.id_product.toString() === productId
      );

      if (existingProductIndex > -1) {
        cart.products[existingProductIndex].quantity += quantity;
      } else {
        cart.products.push({
          id_product: productId as any,
          quantity: quantity,
        });
      }

      await cart.save();

      const populatedCart = await CartModel.findById(cartId)
        .populate("products.id_product")
        .exec();

      return this.mapToEntity(populatedCart!);
    } catch (error) {
      throw new Error(`Error adding product to cart: ${error}`);
    }
  }

  async removeProductFromCart(
    cartId: string,
    productId: string
  ): Promise<Cart> {
    try {
      const cart = await CartModel.findById(cartId);
      if (!cart) {
        throw new Error("Cart not found");
      }

      cart.products = cart.products.filter(
        (item: any) => item.id_product.toString() !== productId
      );

      await cart.save();

      const populatedCart = await CartModel.findById(cartId)
        .populate("products.id_product")
        .exec();

      return this.mapToEntity(populatedCart!);
    } catch (error) {
      throw new Error(`Error removing product from cart: ${error}`);
    }
  }

  async updateCartProducts(
    cartId: string,
    products: CartProduct[]
  ): Promise<Cart> {
    try {
      const cart = await CartModel.findById(cartId);
      if (!cart) {
        throw new Error("Cart not found");
      }

      const mongoProducts = products.map((product) => ({
        id_product: product.id_product,
        quantity: product.quantity,
      }));

      cart.products = mongoProducts as any;
      await cart.save();

      const populatedCart = await CartModel.findById(cartId)
        .populate("products.id_product")
        .exec();

      return this.mapToEntity(populatedCart!);
    } catch (error) {
      throw new Error(`Error updating cart products: ${error}`);
    }
  }

  async updateProductQuantity(
    cartId: string,
    productId: string,
    quantity: number
  ): Promise<Cart> {
    try {
      const cart = await CartModel.findById(cartId);
      if (!cart) {
        throw new Error("Cart not found");
      }

      const productIndex = cart.products.findIndex(
        (item: any) => item.id_product.toString() === productId
      );

      if (productIndex === -1) {
        throw new Error("Product not found in cart");
      }

      cart.products[productIndex].quantity = quantity;
      await cart.save();

      const populatedCart = await CartModel.findById(cartId)
        .populate("products.id_product")
        .exec();

      return this.mapToEntity(populatedCart!);
    } catch (error) {
      throw new Error(`Error updating product quantity: ${error}`);
    }
  }

  async clearCart(id: string): Promise<Cart> {
    try {
      const cart = await CartModel.findById(id);
      if (!cart) {
        throw new Error("Cart not found");
      }

      cart.products = [];
      await cart.save();

      return this.mapToEntity(cart);
    } catch (error) {
      throw new Error(`Error clearing cart: ${error}`);
    }
  }

  async delete(id: string): Promise<boolean> {
    try {
      const result = await CartModel.findByIdAndDelete(id);
      return !!result;
    } catch (error) {
      throw new Error(`Error deleting cart: ${error}`);
    }
  }

  private mapToEntity(cartDoc: any): Cart {
    return new Cart(
      cartDoc._id.toString(),
      cartDoc.products.map(
        (product: any) =>
          new CartProduct(
            product.id_product._id
              ? product.id_product._id.toString()
              : product.id_product.toString(),
            product.quantity
          )
      ),
      cartDoc.createdAt,
      cartDoc.updatedAt
    );
  }
}
