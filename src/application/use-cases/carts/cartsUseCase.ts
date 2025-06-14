import * as path from "path";
import { v4 as uuidv4 } from "uuid";
import { Cart } from "../../../domain/Dtos/Cart.dto";
import * as fs from "fs";
import { LoadFromFile, SaveIntoFile } from "../../../infrastructure/utils/filesMethod";

const PATH = path.join(__dirname, "../../../data/carts.json");

export const readFile = async (): Promise<Cart[]> => {
  const data = await LoadFromFile<Cart>(PATH);
  return data;
};


export const createCart = async (): Promise<Cart> => {
  const carts = await readFile();
  const newCart: Cart = {
    id: uuidv4(),
    products: []
  };

  carts.push(newCart);
  await SaveIntoFile<Cart>(PATH, carts);
  return newCart;
};


export const findById = async (id: string): Promise<Cart | null> => {
  const carts = await readFile();
  return carts.find((cart) => cart.id === id) || null;
};


export const addProductToCart = async (cartId: string, productId: string): Promise<Cart | null> => {
  const carts = await readFile();
  const cartIndex = carts.findIndex(cart => cart.id === cartId);
  
  if (cartIndex === -1) {
    return null;
  }

  const cart = carts[cartIndex];
  const existingProductIndex = cart.products.findIndex(item => item.id_product === productId);

  if (existingProductIndex !== -1) {
    cart.products[existingProductIndex].quantity += 1;
  } else {
    cart.products.push({
      id_product: productId,
      quantity: 1
    });
  }

  carts[cartIndex] = cart;
  
  await SaveIntoFile<Cart>(PATH, carts);
  return cart;
};

export const deleteById = async (id: string): Promise<boolean> => {
  const carts = await readFile();
  const filteredCarts = carts.filter((cart) => cart.id !== id);
  
  if (filteredCarts.length === carts.length) {
    return false; 
  }
  
  await SaveIntoFile<Cart>(PATH, filteredCarts);
  return true;
};