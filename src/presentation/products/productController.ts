import { Request, Response } from "express";
import {
  findById,
  insertFile,
  readFile,
  deleteById,
} from "../../application/useCases/products/productUseCase";
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
    const result = await insertFile(req.body);
    httpResponse.success(res, result);
  } catch (error) {
    console.error("Error details:", error);
  }
};

export const put = async (req: Request, res: Response) => {
  try {
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
