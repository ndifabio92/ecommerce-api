import { Router } from "express";
import { MongoProductRepository } from "../repositories/MongoProductRepository";
import { CreateProductUseCase } from "../../application/use-cases/CreateProductUseCase";
import { ProductController } from "../controllers/ProductController";
import { GetProductUseCase } from "../../application/use-cases/GetProductUseCase";
import { GetAllProductsUseCase } from "../../application/use-cases/GetAllProductsUseCase";
import { UpdateProductUseCase } from "../../application/use-cases/UpdateProductUseCase";
import { DeleteProductUseCase } from "../../application/use-cases/DeleteProductUseCase";

const ProductRouter = Router();

// Dependency injection
const productRepository = new MongoProductRepository();
const createProductUseCase = new CreateProductUseCase(productRepository);
const getProductUseCase = new GetProductUseCase(productRepository);
const getAllProductsUseCase = new GetAllProductsUseCase(productRepository);
const updateProductUseCase = new UpdateProductUseCase(productRepository);
const deleteProductUseCase = new DeleteProductUseCase(productRepository);

const productController = new ProductController(
  createProductUseCase,
  getProductUseCase,
  getAllProductsUseCase,
  updateProductUseCase,
  deleteProductUseCase
);

ProductRouter.post("/", (req, res) => productController.create(req, res));
ProductRouter.get("/", (req, res) => productController.getAll(req, res));
ProductRouter.get("/:id", (req, res) => productController.getById(req, res));
ProductRouter.put("/:id", (req, res) => productController.update(req, res));
ProductRouter.delete("/:id", (req, res) => productController.delete(req, res));

export default ProductRouter;
