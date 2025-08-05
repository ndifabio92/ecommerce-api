import { Router } from "express";
import { UserController } from "../controllers/UserController";
import { CreateUserUseCase } from "../../application/use-cases/CreateUserUseCase";
import { GetUserUseCase } from "../../application/use-cases/GetUserUseCase";
import { GetAllUsersUseCase } from "../../application/use-cases/GetAllUsersUseCase";
import { UpdateUserUseCase } from "../../application/use-cases/UpdateUserUseCase";
import { DeleteUserUseCase } from "../../application/use-cases/DeleteUserUseCase";
import { MongoUserRepository } from "../repositories/MongoUserRepository";
import { JwtAuthRepository } from "../../../auth/infrastructure/repositories/JwtAuthRepository";

const UserRouter = Router();

// Dependency injection
const userRepository = new MongoUserRepository();
const authRepository = new JwtAuthRepository();

const createUserUseCase = new CreateUserUseCase(userRepository, authRepository);
const getUserUseCase = new GetUserUseCase(userRepository);
const getAllUsersUseCase = new GetAllUsersUseCase(userRepository);
const updateUserUseCase = new UpdateUserUseCase(userRepository);
const deleteUserUseCase = new DeleteUserUseCase(userRepository);

const userController = new UserController(
  createUserUseCase,
  getUserUseCase,
  getAllUsersUseCase,
  updateUserUseCase,
  deleteUserUseCase
);

// Routes
UserRouter.post("/", (req, res) => userController.create(req, res));
UserRouter.get("/", (req, res) => userController.getAll(req, res));
UserRouter.get("/:id", (req, res) => userController.getById(req, res));
UserRouter.put("/:id", (req, res) => userController.update(req, res));
UserRouter.delete("/:id", (req, res) => userController.delete(req, res));

export default UserRouter;
