import { Router } from "express";
import ProductManager from "../manager/products.manager.js";
import { path } from "../utils.js";
const productManager = new ProductManager(path);
const router = Router();

router.get("/", async (req, res) => {
    res.render('home', {products: await productManager.getProducts()})
})
router.get('/realTimeProducts', async (req, res) => {
    res.render('realTimeProducts')
})


export { router as productRouter };
