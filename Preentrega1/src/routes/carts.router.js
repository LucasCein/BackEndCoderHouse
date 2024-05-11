import { Router } from "express";
import  CartsManager from "../manager/carts.manager.js";
const router = Router();
const cartsManager = new CartsManager("./src/data/carts.json");


router.post("/", async (req, res) => {
    const cart = await cartsManager.createCart();
    res.status(201).send(cart);
});

router.get("/:cid", async (req, res) => {
    const { cid } = req.params;
    const cart = await cartsManager.getCartById(cid);
    res.status(200).send(cart);
});

router.post("/:cid/product/:pid", async (req, res) => {
    const { cid, pid } = req.params;
    const cart = await cartsManager.addProductToCart(cid, pid);
    res.status(201).send(cart);
});

export { router as cartRouter }
