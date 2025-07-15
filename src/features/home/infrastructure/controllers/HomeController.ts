import { Request, Response } from "express";
import { GetHomeProductsUseCase } from "../../application/use-cases/GetHomeProductsUseCase";
import { GetProductDetailForViewUseCase } from "../../../products/application/use-cases/GetProductDetailForViewUseCase";
import { GetCartDetailForViewUseCase } from "../../../cart/application/use-cases/GetCartDetailForViewUseCase";
import { MongoProductRepository } from "../../../products/infrastructure/repositories/MongoProductRepository";
import { MongoCartRepository } from "../../../cart/infrastructure/repositories/MongoCartRepository";

const productRepository = new MongoProductRepository();
const cartRepository = new MongoCartRepository();

const getHomeProductsUseCase = new GetHomeProductsUseCase(productRepository);
const getProductDetailForViewUseCase = new GetProductDetailForViewUseCase(
  productRepository
);
const getCartDetailForViewUseCase = new GetCartDetailForViewUseCase(
  cartRepository
);

export const get = async (req: Request, res: Response) => {
  try {
    const { limit, page, sort, query } = req.query;
    const baseUrl = req.baseUrl || "";
    const params = {
      limit: limit ? parseInt(limit as string) : 10,
      page: page ? parseInt(page as string) : 1,
      sort:
        typeof sort === "string" && (sort === "asc" || sort === "desc")
          ? (sort as "asc" | "desc")
          : undefined,
      query: typeof query === "string" ? query : undefined,
      baseUrl,
    };
    const viewDto = await getHomeProductsUseCase.execute(params);
    res.render("home", viewDto);
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
    const result = await getHomeProductsUseCase.execute(params);
    res.render("realTimeProducts", { products: result.products });
  } catch (error) {
    console.error("Error details:", error);
    res.status(500).send("Internal Server Error");
  }
};

export const getProductDetail = async (req: Request, res: Response) => {
  try {
    const { pid } = req.params;
    const product = await getProductDetailForViewUseCase.execute(pid);
    if (!product) {
      return res.render("product-detail", { product: null });
    }
    res.render("product-detail", { product });
  } catch (error) {
    console.error("Error getting product detail:", error);
    res.status(500).send("Internal Server Error");
  }
};

export const getCartDetail = async (req: Request, res: Response) => {
  try {
    const { cid } = req.params;
    const cart = await getCartDetailForViewUseCase.execute(cid);
    if (!cart) {
      return res.render("cart-detail", { cart: null, totalPrice: 0 });
    }
    res.render("cart-detail", { cart, totalPrice: cart.totalPrice });
  } catch (error) {
    console.error("Error getting cart detail:", error);
    res.status(500).send("Internal Server Error");
  }
};
