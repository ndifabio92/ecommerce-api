import { Router } from "express";
import { AuthController } from "../controllers/AuthController";
import { LoginUseCase } from "../../application/use-cases/LoginUseCase";
import { ValidateTokenUseCase } from "../../application/use-cases/ValidateTokenUseCase";
import { JwtAuthRepository } from "../repositories/JwtAuthRepository";
import { passportJwtMiddleware } from "../middleware/PassportMiddleware";
import { validateTokenMiddleware } from "../middleware/ValidateTokenMiddleware";
import "../strategies/PassportConfig";

const AuthRouter = Router();
const authRepository = new JwtAuthRepository();
const loginUseCase = new LoginUseCase(authRepository);
const validateTokenUseCase = new ValidateTokenUseCase(authRepository);
const authController = new AuthController(loginUseCase, validateTokenUseCase);

AuthRouter.post("/login", (req, res) => authController.login(req, res));

AuthRouter.get("/current", passportJwtMiddleware, (req, res) =>
  authController.current(req, res)
);

AuthRouter.get(
  "/current-direct",
  validateTokenMiddleware(validateTokenUseCase),
  (req, res) => authController.current(req, res)
);

export default AuthRouter;
