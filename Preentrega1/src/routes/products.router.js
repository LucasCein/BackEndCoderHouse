import { Router } from "express";
import ProductManager from "../manager/products.manager.js";
const router = Router();
const productManager = new ProductManager("./src/data/products.json");
router.get("/", async (req, res) => {
    const { limit } = req.query;
    const products = await productManager.getProducts(limit);
    res.status(200).send(products);
});

router.get("/:pid", async (req, res) => {
    const { pid } = req.params;
    const product = await productManager.getProductById(pid);
    res.status(200).send(product);
});

router.post("/", async (req, res) => {
    const product = req.body;
    const newProduct = await productManager.insertProduct(product);
    if(newProduct===null){
        res.status(400).send("Error al insertar el producto");
    }
    else{
        res.status(201).send(newProduct);
    }
});

router.put("/:pid", async (req, res) => {
    const { pid } = req.params;
    const product = req.body;
    const updatedProduct = await productManager.updateProduct(pid, product);
    res.status(200).send(updatedProduct);
});

router.delete("/:pid", async (req, res) => {
    const { pid } = req.params;
    const deletedProduct = await productManager.deleteProduct(pid);
    res.status(200).send(deletedProduct);
});
export { router as productRouter }
