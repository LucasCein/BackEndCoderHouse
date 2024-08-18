import { CartModel } from "./models/cart.model.js";
import ProductModel from "./models/product.model.js";
export default class CartDaoMongoDb {
  constructor(db) {
    this.db = db;
  }

  async getAll() {
    try {
      const carts = await CartModel.find();
      return carts;
    } catch (error) {
      console.error(error);
    }
  }
  async createCart({ products }) {
    try {
      const newCart = await CartModel.create({ products: products });
      return newCart;
    } catch (error) {
      console.error(error);
    }
  }

  async getCartById(id) {
    try {
      const cart = await CartModel.findById(id).populate("products.product");
      return cart;
    } catch (error) {
      console.error(error);
    }
  }
  async addProductToCart(cartId, prodId) {
    try {
      // Verifica si el producto ya existe en el carrito
      let updatedCart;
      const cart = await CartModel.findOne({
        _id: cartId,
        "products.product": prodId,
      });

      if (cart) {
        // Si el producto ya existe, incrementa la cantidad
        await CartModel.findOneAndUpdate(
          { _id: cartId, "products.product": prodId },
          {
            $inc: { "products.$.quantity": 1 }, // Incrementa la cantidad en 1
          }
        );
      } else {
        // Si el producto no existe en el carrito, agrégalo
        await CartModel.findByIdAndUpdate(
          cartId,
          { $push: { products: { product: prodId, quantity: 1 } } } // Añade el producto con cantidad 1
        );
      }

      // Re-fetch del carrito para incluir los productos populados
      updatedCart = await CartModel.findById(cartId).populate(
        "products.product"
      );

      return updatedCart;
    } catch (error) {
      console.error("Error al agregar el producto al carrito:", error);
      throw new Error("No se pudo agregar el producto al carrito");
    }
  }

  async deleteProductFromCart(cartId, productId) {
    try {
      const cart = await CartModel.findById(cartId);
      const productIndex = cart.products.findIndex((p) =>
        p.product.equals(productId)
      );
      if (productIndex !== -1) {
        cart.products.splice(productIndex, 1);
        await cart.save();
        return cart;
      } else {
        throw new Error("Product not found in cart");
      }
    } catch (error) {
      console.error(error);
      throw error;
    }
  }
  async updateCart(cartId, products) {
    return await CartModel.findByIdAndUpdate(cartId, products, { new: true });
  }
  async quantityCartProduct(cartId, productId, quantity) {
    try {
      const cart = await CartModel.findById(cartId);
      if (!cart) {
        throw new Error("Cart not found");
      }

      const productIndex = cart.products.findIndex(
        (p) => p.product.toString() === productId
      );

      if (productIndex !== -1) {
        cart.products[productIndex].quantity = quantity;
        await cart.save();
        return cart;
      } else {
        throw new Error("Product not found in cart");
      }
    } catch (error) {
      console.error(error);
      throw error; // Optional: re-throw the error if you want to handle it outside
    }
  }

  async deleteProdsFromCart(cartId) {
    try {
      const cart = await CartModel.findById(cartId);
      cart.products = [];
      await cart.save();
      return cart;
    } catch (error) {
      console.error(error);
    }
  }
}


