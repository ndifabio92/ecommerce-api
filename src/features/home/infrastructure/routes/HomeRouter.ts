import { Router } from "express";
import { get, getRealTime } from "../controllers/HomeController";

const HomeRouter = Router();

HomeRouter.get("/", get);
HomeRouter.get("/realtimeproducts", getRealTime);

export default HomeRouter;
