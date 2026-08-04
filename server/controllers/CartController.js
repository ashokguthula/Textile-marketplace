import Cart from "../models/Cart.js";

export const addToCart = async (req, res) => {

    try {

        const { productId, quantity } = req.body;

        const existingItem = await Cart.findOne({
            user: req.user.id,
            product: productId
        });

        if (existingItem) {

            existingItem.quantity += quantity || 1;

            await existingItem.save();

            return res.status(200).json({
                success: true,
                message: "Cart updated successfully.",
                cart: existingItem
            });

        }

        const cart = await Cart.create({

            user: req.user.id,

            product: productId,

            quantity: quantity || 1

        });

        res.status(201).json({

            success: true,

            message: "Product added to cart.",

            cart

        });

    } catch (error) {

        res.status(500).json({

            success: false,

            message: error.message

        });

    }

};

export const getMyCart = async (req, res) => {

    try {

        const cart = await Cart.find({
            user: req.user.id
        })
        .populate("product")
        .sort({ createdAt: -1 });

        res.status(200).json({

            success: true,

            count: cart.length,

            cart

        });

    } catch (error) {

        res.status(500).json({

            success: false,

            message: error.message

        });

    }

};

export const updateCartQuantity = async (req, res) => {

    try {

        const { quantity } = req.body;
        if (quantity < 1) {

            return res.status(400).json({
                success: false,
                message: "Quantity must be at least 1."
            });

        }


        const cartItem = await Cart.findById(req.params.id);

        if (!cartItem) {

            return res.status(404).json({
                success: false,
                message: "Cart item not found."
            });

        }

        // Make sure the logged-in user owns this cart item
        if (cartItem.user.toString() !== req.user.id) {

            return res.status(401).json({
                success: false,
                message: "Not authorized."
            });

        }

        cartItem.quantity = quantity;

        await cartItem.save();

        res.status(200).json({
            success: true,
            message: "Cart updated successfully.",
            cart: cartItem
        });

    } catch (error) {

        res.status(500).json({
            success: false,
            message: error.message
        });

    }

};

export const removeFromCart = async (req, res) => {

    try {

        const cartItem = await Cart.findById(req.params.id);

        if (!cartItem) {

            return res.status(404).json({
                success: false,
                message: "Cart item not found."
            });

        }

        // Only the owner can remove it
        if (cartItem.user.toString() !== req.user.id) {

            return res.status(401).json({
                success: false,
                message: "Not authorized."
            });

        }

        await cartItem.deleteOne();

        res.status(200).json({

            success: true,

            message: "Item removed from cart."

        });

    } catch (error) {

        res.status(500).json({

            success: false,

            message: error.message

        });

    }

};