import { Product } from "../../../products/domain/entities/Product";

export class CartProduct {
  constructor(
    public id_product: string | Product, 
    public quantity: number
  ) {}
}
