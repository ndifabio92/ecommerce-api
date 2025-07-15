import { Server, Socket } from "socket.io";
import { GetCartByIdUseCase } from "../../application/use-cases/GetCartByIdUseCase";
import { RemoveProductFromCartUseCase } from "../../application/use-cases/RemoveProductFromCartUseCase";
import { ClearCartUseCase } from "../../application/use-cases/ClearCartUseCase";
import { UpdateProductQuantityUseCase } from "../../application/use-cases/UpdateProductQuantityUseCase";
import { MongoCartRepository } from "../repositories/MongoCartRepository";

const cartRepository = new MongoCartRepository();
const getCartByIdUseCase = new GetCartByIdUseCase(cartRepository);
const removeProductFromCartUseCase = new RemoveProductFromCartUseCase(
  cartRepository
);
const clearCartUseCase = new ClearCartUseCase(cartRepository);
const updateProductQuantityUseCase = new UpdateProductQuantityUseCase(
  cartRepository
);

export const CartSocketController = (io: Server, socket: Socket) => {
  socket.on("joinCartRoom", (cartId: string) => {
    socket.join(cartId);
  });

  socket.on("removeFromCart", async ({ cartId, productId }) => {
    await removeProductFromCartUseCase.execute(cartId, productId);
    const updatedCart = await getCartByIdUseCase.execute(cartId);
    io.to(cartId).emit("cartUpdated", updatedCart);
  });

  socket.on("clearCart", async (cartId: string) => {
    await clearCartUseCase.execute(cartId);
    const updatedCart = await getCartByIdUseCase.execute(cartId);
    io.to(cartId).emit("cartUpdated", updatedCart);
  });

  socket.on("updateCartQuantity", async ({ cartId, productId, quantity }) => {
    await updateProductQuantityUseCase.execute(cartId, productId, quantity);
    const updatedCart = await getCartByIdUseCase.execute(cartId);
    io.to(cartId).emit("cartUpdated", updatedCart);
  });
};
