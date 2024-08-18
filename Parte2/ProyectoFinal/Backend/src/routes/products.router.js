import { Router } from "express";
import * as controller from "../controllers/product.controllers.js";
import { authenticateJWT } from "../middlewares/auth.js";
import { authorizations } from "../middlewares/authorizations.js";
import { productDto } from "../dtos/product.dto.js";
import { validate } from "../middlewares/validation.js";

const router = Router();

router.get("/", authenticateJWT , controller.getProducts);
router.post("/",validate(productDto),authorizations(["admin"]), controller.createProduct);
router.get("/:pid",authenticateJWT, controller.getProductById);
router.put("/:pid",validate(productDto),authenticateJWT,authorizations(["admin"]), controller.updateProduct);
router.delete("/:pid",authenticateJWT,authorizations(["admin"]), controller.deleteProduct);
export default router