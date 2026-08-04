import express from "express";
import protect from "../middleware/authMiddleware.js";
import {
    createProduct,
    getAllProducts,
    getProductById,
    getMyProducts,
    updateProduct,
    deleteProduct
} from "../controllers/productController.js";
const router = express.Router();

import upload from "../middleware/uploadMiddleware.js";

// Create a Product
router.get("/", getAllProducts);

router.get("/my-products", protect, getMyProducts);

router.get("/:id", getProductById);

router.post("/", protect,upload.single("image"), createProduct);

router.put("/:id", protect, updateProduct);

router.delete("/:id", protect, deleteProduct);

export default router;