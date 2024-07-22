import CartDaoMongoDb from "../daos/mongodb/cart.dao.js";
const CartDao = new CartDaoMongoDb();
export const getCarts = async () => {
    try {
        const carts = await CartDao.getAll();
        return carts;
    } catch (error) {
        console.log(error);
    }
}
export const createCart = async () => {
    try {
        const newCart = await CartDao.createCart();
        return newCart;
    } catch (error) {
        console.log(error);
    }
}
export const getCartById = async (id) => {
    try {
        const cart = await CartDao.getCartById(id);
        return cart;
    } catch (error) {
        console.log(error);
    }
}

export const addProductToCart = async (cartId, productId) => {
    try {
        const cart = await CartDao.addProductToCart(cartId, productId);
        return cart;
    } catch (error) {
        console.log(error);
    }
}

export const deleteProductFromCart = async (cartId, productId) => {
    try {
        const cart = await CartDao.deleteProductFromCart(cartId, productId);
        return cart;
    } catch (error) {
        console.log(error); 
    }
}

export const updateCart = async (cartId, products) => {
    try {
        const cart = await CartDao.updateCart(cartId, products);
        return cart;
    } catch (error) {
        console.log(error); 
    }
}
export const quantityCartProduct = async (cartId, productId, quantity) => {
    try {
        const cart = await CartDao.quantityCartProduct(cartId, productId, quantity);
        return cart;
    } catch (error) {
        console.log(error); 
    }
}
export const deleteProdsFromCart = async (cartId) => {
    try {
        const cart = await CartDao.deleteProdsFromCart(cartId);
        return cart;
    } catch (error) {
        console.log(error); 
    }
}
