import { Router, RequestHandler } from "express";
import { CartController } from "./cartsController";

export class CartRoutes {
  public router: Router;

  constructor(private readonly cartController: CartController) {
    this.router = Router();
    this.setupRoutes();
  }

  private setupRoutes(): void {
    this.router.get(
      "/",
      this.cartController.getAllCarts.bind(
        this.cartController
      ) as RequestHandler
    );
    this.router.get(
      "/:id",
      this.cartController.getCartById.bind(
        this.cartController
      ) as RequestHandler
    );
    this.router.post(
      "/",
      this.cartController.createCart.bind(this.cartController) as RequestHandler
    );
    this.router.post(
      "/:cid/product/:pid",
      this.cartController.addProductToCart.bind(
        this.cartController
      ) as RequestHandler
    );
    this.router.delete(
      "/:id",
      this.cartController.deleteCart.bind(this.cartController) as RequestHandler
    );
  }
}
