import { Router } from "express";
import ProductRouter from "../../../features/products/infrastructure/routes/ProductRouter";
import CartRouter from "../../../features/cart/infrastructure/routes/CartRouter";
import AuthRouter from "../../../features/auth/infrastructure/routes/AuthRouter";
import UserRouter from "../../../features/users/infrastructure/routes/UserRouter";

const ApiRouter = Router();

ApiRouter.use("/products", ProductRouter);
ApiRouter.use("/cart", CartRouter);
ApiRouter.use("/sessions", AuthRouter);
ApiRouter.use("/users", UserRouter);

export default ApiRouter;
