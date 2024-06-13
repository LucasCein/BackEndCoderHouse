import * as service from "../services/product.services.js";

export const getProducts = async (req, res) => {
    try {
        const {limit , page, sort, query}=req.query
        const products = await service.getProducts(page, limit, sort, query);
        const plainProducts = products.docs.map(product => product.toObject())
        const next = products.hasNextPage ? `http://localhost:8080/?page=${products.nextPage}` : null;
        const prev = products.hasPrevPage ? `http://localhost:8080/?page=${products.prevPage}` : null;
        let status=200
        products != null ? status=200 : status=404
        console.log({
            status,
            payload: products.docs,
            totalPages: products.totalPages,
            prevPage:products.prevPage,
            nextPage:products.nextPage,
            page: products.page,
            hasPrevPage: products.hasPrevPage,
            hasNextPage: products.hasNextPage,
            prevLink: prev,
            nextLink: next
        })
        res.render("home", { products: plainProducts });
    } catch (error) {
        console.log(error);
    }
}

export const getProductById = async (req, res) => {
    try {
        const { pid } = req.params;
        const product = await service.getProductById(pid);
        res.send(product);
    } catch (error) {
        console.log(error);
    }
}

export const createProduct = async (req, res) => {
    try {
        const product = req.body;
        const newProduct = await service.createProduct(product);
        res.send(newProduct);
    } catch (error) {
        console.log(error);
    }
}

export const updateProduct = async (req, res) => {
    try {
        const { pid } = req.params;
        const product = req.body;
        const updatedProduct = await service.updateProduct(pid, product);
        res.send(updatedProduct);
    } catch (error) {
        console.log(error);
    }
}

export const deleteProduct = async (req, res) => {
    try {
        const { pid } = req.params;
        const deletedProduct = await service.deleteProduct(pid);
        res.send(deletedProduct);
    } catch (error) {
        console.log(error);
    }
}