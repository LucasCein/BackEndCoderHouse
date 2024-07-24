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
  async createCart() {
    try {
      const newCart = await CartModel.create({});
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
  async existProdInCart(cartId, prodId) {
    try {
      return await CartModel.findOne({
        _id: cartId,
        products: { $elemMatch: { product: prodId } },
      });
    } catch (error) {
      throw new Error(error);
    }
  }
  async addProductToCart(cartId, prodId) {
    try {
      const existProdInCart = await this.existProdInCart(cartId, prodId);
      if (existProdInCart) {
        return await CartModel.findOneAndUpdate(
          { _id: cartId, "products.product": prodId },
          {
            $set: {
              "products.$.quantity": existProdInCart.products[0].quantity + 1,
            },
          },
          { new: true }
        );
      } else {
        return await CartModel.findByIdAndUpdate(
          cartId,
          { $push: { products: { product: prodId } } },
          { new: true }
        );
      }
    } catch (error) {
      console.log(error);
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
    try {
      const validProducts = [];

      for (let i = 0; i < products.length; i++) {
        const { _id, quantity } = products[i];
        const product = await ProductModel.findById(_id);
        if (!product) {
          throw new Error(`Product with ID ${_id} not found`);
        }
        validProducts.push({
          product: _id,
          quantity: quantity || 1,
        });
      }

      const cart = await CartModel.findById(cartId);
      if (!cart) {
        throw new Error(`Cart with ID ${cartId} not found`);
      }

      cart.products = validProducts;
      await cart.save();
      return cart;
    } catch (error) {
      console.error(error);
      throw error;
    }
  }
  async quantityCartProduct(cartId, productId, quantity) {
    try {
      const cart = await CartModel.findById(cartId);
      if (!cart) {
        throw new Error('Cart not found');
      }
      
      const productIndex = cart.products.findIndex(p => p.product.toString() === productId);
      
      if (productIndex !== -1) {
        cart.products[productIndex].quantity = quantity;
        await cart.save();
        return cart;
      } else {
        throw new Error('Product not found in cart');
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
