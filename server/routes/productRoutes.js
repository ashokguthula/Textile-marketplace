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

// Create a Product
router.get("/", getAllProducts);

router.get("/my-products", protect, getMyProducts);

router.get("/:id", getProductById);

router.post("/", protect, createProduct);

router.put("/:id", protect, updateProduct);

router.delete("/:id", protect, deleteProduct);

export default router;