import { Router } from "express";
import { DependencyContainer } from "../../infrastructure/container/DependencyContainer";
import healthRoutes from "../health/healthRoutes";

const router = Router();
const container = DependencyContainer.getInstance();

// Configurar rutas
router.use("/health", healthRoutes);
router.use("/products", container.getProductRoutes().router);
router.use("/carts", container.getCartRoutes().router);

export default router;
