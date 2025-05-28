import { Router } from "express";
import healthRoutes from "../health/healthRoutes";
import productsRoutes from "../products/productRoutes";

const router = Router();

router.use("/health", healthRoutes);
router.use("/product", productsRoutes);

export default router;
