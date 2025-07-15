import { Router } from "express";
import { get, getRealTime, getProductDetail, getCartDetail } from "../controllers/HomeController";

const HomeRouter = Router();

HomeRouter.get("/", get);
HomeRouter.get("/realtimeproducts", getRealTime);
HomeRouter.get("/products/:pid", getProductDetail);
HomeRouter.get("/carts/:cid", getCartDetail);

export default HomeRouter;
