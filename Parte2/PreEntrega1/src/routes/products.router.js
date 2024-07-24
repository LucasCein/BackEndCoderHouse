import { Router } from "express";
import * as controller from "../controllers/product.controllers.js";
import { authenticateJWT } from "../middlewares/auth.js";


const router = Router();

router.get("/", authenticateJWT , controller.getProducts);
router.post("/",authenticateJWT, controller.createProduct);
router.get("/:pid",authenticateJWT, controller.getProductById);
router.put("/:pid",authenticateJWT, controller.updateProduct);
router.delete("/:pid",authenticateJWT, controller.deleteProduct);
export default router