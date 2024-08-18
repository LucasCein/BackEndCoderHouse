import mongoose from "mongoose";
import * as service from "../services/cart.services.js";
import UserModel from "../daos/mongodb/models/user.model.js";

export const getCarts = async (req, res) => {
  try {
    const carts = await service.getCarts();
    res.send(carts);
  } catch (error) {
    console.log(error);
  }
};

export const getCartById = async (req, res) => {
  try {
    const { cid } = req.params;
    const cart = await service.getCartById(cid);
    res.json(cart);
  } catch (error) {
    console.log(error);
  }
};

export const createCart = async (req, res) => {
  try {
   
    const { products } = req.body;
    const userId = req.user; 
    // Crear el carrito
    const newCart = await service.createCart({products });

    // Vincular el carrito al usuario actual
    const updatedUser = await UserModel.findByIdAndUpdate(
      userId,
      { cart: newCart._id },
      { new: true }
    );

    res.status(201).send({
      message: "Carrito creado y vinculado al usuario",
      cart: newCart,
      user: updatedUser,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({ error: "Error al crear el carrito" });
  }
};

export const addProductToCart = async (req, res) => {
  try {
    const { cid } = req.params;
    const { pid } = req.params;
    const cart = await service.addProductToCart(cid, pid);
    res.send(cart);
  } catch (error) {
    console.log(error);
  }
};

export const deleteProductFromCart = async (req, res) => {
  try {
    const { cid } = req.params;
    const { pid } = req.params;
    const cart = await service.deleteProductFromCart(cid, pid);
    res.send(cart);
  } catch (error) {
    console.log(error);
  }
};

export const updateCart = async (req, res) => {
  try {
    const { cid } = req.params;
    const products = req.body; // Asume que req.body es un array de productos
    const cart = await service.updateCart(cid, products);
    res.status(200).json(cart);
  } catch (error) {
    console.log(error);
    res.status(500).send({ error: "Internal Server Error" });
  }
};

export const quantityCartProduct = async (req, res) => {
  try {
    const { cid, pid } = req.params;
    const { quantity } = req.body;
    const cart = await service.quantityCartProduct(cid, pid, quantity);
    res.send(cart);
  } catch (error) {
    console.log(error);
  }
};

export const deleteProdsFromCart = async (req, res) => {
  try {
    const { cid } = req.params;
    const cart = await service.deleteProdsFromCart(cid);
    res.send(cart);
  } catch (error) {
    console.log(error);
  }
};



export const purchaseCart = async (req, res) => {
    try {
        const { cid } = req.params;
        const result = await service.purchaseCartService(cid, req.user);
        res.json(result);
    } catch (error) {
        console.error('Error al finalizar la compra:', error);
        res.status(500).json({ error: 'Error al finalizar la compra' });
    }
};