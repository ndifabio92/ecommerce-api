import { Request, Response } from "express";
import { httpResponse } from "../../../../shared/infrastructure/utils/HttpResponse";
import { CreateProductUseCase } from "../../application/use-cases/CreateProductUseCase";
import { GetProductUseCase } from "../../application/use-cases/GetProductUseCase";
import { GetAllProductsUseCase } from "../../application/use-cases/GetAllProductsUseCase";
import { UpdateProductUseCase } from "../../application/use-cases/UpdateProductUseCase";
import { DeleteProductUseCase } from "../../application/use-cases/DeleteProductUseCase";

export class ProductController {
  constructor(
    private readonly createProductUseCase: CreateProductUseCase,
    private readonly getProductUseCase: GetProductUseCase,
    private readonly getAllProductsUseCase: GetAllProductsUseCase,
    private readonly updateProductUseCase: UpdateProductUseCase,
    private readonly deleteProductUseCase: DeleteProductUseCase
  ) {}

  async create(req: Request, res: Response) {
    try {
      const product = await this.createProductUseCase.execute(req.body);
      httpResponse.success(res, product);
    } catch (error) {
      httpResponse.internalServer(res);
    }
  }

  async getById(req: Request, res: Response) {
    try {
      const product = await this.getProductUseCase.execute(req.params.id);
      if (!product) {
        httpResponse.notFound(res, "Product not found");
        return;
      }
      httpResponse.success(res, product);
    } catch (error) {
      httpResponse.internalServer(res);
    }
  }

  async getAll(req: Request, res: Response) {
    try {
      const { limit, page, sort, query } = req.query;
      const baseUrl = `${req.protocol}://${req.get("host")}${req.baseUrl}`;

      const sortOrder =
        typeof sort === "string" && (sort === "asc" || sort === "desc")
          ? sort
          : undefined;

      const products = await this.getAllProductsUseCase.execute({
        limit: limit ? parseInt(limit as string) : 10,
        page: page ? parseInt(page as string) : 1,
        sort: sortOrder,
        query: typeof query === "string" ? query : undefined,
        baseUrl,
      });

      httpResponse.success(res, products);
    } catch (error) {
      httpResponse.internalServer(res);
    }
  }

  async update(req: Request, res: Response) {
    try {
      const product = await this.updateProductUseCase.execute(
        req.params.id,
        req.body
      );
      if (!product) {
        httpResponse.notFound(res, "Product not found");
      }
      httpResponse.success(res, product);
    } catch (error) {
      httpResponse.internalServer(res);
    }
  }

  async delete(req: Request, res: Response) {
    try {
      const deleted = await this.deleteProductUseCase.execute(req.params.id);
      if (!deleted) {
        httpResponse.notFound(res, "Product not found");
        return;
      }
      httpResponse.success(res, deleted);
    } catch (error) {
      httpResponse.internalServer(res);
    }
  }
}
