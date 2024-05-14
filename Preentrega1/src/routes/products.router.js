import { Router } from "express";
import ProductManager from "../manager/products.manager.js";

const router = Router();
const productManager = new ProductManager("./src/data/products.json");

router.get("/", async (req, res) => {
    try {
        const { limit } = req.query;
        const products = await productManager.getProducts(limit);
        res.status(200).send({ success: true, products });
    } catch (error) {
        console.error("Error fetching products:", error);
        res.status(500).send({ success: false, message: "Internal server error." });
    }
});

router.get("/:pid", async (req, res) => {
    const { pid } = req.params;
    try {
        const product = await productManager.getProductById(pid);
        if (product) {
            res.status(200).send({ success: true, product });
        } else {
            res.status(404).send({ success: false, message: "Product not found." });
        }
    } catch (error) {
        console.error("Error fetching product:", error);
        res.status(500).send({ success: false, message: "Internal server error." });
    }
});

router.post("/", async (req, res) => {
    const product = req.body;
    try {
        const newProduct = await productManager.insertProduct(product);
        if (newProduct) {
            res.status(201).send({ success: true, product: newProduct });
        } else {
            res.status(400).send({ success: false, message: "Invalid product data or product code already exists." });
        }
    } catch (error) {
        console.error("Error inserting product:", error);
        res.status(500).send({ success: false, message: "Internal server error." });
    }
});

router.put("/:pid", async (req, res) => {
    const { pid } = req.params;
    const productUpdates = req.body;
    try {
        const updatedProduct = await productManager.updateProduct(pid, productUpdates);
        if (updatedProduct) {
            res.status(200).send({ success: true, product: updatedProduct });
        } else {
            res.status(404).send({ success: false, message: "Product not found." });
        }
    } catch (error) {
        console.error("Error updating product:", error);
        res.status(500).send({ success: false, message: "Internal server error." });
    }
});

router.delete("/:pid", async (req, res) => {
    const { pid } = req.params;
    try {
        const deletedProduct = await productManager.deleteProduct(pid);
        if (deletedProduct) {
            res.status(200).send({ success: true, products: deletedProduct });
        } else {
            res.status(404).send({ success: false, message: "Product not found." });
        }
    } catch (error) {
        console.error("Error deleting product:", error);
        res.status(500).send({ success: false, message: "Internal server error." });
    }
});

export { router as productRouter };
