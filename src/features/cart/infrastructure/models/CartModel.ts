import { model, Schema } from "mongoose";
import { Cart } from "../../domain/entities/Cart";

const CartProductSchema = new Schema(
  {
    id_product: {
      type: Schema.Types.ObjectId,
      ref: "Product",
      required: true,
    },
    quantity: {
      type: Number,
      required: true,
      min: 1,
      default: 1,
    },
  },
  {
    _id: false,
  }
);

type CartDocument = Cart & Document;

const CartSchema = new Schema<CartDocument>(
  {
    products: {
      type: [CartProductSchema],
      default: [],
    },
  },
  {
    timestamps: true,
  }
);

export const CartModel = model<CartDocument>("Cart", CartSchema);
