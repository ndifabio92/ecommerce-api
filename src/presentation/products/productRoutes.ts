import { Router, RequestHandler } from "express";
import { ProductController } from "./productController";

export class ProductRoutes {
  public router: Router;

  constructor(private readonly productController: ProductController) {
    this.router = Router();
    this.setupRoutes();
  }

  private setupRoutes(): void {
    this.router.get(
      "/",
      this.productController.get.bind(this.productController) as RequestHandler
    );
    this.router.get(
      "/:id",
      this.productController.getById.bind(
        this.productController
      ) as RequestHandler
    );
    this.router.post(
      "/",
      this.productController.post.bind(this.productController) as RequestHandler
    );
    this.router.put(
      "/:id",
      this.productController.put.bind(this.productController) as RequestHandler
    );
    this.router.delete(
      "/:id",
      this.productController.remove.bind(
        this.productController
      ) as RequestHandler
    );
  }
}
