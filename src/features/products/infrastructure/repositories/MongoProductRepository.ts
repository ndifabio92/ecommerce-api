import { PaginationResult } from "../../../../shared/application/dtos/PaginationDto";
import { PaginationParamsDto } from "../../../../shared/application/dtos/PaginationParamsDto";
import { BuildUrl } from "../../../../shared/infrastructure/utils/BuildUrl";
import { Pagination } from "../../../../shared/infrastructure/utils/Pagination";
import { CreateProductDto } from "../../application/dtos/CreateProductDto";
import { ProductDetailViewDto } from "../../application/dtos/ProductDetailViewDto";
import { Product } from "../../domain/entities/Product";
import { IProductRepository } from "../../domain/repositories/IProductRepository";
import { ProductModel } from "../models/ProductModel";

export class MongoProductRepository implements IProductRepository {
  async create(
    product: Omit<CreateProductDto, "id" | "createdAt" | "updatedAt">
  ): Promise<Product> {
    const productDoc = new ProductModel(product);
    const savedProduct = await productDoc.save();
    return savedProduct;
  }

  async findById(id: string): Promise<Product | null> {
    try {
      const productDoc = await ProductModel.findById(id);
      if (!productDoc) return null;

      return productDoc;
    } catch (error) {
      return null;
    }
  }

  async findAll(
    params: PaginationParamsDto
  ): Promise<PaginationResult<Product>> {
    try {
      const { limit, page, sort, query: searchQuery, baseUrl } = params;
      let filter = {};
      if (searchQuery) {
        filter = {
          $or: [
            { title: { $regex: searchQuery, $options: "i" } },
            { description: { $regex: searchQuery, $options: "i" } },
            { category: { $regex: searchQuery, $options: "i" } },
          ],
        };
      }

      let sortOption = {};
      if (sort) {
        sortOption = { price: sort === "asc" ? 1 : -1 };
      }

      const offset = (page - 1) * limit;

      const [products, totalCount] = await Promise.all([
        ProductModel.find(filter)
          .sort(sortOption)
          .skip(offset)
          .limit(limit)
          .exec(),
        ProductModel.countDocuments(filter),
      ]);

      const { prevPage, nextPage, totalPages, hasNextPage, hasPrevPage } =
        Pagination(totalCount, limit, page);

      const prevLink = BuildUrl(prevPage!, limit, sort, searchQuery, baseUrl);
      const nextLink = BuildUrl(nextPage!, limit, sort, searchQuery, baseUrl);

      return {
        payload: products,
        totalPages,
        prevPage,
        nextPage,
        page,
        hasPrevPage,
        hasNextPage,
        prevLink,
        nextLink,
        status: "success",
      };
    } catch (error) {
      console.log(error);
      throw error;
    }
  }

  async update(
    id: string,
    product: Partial<Omit<Product, "id" | "createdAt" | "updatedAt">>
  ): Promise<Product | null> {
    try {
      const updatedProduct = await ProductModel.findByIdAndUpdate(id, product, {
        new: true,
      });

      if (!updatedProduct) return null;
      return updatedProduct;
    } catch (error) {
      return null;
    }
  }

  async delete(id: string): Promise<boolean> {
    try {
      const result = await ProductModel.findByIdAndDelete(id);
      return result !== null;
    } catch (error) {
      return false;
    }
  }

  //VIEW
  async findByIdForView(id: string): Promise<ProductDetailViewDto | null> {
    const product = await ProductModel.findById(id).lean();
    if (!product) return null;
    return {
      id: product._id.toString(),
      title: product.title,
      description: product.description,
      code: product.code,
      price: product.price,
      stock: product.stock,
      category: product.category,
      thumbnails: product.thumbnails,
      status: product.status,
      createdAt: product.createdAt,
      updatedAt: product.updatedAt,
    };
  }
}
