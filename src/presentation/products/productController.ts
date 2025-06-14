import { Request, Response } from "express";
import { httpResponse } from "../../infrastructure/utils/httpResponse";
import { ProductUseCase } from "../../application/use-cases/products/productUseCase";

export class ProductController {
  constructor(private readonly productUseCase: ProductUseCase) {}

  async get(_req: Request, res: Response) {
    try {
      const products = await this.productUseCase.getAllProducts();
      httpResponse.success(res, products);
    } catch (error) {
      console.error("Error in get:", error);
      httpResponse.internalServer(res);
    }
  }

  async getById(req: Request, res: Response) {
    try {
      const { id } = req.params;
      if (!id) {
        return httpResponse.badRequest(res, "Product ID is required");
      }

      const product = await this.productUseCase.getProductById(id);
      if (!product) {
        return httpResponse.notFound(res, "Product not found");
      }
      httpResponse.success(res, product);
    } catch (error) {
      console.error("Error in getById:", error);
      httpResponse.internalServer(res);
    }
  }

  async post(req: Request, res: Response) {
    try {
      const productData = req.body;
      const newProduct = await this.productUseCase.createProduct(productData);
      httpResponse.created(res, newProduct);
    } catch (error) {
      console.error("Error in post:", error);
      httpResponse.internalServer(res);
    }
  }

  async put(req: Request, res: Response) {
    try {
      const { id } = req.params;
      if (!id) {
        return httpResponse.badRequest(res, "Product ID is required");
      }

      const productData = req.body;
      const updatedProduct = await this.productUseCase.updateProduct(
        id,
        productData
      );
      if (!updatedProduct) {
        return httpResponse.notFound(res, "Product not found");
      }
      httpResponse.success(res, updatedProduct);
    } catch (error) {
      console.error("Error in put:", error);
      httpResponse.internalServer(res);
    }
  }

  async remove(req: Request, res: Response) {
    try {
      const { id } = req.params;
      if (!id) {
        return httpResponse.badRequest(res, "Product ID is required");
      }

      const deleted = await this.productUseCase.deleteProduct(id);
      if (!deleted) {
        return httpResponse.notFound(res, "Product not found");
      }
      httpResponse.success(res, { message: "Product deleted successfully" });
    } catch (error) {
      console.error("Error in remove:", error);
      httpResponse.internalServer(res);
    }
  }
}
