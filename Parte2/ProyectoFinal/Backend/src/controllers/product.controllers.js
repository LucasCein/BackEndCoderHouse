import * as service from "../services/product.services.js";

export const getProducts = async (req, res) => {
    try {
        const {limit , page, sort, query}=req.query
        const products = await service.getProducts(page, limit, sort, query);
        const plainProducts = products.docs.map(product => product.toObject())
        res.json(plainProducts);
    } catch (error) {
        console.log(error);
    }
}

export const getProductById = async (req, res) => {
    try {
        const { pid } = req.params;
        const product = await service.getProductById(pid);
        res.json(product);
    } catch (error) {
        console.log(error);
    }
}

export const createProduct = async (req, res) => {
    try {
        const product = req.body;
        const newProduct = await service.createProduct(product);
        res.json(newProduct);
    } catch (error) {
        console.log(error);
    }
}

export const updateProduct = async (req, res) => {
    try {
        const { pid } = req.params;
        const product = req.body;
        const updatedProduct = await service.updateProduct(pid, product);
        res.json(updatedProduct);
    } catch (error) {
        console.log(error);
    }
}

export const deleteProduct = async (req, res) => {
    try {
        const { pid } = req.params;
        const deletedProduct = await service.deleteProduct(pid);
        res.json(deletedProduct);
    } catch (error) {
        console.log(error);
    }
}