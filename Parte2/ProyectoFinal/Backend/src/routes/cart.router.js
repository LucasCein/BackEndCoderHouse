import {Router} from "express";
import * as controller from "../controllers/cart.controller.js";
import { validate } from "../middlewares/validation.js";
import { cartDto } from "../dtos/cart.dto.js";
import { authorizations } from "../middlewares/authorizations.js";
import { authenticateJWT } from "../middlewares/auth.js";
const router = Router();

router.post("/",validate(cartDto),authenticateJWT, controller.createCart);
router.get("/:cid", controller.getCartById);
router.post("/:cid/product/:pid",authenticateJWT,authorizations(['user']), controller.addProductToCart);
router.delete("/:cid/product/:pid",authenticateJWT,authorizations(['user']), controller.deleteProductFromCart);
router.put("/:cid",authenticateJWT,authorizations(['user']), controller.updateCart);
router.put("/:cid/product/:pid",authenticateJWT,authorizations(['user']), controller.quantityCartProduct);
router.delete("/:cid",authenticateJWT,authorizations(['user']), controller.deleteProdsFromCart);
router.post('/:cid/purchase',authenticateJWT, controller.purchaseCart);
export default router