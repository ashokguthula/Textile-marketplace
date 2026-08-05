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
import sellerOnly from "../middleware/sellerMiddleware.js";

// Create a Product
router.get("/", getAllProducts);

router.get("/my-products", protect, getMyProducts);

router.get("/:id", getProductById);

router.post(
    "/",
    protect,
    sellerOnly,
    upload.single("image"),
    createProduct
);

router.put(
    "/:id",
    protect,
    sellerOnly,
    updateProduct
);

router.delete(
    "/:id",
    protect,
    sellerOnly,
    deleteProduct
);

export default router;