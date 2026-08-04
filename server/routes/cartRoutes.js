import express from "express";

import protect from "../middleware/authMiddleware.js";

import {
    addToCart,
    getMyCart,
    updateCartQuantity,
    removeFromCart
} from "../controllers/cartController.js";

const router = express.Router();

router.post(
    "/",
    protect,
    addToCart
);

router.get(
    "/",
    protect,
    getMyCart,
);

router.put(
    "/:id",
    protect,
    updateCartQuantity
);

router.delete(
    "/:id",
    protect,
    removeFromCart
);
export default router;