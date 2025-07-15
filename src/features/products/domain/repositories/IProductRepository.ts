import { PaginationResult } from "../../../../shared/application/dtos/PaginationDto";
import { PaginationParamsDto } from "../../../../shared/application/dtos/PaginationParamsDto";
import { CreateProductDto } from "../../application/dtos/CreateProductDto";
import { ProductDetailViewDto } from "../../application/dtos/ProductDetailViewDto";
import { UpdateProductDto } from "../../application/dtos/UpdateProductDto";
import { Product } from "../entities/Product";

export interface IProductRepository {
  create(product: Omit<CreateProductDto, "updatedAt">): Promise<Product>;
  findById(id: string): Promise<Product | null>;
  findAll(params: PaginationParamsDto): Promise<PaginationResult<Product>>;
  update(
    id: string,
    product: Partial<Omit<UpdateProductDto, "id" | "createdAt" | "updatedAt">>
  ): Promise<Product | null>;
  delete(id: string): Promise<boolean>;

  //VIEW
  findByIdForView(id: string): Promise<ProductDetailViewDto | null>;
}
