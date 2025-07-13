import { Server, Socket } from "socket.io";
import { GetAllProductsUseCase } from "../../application/use-cases/GetAllProductsUseCase";
import { CreateProductUseCase } from "../../application/use-cases/CreateProductUseCase";
import { DeleteProductUseCase } from "../../application/use-cases/DeleteProductUseCase";
import { MongoProductRepository } from "../repositories/MongoProductRepository";

const productRepository = new MongoProductRepository();
const getAllProductsUseCase = new GetAllProductsUseCase(productRepository);
const createProductUseCase = new CreateProductUseCase(productRepository);
const deleteProductUseCase = new DeleteProductUseCase(productRepository);

export const ProductSocketController = (io: Server, socket: Socket) => {
  getAllProductsUseCase
    .execute({
      limit: 100,
      page: 1,
      sort: undefined,
      query: undefined,
      baseUrl: "",
    })
    .then((result) => {
      socket.emit("products", result.payload);
    });

  socket.on("addProduct", async (productData) => {
    await createProductUseCase.execute(productData);
    const updatedProducts = await getAllProductsUseCase.execute({
      limit: 100,
      page: 1,
      sort: undefined,
      query: undefined,
      baseUrl: "",
    });
    io.emit("products", updatedProducts.payload);
  });

  socket.on("deleteProduct", async (id) => {
    await deleteProductUseCase.execute(id);
    const updatedProducts = await getAllProductsUseCase.execute({
      limit: 100,
      page: 1,
      sort: undefined,
      query: undefined,
      baseUrl: "",
    });
    io.emit("products", updatedProducts.payload);
  });
};
