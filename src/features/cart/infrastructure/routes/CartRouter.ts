import { Router } from "express";
import { CartController } from "../controllers/CartController";
import { MongoCartRepository } from "../repositories/MongoCartRepository";
import { CreateCartUseCase } from "../../application/use-cases/CreateCartUseCase";
import { GetCartByIdUseCase } from "../../application/use-cases/GetCartByIdUseCase";
import { AddProductToCartUseCase } from "../../application/use-cases/AddProductToCartUseCase";
import { RemoveProductFromCartUseCase } from "../../application/use-cases/RemoveProductFromCartUseCase";
import { UpdateCartProductsUseCase } from "../../application/use-cases/UpdateCartProductsUseCase";
import { ClearCartUseCase } from "../../application/use-cases/ClearCartUseCase";
import { DeleteCartUseCase } from "../../application/use-cases/DeleteCartUseCase";
import { UpdateProductQuantityUseCase } from "../../application/use-cases/UpdateProductQuantityUseCase";

// Dependency injection
const CartRouter = Router();

const cartRepository = new MongoCartRepository();
const createCartUseCase = new CreateCartUseCase(cartRepository);
const getCartByIdUseCase = new GetCartByIdUseCase(cartRepository);
const addProductToCartUseCase = new AddProductToCartUseCase(cartRepository);
const removeProductFromCartUseCase = new RemoveProductFromCartUseCase(
  cartRepository
);
const updateCartProductsUseCase = new UpdateCartProductsUseCase(cartRepository);
const updateProductQuantityUseCase = new UpdateProductQuantityUseCase(
  cartRepository
);
const clearCartUseCase = new ClearCartUseCase(cartRepository);
const deleteCartUseCase = new DeleteCartUseCase(cartRepository);

const cartController = new CartController(
  createCartUseCase,
  getCartByIdUseCase,
  addProductToCartUseCase,
  removeProductFromCartUseCase,
  updateCartProductsUseCase,
  updateProductQuantityUseCase,
  clearCartUseCase,
  deleteCartUseCase
);

CartRouter.get("/:id", (req, res) => {
  cartController.getById(req, res);
});

CartRouter.post("/", (req, res) => {
  cartController.create(req, res);
});

CartRouter.post("/:id/products/:productId/:quantity", (req, res) => {
  cartController.addProductToCart(req, res);
});

CartRouter.delete("/:id/products/:productId", (req, res) => {
  cartController.removeProductFromCart(req, res);
});

CartRouter.put("/:id", (req, res) => {
  cartController.updateCartProducts(req, res);
});

CartRouter.put("/:id/products/:productId", (req, res) => {
  cartController.updateProductQuantity(req, res);
});

CartRouter.delete("/:id/clear", (req, res) => {
  cartController.clearCart(req, res);
});

CartRouter.delete("/:id", (req, res) => {
  cartController.deleteCart(req, res);
});

export default CartRouter;
