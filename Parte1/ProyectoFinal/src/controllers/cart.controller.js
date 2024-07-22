import mongoose from "mongoose";
import * as service from "../services/cart.services.js";

export const getCarts = async (req, res) => {
    try {
        const carts = await service.getCarts();
        res.send(carts);
    } catch (error) {
        console.log(error);
    }
}

export const getCartById = async (req, res) => {
    try {   
        const { cid } = req.params;
        const cart = await service.getCartById(cid);
        res.json(cart);
    } catch (error) {
        console.log(error);
    }
}

export const getCartByIdView = async (req, res) => {
    try {
      const { cid } = req.params;
      // Validación de ObjectId
      if (!mongoose.Types.ObjectId.isValid(cid)) {
        return res.status(400).send({ error: 'Invalid cart ID' });
      }
      const cart = await service.getCartById(cid);
      res.render('cart', { cart });
    } catch (error) {
      console.log(error);
      res.status(500).send({ error: 'Internal Server Error' });
    }
  };


export const createCart = async (req, res) => {
    try {
        const cart = await service.createCart();
        res.send(cart);
    } catch (error) {
        console.log(error);
    }
}

export const addProductToCart = async (req, res) => {
    try {
        const { cid } = req.params;
        const { pid } = req.params;
        console.log(cid,pid)
        const cart = await service.addProductToCart(cid, pid);
        res.send(cart);
    } catch (error) {
        console.log(error);
    }
}

export const deleteProductFromCart = async (req, res) => {
    try {
        const { cid } = req.params;
        const { pid } = req.params;
        const cart = await service.deleteProductFromCart(cid, pid);
        res.send(cart);
    } catch (error) {
        console.log(error);
    }
}


export const updateCart = async (req, res) => { 
    try {
      const {cid} = req.params;
      console.log(cid)
      const products = req.body; // Asume que req.body es un array de productos
      const cart = await service.updateCart(cid, products);
      res.status(200).json(cart);
    } catch (error) {
      console.log(error);
      res.status(500).send({ error: 'Internal Server Error' });
    }
  };


export const quantityCartProduct = async (req, res) => {    
    try {
        const { cid,pid } = req.params;
        const {quantity}= req.body;
        const cart = await service.quantityCartProduct(cid, pid, quantity);
        res.send(cart);
    } catch (error) {
        console.log(error);
    }
}


export const deleteProdsFromCart = async (req, res) => {
    try {
        const { cid } = req.params;
        const cart = await service.deleteProdsFromCart(cid);
        res.send(cart);
    } catch (error) {
        console.log(error); 
    }
}