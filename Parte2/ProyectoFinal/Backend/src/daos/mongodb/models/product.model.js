import { Schema, model } from "mongoose";
import mongoosePaginate from "mongoose-paginate-v2";
export const productCollectionName = "products";
const ProductSchema = new Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  price: { type: Number, required: true },
  thumbnail: { type: String, required: true },
  code: { type: String, required: true, unique: true },
  stock: { type: Number, required: true },
  category: { type: String, required: true },
  status: { type: Boolean, required: true, default: true },
});

ProductSchema.plugin(mongoosePaginate);
const ProductModel = model(productCollectionName, ProductSchema);

export default ProductModel;
