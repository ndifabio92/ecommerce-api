import { Router } from "express";
import healthRoutes from "../health/healthRoutes";
import productsRoutes from "../products/productRoutes";
import cartsRoutes from "../carts/cartsRoutes";

const router = Router();

router.use("/health", healthRoutes);
router.use("/products", productsRoutes);
router.use("/carts", cartsRoutes);

export default router;
