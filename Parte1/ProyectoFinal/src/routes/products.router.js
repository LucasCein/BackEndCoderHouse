import { Router } from "express";
import * as controller from "../controllers/product.controllers.js";

const router = Router();

router.get("/", controller.getProducts);
router.post("/", controller.createProduct);
router.get("/:pid", controller.getProductById);
router.put("/:pid", controller.updateProduct);
router.delete("/:pid", controller.deleteProduct);
export default router