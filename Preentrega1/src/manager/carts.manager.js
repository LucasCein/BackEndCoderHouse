import fs from "fs";
import uuid4 from "uuid4";

export default class CartsManager {
    constructor(path) {
        this.path = path;
    }

    async readCartsFromFile() {
        if (fs.existsSync(this.path)) {
            const data = await fs.promises.readFile(this.path, "utf-8");
            return JSON.parse(data);
        }
        return [];
    }

    async writeCartsToFile(carts) {
        await fs.promises.writeFile(this.path, JSON.stringify(carts, null, 2));
    }

    async getCarts() {
        try {
            return await this.readCartsFromFile();
        } catch (error) {
            console.error("Error reading carts from file:", error);
            return [];
        }
    }

    async createCart() {
        try {
            const carts = await this.getCarts();
            const newCart = {
                id: uuid4(),
                products: [],
            };

            carts.push(newCart);
            await this.writeCartsToFile(carts);
            return newCart;
        } catch (error) {
            console.error("Error creating cart:", error);
            return null;
        }
    }

    async getCartById(cartId) {
        try {
            const carts = await this.getCarts();
            const cart = carts.find(c => c.id === cartId);
            return cart ? cart.products : null;
        } catch (error) {
            console.error("Error retrieving cart by ID:", error);
            return null;
        }
    }

    async addProductToCart(cartId, productId) {
        try {
            const carts = await this.getCarts();
            const cart = carts.find(c => c.id === cartId);
            if (!cart) {
                return null;
            }

            const product = cart.products.find(p => p.product === productId);
            if (product) {
                product.quantity++;
            } else {
                cart.products.push({ product: productId, quantity: 1 });
            }

            await this.writeCartsToFile(carts);
            return cart;
        } catch (error) {
            console.error("Error adding product to cart:", error);
            return null;
        }
    }
}
