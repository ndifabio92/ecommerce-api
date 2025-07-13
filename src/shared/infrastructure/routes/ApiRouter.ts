import { Router } from "express";
import ProductRouter from "../../../features/products/infrastructure/routes/ProductRouter";
import CartRouter from "../../../features/cart/infrastructure/routes/CartRouter";

const ApiRouter = Router();

ApiRouter.use("/products", ProductRouter);
ApiRouter.use("/cart", CartRouter);

export default ApiRouter;
