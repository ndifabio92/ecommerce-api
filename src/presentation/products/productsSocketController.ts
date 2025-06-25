import { Server, Socket } from 'socket.io';
import { readFile, insertFile, deleteById } from '../../application/useCases/products/productUseCase';

export const productsSocketController = (io: Server, socket: Socket) => {
  // Emitir productos actuales al conectar
  readFile().then(products => {
    socket.emit('products', products);
  });

  // Escuchar agregar producto
  socket.on('addProduct', async (productData) => {
    await insertFile(productData);
    const updatedProducts = await readFile();
    io.emit('products', updatedProducts);
  });

  // Escuchar eliminar producto
  socket.on('deleteProduct', async (id) => {
    await deleteById(id);
    const updatedProducts = await readFile();
    io.emit('products', updatedProducts);
  });
}; 