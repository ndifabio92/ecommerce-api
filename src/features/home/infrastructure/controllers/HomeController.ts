import { Request, Response } from "express";
import { GetAllProductsUseCase } from "../../../products/application/use-cases/GetAllProductsUseCase";
import { MongoProductRepository } from "../../../products/infrastructure/repositories/MongoProductRepository";

const productRepository = new MongoProductRepository();
const getAllProductsUseCase = new GetAllProductsUseCase(productRepository);

export const get = async (req: Request, res: Response) => {
  try {
    // Adaptar los parámetros de paginación si es necesario
    const params = {
      limit: 10,
      page: 1,
      sort: undefined,
      query: undefined,
      baseUrl: req.baseUrl || "",
    };
    const result = await getAllProductsUseCase.execute(params);
    res.render("home", { products: result.payload });
  } catch (error) {
    console.error("Error details:", error);
    res.status(500).send("Internal Server Error");
  }
};

export const getRealTime = async (req: Request, res: Response) => {
  try {
    const params = {
      limit: 10,
      page: 1,
      sort: undefined,
      query: undefined,
      baseUrl: req.baseUrl || "",
    };
    const result = await getAllProductsUseCase.execute(params);
    res.render("realTimeProducts", { products: result.payload });
  } catch (error) {
    console.error("Error details:", error);
    res.status(500).send("Internal Server Error");
  }
};
