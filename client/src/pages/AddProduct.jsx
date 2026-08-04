import { useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../api/api";

function AddProduct() {

    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        title: "",
        description: "",
        category: "",
        price: "",
        quantity: "",
        image: null
    });
    const handleChange = (e) => {

        if (e.target.type === "file") {

            setFormData({
                ...formData,
                image: e.target.files[0]
            });

        } else {

            setFormData({
                ...formData,
                [e.target.name]: e.target.value
            });

        }

    };
    const handleSubmit = async (e) => {

        e.preventDefault();

        setLoading(true);

        try {

            const token = localStorage.getItem("token");

            const productData = new FormData();

            productData.append("title", formData.title);
            productData.append("description", formData.description);
            productData.append("category", formData.category);
            productData.append("price", formData.price);
            productData.append("quantity", formData.quantity);

            if (formData.image) {
                productData.append("image", formData.image);
            }

            await API.post(
                "/products",
                productData,
                {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                }
            );

            alert("Product Added Successfully!");

            setFormData({
                title: "",
                description: "",
                category: "",
                price: "",
                quantity: "",
                image: null
            });

            navigate("/dashboard");

        } catch (error) {

            console.log(error);

            alert(
                error.response?.data?.message || "Failed to add product"
            );

        } finally {

            setLoading(false);

        }

    };

    const [loading, setLoading] = useState(false);

    return (
        <div className="max-w-2xl mx-auto p-8">

            <h1 className="text-3xl font-bold mb-8">
                Add Product
            </h1>

            <form
                onSubmit={handleSubmit}
                className="space-y-4"
            >

                <input
                    type="text"
                    name="title"
                    placeholder="Product Title"
                    value={formData.title}
                    onChange={handleChange}
                    className="w-full border p-3 rounded-lg"
                    required
                />

                <textarea
                    name="description"
                    placeholder="Description"
                    value={formData.description}
                    onChange={handleChange}
                    className="w-full border p-3 rounded-lg"
                    required
                />

                <input
                    type="text"
                    name="category"
                    placeholder="Category"
                    value={formData.category}
                    onChange={handleChange}
                    className="w-full border p-3 rounded-lg"
                    required
                />

                <input
                    type="number"
                    name="price"
                    placeholder="Price"
                    min="0"
                    value={formData.price}
                    onChange={handleChange}
                    className="w-full border p-3 rounded-lg"
                    required
                />

                <input
                    type="number"
                    name="quantity"
                    placeholder="Quantity"
                    min="0"
                    value={formData.quantity}
                    onChange={handleChange}
                    className="w-full border p-3 rounded-lg"
                    required
                />

                <input
                    type="file"
                    name="image"
                    accept="image/*"
                    onChange={handleChange}
                    className="w-full border p-3 rounded-lg"
                />

                <button
                    type="submit"
                    disabled={loading}
                    className="w-full bg-emerald-600 text-white p-3 rounded-lg hover:bg-emerald-700 disabled:bg-gray-400"
                >
                    {loading ? "Uploading..." : "Add Product"}
                </button>

            </form>

        </div>
    );
}

export default AddProduct;