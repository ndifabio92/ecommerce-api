import { CreateProductDto } from "../../../products/application/dtos/CreateProductDto";

export interface CartDetailViewDto {
  id: string;
  products: Partial<CreateProductDto>[];
  totalPrice: number;
  createdAt: Date;
  updatedAt: Date;
}
