import {Router} from "express";
import * as controller from "../controllers/cart.controller.js";

const router = Router();

router.post("/", controller.createCart);
router.get("/view/:cid", controller.getCartByIdView);
router.get("/:cid", controller.getCartById);
router.post("/:cid/product/:pid", controller.addProductToCart);
router.delete("/:cid/product/:pid", controller.deleteProductFromCart);
router.put("/:cid", controller.updateCart);
router.put("/:cid/product/:pid", controller.quantityCartProduct);
router.delete("/:cid", controller.deleteProdsFromCart);
export default router