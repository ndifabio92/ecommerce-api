import { Schema, Document, model } from "mongoose";
import { Product } from "../../domain/entities/Product";

type ProductDocument = Product & Document;

const ProductSchema = new Schema<ProductDocument>(
  {
    title: {
      type: String,
      required: true,
      unique: true,
    },
    description: {
      type: String,
      required: true,
    },
    price: {
      type: Number,
      required: true,
      min: 0,
    },
    stock: {
      type: Number,
      required: true,
      min: 1,
      default: 1,
    },
    category: {
      type: String,
      required: true,
    },
    thumbnails: {
      type: [String],
      default: [],
    },
    code: {
      type: String,
      required: true,
    },
    status: {
      type: Boolean,
      default: true,
    },
  },
  {
    timestamps: true,
  }
);

export const ProductModel = model<ProductDocument>("Product", ProductSchema);
