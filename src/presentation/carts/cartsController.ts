import { Request, Response } from "express";
import { httpResponse } from "../../infrastructure/utils/httpResponse";
import { CartUseCase } from "../../application/use-cases/carts/cartUseCase";

export class CartController {
  constructor(private readonly cartUseCase: CartUseCase) {}

  async getAllCarts(_req: Request, res: Response) {
    try {
      const carts = await this.cartUseCase.getAllCarts();
      httpResponse.success(res, carts);
    } catch (error) {
      console.error("Error in getAllCarts:", error);
      httpResponse.internalServer(res);
    }
  }

  async getCartById(req: Request, res: Response) {
    try {
      const { id } = req.params;
      if (!id) {
        return httpResponse.badRequest(res, "Cart ID is required");
      }

      const cart = await this.cartUseCase.getCartById(id);
      if (!cart) {
        return httpResponse.notFound(res, "Cart not found");
      }
      httpResponse.success(res, cart);
    } catch (error) {
      console.error("Error in getCartById:", error);
      httpResponse.internalServer(res);
    }
  }

  async createCart(_req: Request, res: Response) {
    try {
      const newCart = await this.cartUseCase.createCart();
      httpResponse.created(res, newCart);
    } catch (error) {
      console.error("Error in createCart:", error);
      httpResponse.internalServer(res);
    }
  }

  async addProductToCart(req: Request, res: Response) {
    try {
      const { cid, pid } = req.params;
      if (!cid || !pid) {
        return httpResponse.badRequest(
          res,
          "Cart ID and Product ID are required"
        );
      }

      const updatedCart = await this.cartUseCase.addProductToCart(cid, pid);
      if (!updatedCart) {
        return httpResponse.notFound(res, "Cart not found");
      }
      httpResponse.success(res, updatedCart);
    } catch (error) {
      console.error("Error in addProductToCart:", error);
      if (error instanceof Error && error.message === "Cart not found") {
        return httpResponse.notFound(res, error.message);
      }
      httpResponse.internalServer(res);
    }
  }

  async deleteCart(req: Request, res: Response) {
    try {
      const { id } = req.params;
      if (!id) {
        return httpResponse.badRequest(res, "Cart ID is required");
      }

      const deleted = await this.cartUseCase.deleteCart(id);
      if (!deleted) {
        return httpResponse.notFound(res, "Cart not found");
      }
      httpResponse.success(res, { message: "Cart deleted successfully" });
    } catch (error) {
      console.error("Error in deleteCart:", error);
      if (error instanceof Error && error.message === "Cart not found") {
        return httpResponse.notFound(res, error.message);
      }
      httpResponse.internalServer(res);
    }
  }
}
