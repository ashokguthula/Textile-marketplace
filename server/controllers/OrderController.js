import Order from "../models/Order.js";
import Cart from "../models/Cart.js";

export const createOrder = async (req, res) => {

    try {

        console.log("Logged in user:", req.user.id);
        const cartItems = await Cart.find({
            user: req.user.id
        }).populate("product");
        if (cartItems.length === 0) {

            return res.status(400).json({
                success: false,
                message: "Cart is empty"
            });

        }
        let totalAmount = 0;
        const products = cartItems.map(item => {

            totalAmount +=
                item.product.price * item.quantity;

            return {

                product: item.product._id,

                quantity: item.quantity,

                price: item.product.price

            };
            console.log("Cart Items:", cartItems);

        });
        const order = await Order.create({

            buyer: req.user.id,

            products,

            totalAmount

        });
        await Cart.deleteMany({

            user: req.user.id

        });
        res.status(201).json({

            success: true,

            message: "Order placed successfully",

            order

        });

    } catch (error) {

        res.status(500).json({
            success: false,
            message: error.message
        });

    }
    

};

export const getMyOrders = async (req, res) => {

    try {

        const orders = await Order.find({
            buyer: req.user.id
        })
        .populate("products.product")
        .sort({ createdAt: -1 });

        res.status(200).json({
            success: true,
            orders
        });

    } catch (error) {

        res.status(500).json({
            success: false,
            message: error.message
        });

    }

};