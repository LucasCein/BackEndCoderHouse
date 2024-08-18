import ProductModel from "./models/product.model.js";
export default class ProductDaoMongoDb {
    constructor(db) {
        this.db = db;
    }

    async getAll(page = 1, limit = 8, sort, query) {
        const options = {
            page,
            limit,
        };

        let filter = {};

        if (query) {
            if (query === 'stock') {
                filter.stock = { $gt: 0 };
            } else {
                filter.category = { $regex: new RegExp(query, "i") }
            }
        }

        if (sort) {
            options.sort = sort === 'asc' ? { price: 1 } : { price: -1 };
        }

        try {
            const products = await ProductModel.paginate(filter, options);
            return products;
        } catch (error) {
            console.error(error);
        }
    }

    async create(product) {
        try {
            const newProduct = await ProductModel.create(product);
            return newProduct;
        } catch (error) {
            console.log(error);
        }
    }

    async getById(id) {
        try {
            const product = await ProductModel.findOne({ _id: id });
            return product;
        } catch (error) {
            console.log(error);
        }
    }

    async update(id, product) {
        try {
            const updatedProduct = await ProductModel.updateOne({ _id: id }, product);
            return updatedProduct;
        } catch (error) {
            console.log(error);
        }
    }

    async delete(id) {
        try {
            const deletedProduct = await ProductModel.deleteOne({ _id: id });
            return deletedProduct;
        } catch (error) {
            console.log(error);
        }
    }


}


export const updateProductStock = async (productId, newStock) => {
    return await ProductModel.findByIdAndUpdate(productId, { stock: newStock }, { new: true });
};
