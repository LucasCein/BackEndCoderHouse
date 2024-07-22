import { Router } from "express";
import CartsManager from "../manager/carts.manager.js";

const router = Router();
const cartsManager = new CartsManager("./src/data/carts.json");

router.post("/", async (req, res) => {
    try {
        const cart = await cartsManager.createCart();
        if (cart) {
            res.status(201).send({ success: true, cart });
        } else {
            res.status(500).send({ success: false, message: "Failed to create cart." });
        }
    } catch (error) {
        console.error("Error creating cart:", error);
        res.status(500).send({ success: false, message: "Internal server error." });
    }
});

router.get("/:cid", async (req, res) => {
    const { cid } = req.params;
    try {
        const cart = await cartsManager.getCartById(cid);
        if (cart) {
            res.status(200).send({ success: true, cart });
        } else {
            res.status(404).send({ success: false, message: "Cart not found." });
        }
    } catch (error) {
        console.error("Error fetching cart:", error);
        res.status(500).send({ success: false, message: "Internal server error." });
    }
});

router.post("/:cid/product/:pid", async (req, res) => {
    const { cid, pid } = req.params;
    try {
        const cart = await cartsManager.addProductToCart(cid, pid);
        if (cart) {
            res.status(201).send({ success: true, cart });
        } else {
            res.status(404).send({ success: false, message: "Cart or product not found." });
        }
    } catch (error) {
        console.error("Error adding product to cart:", error);
        res.status(500).send({ success: false, message: "Internal server error." });
    }
});

export { router as cartRouter };
