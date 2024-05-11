import fs from "fs";
import uuid4 from "uuid4";

export default class CartsManager {
    constructor(path) {
        this.path = path;
    }

    getCarts = async () => {
        if (fs.existsSync(this.path)) {
            const carts = await fs.promises.readFile(this.path, "utf-8");
            return JSON.parse(carts);
        } else {
            return [];
        }
    }
    createCart = async () => {
        const carts = await this.getCarts();
        const cart = {
            id: uuid4(),
            products: [],
        };
        if(carts.some((cart) => cart.id === cart.id)){
            return null;
        }
        carts.push(cart);
        await fs.promises.writeFile(this.path, JSON.stringify(carts, null, 2));
        return cart;
    }
    getCartById = async (id) => {
        const carts = await this.getCarts();
        const cart = carts.find((cart) => cart.id === id);
        if(!cart){
            return null;
        }
        return cart.products;
    }
    addProductToCart = async (cid, pid) => {
        const carts = await this.getCarts();
        const cart = carts.find((cart) => cart.id === cid);
        if(!cart){
            return null;
        }
        if(!cart.products.find((cartProduct) => cartProduct.product === pid)){
            const prod= {
                product:pid,
                quantity: 1
            }
            cart.products.push(prod);
            await fs.promises.writeFile(this.path, JSON.stringify(carts, null, 2));
            return cart;
        }
        else{
            const index = cart.products.findIndex((cartProduct) => cartProduct.product === pid);
            cart.products[index].quantity++;
            await fs.promises.writeFile(this.path, JSON.stringify(carts, null, 2));
            return cart;
        }
        
    }
}