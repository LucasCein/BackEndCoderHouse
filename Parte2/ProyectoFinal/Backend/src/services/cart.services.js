import CartDaoMongoDb from "../daos/mongodb/cart.dao.js";
import { updateProductStock } from "../daos/mongodb/product.dao.js";
const CartDao = new CartDaoMongoDb();
export const getCarts = async () => {
    try {
        const carts = await CartDao.getAll();
        return carts;
    } catch (error) {
        console.log(error);
    }
}
export const createCart = async ({ products }) => {
    try {
        const newCart = await CartDao.createCart({products });
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

export const purchaseCartService = async (cartId,user) => {
    const cart = await getCartById(cartId);
    if (!cart) {
        throw new Error('Carrito no encontrado');
    }

    let successfulProducts = [];
    let failedProducts = [];

    for (let item of cart.products) {
        const product = item.product;
        const quantity = item.quantity;

        if (product.stock >= quantity) {
            // Si hay suficiente stock, actualizar el stock del producto
            await updateProductStock(product._id, product.stock - quantity);
            successfulProducts.push(item);
        } else {
            // Si no hay suficiente stock, agregar a productos fallidos
            failedProducts.push(item);
        }
    }

    // Actualizar el carrito para que solo contenga los productos que no pudieron comprarse
    cart.products = failedProducts;
    await updateCart(cartId, cart);
    return {
        message: successfulProducts.length > 0 ? 'Compra realizada con éxito' : 'No se pudo realizar la compra',
        successfulProducts,
        failedProducts,
        user
    };
};