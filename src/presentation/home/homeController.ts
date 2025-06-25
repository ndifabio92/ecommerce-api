import { Request, Response } from "express";
import {  
  readFile
} from "../../application/useCases/products/productUseCase";

export const get = async (req: Request, res: Response) => {
  try {
    const result = await readFile();
    console.log('result',result)
    res.render('home', { products: result})
  } catch (error) {
    console.error("Error details:", error);
  }
};

export const getRealTime = async (req: Request, res: Response) => {
  try {
    const result = await readFile();
    res.render('realTimeProducts', { products: result})
  } catch (error) {
    console.error("Error details:", error);
  }
};