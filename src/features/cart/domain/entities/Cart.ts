import { CartProduct } from "./CartProduct";

export class Cart {
  constructor(
    public id: string,
    public products: CartProduct[],
    public createdAt: Date,
    public updatedAt: Date
  ) {}
}
