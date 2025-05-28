import { Request, Response } from "express";
import {
  findById,
  createCart,
  readFile,
  deleteById,
  addProductToCart
} from "../../application/useCases/carts/cartsUseCase";
import { httpResponse } from "../../infrastructure/utils/httpResponse";

export const get = async (req: Request, res: Response) => {
  try {
    const result = await readFile();
    httpResponse.success(res, result);
  } catch (error) {
    console.error("Error details:", error);
  }
};

export const getById = async (req: Request, res: Response) => {
  try {
    const result = await findById(req.params.id);
    httpResponse.success(res, result);
  } catch (error) {
    console.error("Error details:", error);
  }
};

export const post = async (req: Request, res: Response) => {
  try {
    const result = await createCart();
    httpResponse.success(res, result);
  } catch (error) {
    console.error("Error details:", error);
  }
};

export const addProduct = async (req: Request, res: Response) => {
  try {
    const { cid, pid } = req.params;
    const result = await addProductToCart(cid,pid);
    httpResponse.success(res, result);
  } catch (error) {
    console.error("Error details:", error);
  }
};

export const remove = async (req: Request, res: Response) => {
  try {
    const result = await deleteById(req.params.id);
    httpResponse.success(res, result);
  } catch (error) {
    console.error("Error details:", error);
  }
};
