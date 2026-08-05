import Product from "../models/product.js";

import cloudinary from "../config/cloudinary.js";
import streamifier from "streamifier";

const uploadToCloudinary = (buffer) => {
    return new Promise((resolve, reject) => {

        const stream = cloudinary.uploader.upload_stream(
            {
                folder: "textile-marketplace"
            },
            (error, result) => {

                if (error) return reject(error);

                resolve(result);

            }
        );

        streamifier.createReadStream(buffer).pipe(stream);

    });
};

export const createProduct = async (req, res) => {
    try {

        const {
            title,
            description,
            category,
            price,
            quantity
        } = req.body;

        // Validation
        if (
            !title ||
            !description ||
            !category ||
            !price
        ) {
            return res.status(400).json({
                success: false,
                message: "Please fill all required fields."
            });
        }
        if (price < 0 || quantity < 0) {
            return res.status(400).json({
                success: false,
                message: "Price and quantity cannot be negative."
            });
        }
        let imageUrl = "";

        if (req.file) {

            const uploadedImage = await uploadToCloudinary(
                req.file.buffer
            );

            imageUrl = uploadedImage.secure_url;

        }

        const product = await Product.create({
            title,
            description,
            category,
            price,
            quantity,
            image: imageUrl,
            seller: req.user.id
        });

        res.status(201).json({
            success: true,
            message: "Product created successfully.",
            product
        });

    } catch (error) {

        res.status(500).json({
            success: false,
            message: error.message
        });

    }
};

export const getAllProducts = async (req, res) => {
    try {

        const products = await Product.find()
            .populate("seller", "fullName email")
            .sort({ createdAt: -1 });

        res.status(200).json({
            success: true,
            count: products.length,
            products
        });

    } catch (error) {

        res.status(500).json({
            success: false,
            message: error.message
        });

    }
};

export const getProductById = async (req, res) => {
    try {

        const product = await Product.findById(req.params.id)
            .populate("seller", "fullName email");

        if (!product) {
            return res.status(404).json({
                success: false,
                message: "Product not found."
            });
        }

        res.status(200).json({
            success: true,
            product
        });

    } catch (error) {

        res.status(500).json({
            success: false,
            message: error.message
        });

    }
};
export const getMyProducts = async (req, res) => {
    try {

        const products = await Product.find({
            seller: req.user.id
        }).sort({ createdAt: -1 });

        res.status(200).json({
            success: true,
            products
        });

    } catch (error) {

        res.status(500).json({
            success: false,
            message: error.message
        });

    }
};

export const updateProduct = async (req, res) => {

    try {

        const product = await Product.findById(req.params.id);

        const { price, quantity } = req.body;

        if (!product) {
            return res.status(404).json({
                success: false,
                message: "Product not found."
            });
        }
        if (price < 0 || quantity < 0) {
            return res.status(400).json({
                success: false,
                message: "Price and quantity cannot be negative."
            });
        }

        // Only the seller can update
        if (product.seller.toString() !== req.user.id) {
            return res.status(401).json({
                success: false,
                message: "Not authorized."
            });
        }

        const updatedProduct = await Product.findByIdAndUpdate(
            req.params.id,
            req.body,
            {
                new: true,
                runValidators: true
            }
        );

        res.status(200).json({
            success: true,
            message: "Product updated successfully.",
            product: updatedProduct
        });

    } catch (error) {

        res.status(500).json({
            success: false,
            message: error.message
        });

    }

};
export const deleteProduct = async (req, res) => {

    try {

        const product = await Product.findById(req.params.id);

        if (!product) {

            return res.status(404).json({
                success: false,
                message: "Product not found."
            });

        }

        // Only seller can delete

        if (product.seller.toString() !== req.user.id) {

            return res.status(401).json({
                success: false,
                message: "Not authorized."
            });

        }

        await Product.findByIdAndDelete(req.params.id);

        res.status(200).json({

            success: true,
            message: "Product deleted successfully."

        });

    } catch (error) {

        res.status(500).json({

            success: false,
            message: error.message

        });

    }

};