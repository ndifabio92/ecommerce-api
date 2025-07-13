import { Request, Response } from "express";
import { httpResponse } from "../../../../shared/infrastructure/utils/HttpResponse";
import { AddProductToCartUseCase } from "../../application/use-cases/AddProductToCartUseCase";
import { ClearCartUseCase } from "../../application/use-cases/ClearCartUseCase";
import { CreateCartUseCase } from "../../application/use-cases/CreateCartUseCase";
import { DeleteCartUseCase } from "../../application/use-cases/DeleteCartUseCase";
import { GetCartByIdUseCase } from "../../application/use-cases/GetCartByIdUseCase";
import { RemoveProductFromCartUseCase } from "../../application/use-cases/RemoveProductFromCartUseCase";
import { UpdateCartProductsUseCase } from "../../application/use-cases/UpdateCartProductsUseCase";
import { UpdateProductQuantityUseCase } from "../../application/use-cases/UpdateProductQuantityUseCase";

export class CartController {
  constructor(
    private readonly createCartUseCase: CreateCartUseCase,
    private readonly getCartByIdUseCase: GetCartByIdUseCase,
    private readonly addProductToCartUseCase: AddProductToCartUseCase,
    private readonly removeProductFromCartUseCase: RemoveProductFromCartUseCase,
    private readonly updateCartProductsUseCase: UpdateCartProductsUseCase,
    private readonly updateProductQuantityUseCase: UpdateProductQuantityUseCase,
    private readonly clearCartUseCase: ClearCartUseCase,
    private readonly deleteCartUseCase: DeleteCartUseCase
  ) {}

  async create(req: Request, res: Response) {
    try {
      const cart = await this.createCartUseCase.execute();
      httpResponse.success(res, cart);
    } catch (error) {
      httpResponse.internalServer(res);
    }
  }

  async getById(req: Request, res: Response) {
    try {
      const cart = await this.getCartByIdUseCase.execute(req.params.id);
      if (!cart) {
        httpResponse.notFound(res, "Cart not found");
        return;
      }
      httpResponse.success(res, cart);
    } catch (error) {
      httpResponse.internalServer(res);
    }
  }

  async addProductToCart(req: Request, res: Response) {
    try {
      const { id, productId, quantity } = req.params;
      const cart = await this.addProductToCartUseCase.execute(
        id,
        productId,
        parseInt(quantity)
      );
      httpResponse.success(res, cart);
    } catch (error) {
      httpResponse.internalServer(res);
    }
  }

  async removeProductFromCart(req: Request, res: Response) {
    try {
      const { id, productId } = req.params;
      const cart = await this.removeProductFromCartUseCase.execute(
        id,
        productId
      );
      if (!cart) {
        httpResponse.notFound(res, "Cart or product not found");
        return;
      }
      httpResponse.success(res, cart);
    } catch (error) {
      httpResponse.internalServer(res);
    }
  }

  async updateCartProducts(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const cart = await this.updateCartProductsUseCase.execute(id, req.body);
      if (!cart) {
        httpResponse.notFound(res, "Cart not found");
        return;
      }
      httpResponse.success(res, cart);
    } catch (error) {
      httpResponse.internalServer(res);
    }
  }

  async updateProductQuantity(req: Request, res: Response) {
    try {
      const { id, productId } = req.params;
      const { quantity } = req.body;
      const cart = await this.updateProductQuantityUseCase.execute(
        id,
        productId,
        quantity
      );
      if (!cart) {
        httpResponse.notFound(res, "Cart or product not found");
        return;
      }
      httpResponse.success(res, cart);
    } catch (error) {
      httpResponse.internalServer(res);
    }
  }

  async clearCart(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const cart = await this.clearCartUseCase.execute(id);
      if (!cart) {
        httpResponse.notFound(res, "Cart not found");
        return;
      }
      httpResponse.success(res, cart);
    } catch (error) {
      httpResponse.internalServer(res);
    }
  }

  async deleteCart(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const deleted = await this.deleteCartUseCase.execute(id);
      if (!deleted) {
        httpResponse.notFound(res, "Cart not found");
        return;
      }
      httpResponse.success(res, deleted);
    } catch (error) {
      httpResponse.internalServer(res);
    }
  }
}
