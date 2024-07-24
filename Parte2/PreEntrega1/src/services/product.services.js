import ProductDaoMongoDb from "../daos/mongodb/product.dao.js";
const ProductDao = new ProductDaoMongoDb();
export const getProducts = async (page, limit, sort, query) => {
    try {
        const products = await ProductDao.getAll(page, limit, sort, query);
        return products;
    } catch (error) {
        console.log(error);
    }
}

export const getProductById = async (id) => {
    try {
        const product = await ProductDao.getById(id);
        return product;
    } catch (error) {
        console.log(error);
    }
}

export const createProduct = async (product) => {
    try {
        const newProduct = await ProductDao.create(product);
        return newProduct;
    } catch (error) {
        console.log(error);
    }
}

export const updateProduct = async (id, product) => {
    try {
        const updatedProduct = await ProductDao.update(id, product);
        return updatedProduct;
    } catch (error) {
        console.log(error)
    }
}

export const deleteProduct = async (id) => {
    try {
        const deletedProduct = await ProductDao.delete(id);
        return deletedProduct;
    } catch (error) {
        console.log(error);
    }
}