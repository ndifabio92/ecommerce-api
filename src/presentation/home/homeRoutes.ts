import express from "express";
import { get, getRealTime } from "./homeController";

const router = express.Router();

router.get("/", get);
router.get("/realtimeproducts", getRealTime);

export default router;
