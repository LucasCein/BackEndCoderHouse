import fs from "fs";
import uuid4 from "uuid4";

export default class ProductManager {
    constructor(path) {
        this.path = path;
        this.initProducts();
    }

    async initProducts() {
        try {
            if (fs.existsSync(this.path)) {
                const data = await fs.promises.readFile(this.path, "utf-8");
                this.products = data.trim().length ? JSON.parse(data) : [];
            } else {
                this.products = [];
            }
        } catch (error) {
            console.error('Failed to initialize products:', error);
            this.products = [];
        }
    }

    async saveProducts() {
        try {
            await fs.promises.writeFile(this.path, JSON.stringify(this.products, null, 2));
        } catch (error) {
            console.error('Failed to save products:', error);
        }
    }

    async getProducts(limit) {
        return limit ? this.products.slice(0, limit) : this.products;
    }

    async getProductById(id) {
        return this.products.find((product) => product.id === id) || null;
    }

    async insertProduct(product) {
        const { title, description, price, thumbnail, code, stock, category } = product;

        if (!title || !description || !price || !code || !stock || !category) {
            return null;
        }

        if (this.products.some((p) => p.code === code)) {
            return null;
        }

        const newProduct = {
            id: uuid4(),
            title,
            description,
            price,
            thumbnail,
            code,
            stock,
            category,
            status: true,
        };

        this.products.push(newProduct);
        await this.saveProducts();
        return newProduct;
    }

    async updateProduct(id, updates) {
        const index = this.products.findIndex(product => product.id === id);
        if (index === -1) {
            return null;
        }

        const existingProduct = this.products[index];
        const updatedProduct = { ...existingProduct, ...updates };

        this.products[index] = updatedProduct;
        await this.saveProducts();

        return this.products[index];
    }

    async deleteProduct(id) {
        const index = this.products.findIndex((product) => product.id === id);
        if (index === -1) {
            return null;
        }
        this.products.splice(index, 1);
        await this.saveProducts();
        return this.products;
    }
}
