import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import API from "../api/api";

function EditProduct() {

    const { id } = useParams();

    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        title: "",
        description: "",
        category: "",
        price: "",
        quantity: "",
        image: ""
    });
    useEffect(() => {

        const fetchProduct = async () => {

            try {

                const { data } = await API.get(`/products/${id}`);

                setFormData({
                    title: data.product.title,
                    description: data.product.description,
                    category: data.product.category,
                    price: data.product.price,
                    quantity: data.product.quantity,
                    image: data.product.image
                });

            } catch (error) {

                console.log(error);

            }

        };

        fetchProduct();

    }, [id]);
    const handleChange = (e) => {

        setFormData({

            ...formData,

            [e.target.name]: e.target.value

        });

    };
    const handleSubmit = async (e) => {

        e.preventDefault();

        try {

            const token = localStorage.getItem("token");

            await API.put(
                `/products/${id}`,
                formData,
                {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                }
            );

            alert("Product Updated Successfully!");

            navigate("/dashboard");

        } catch (error) {

            console.log(error);

            alert(
                error.response?.data?.message || "Update Failed"
            );

        }

    };

    return (
        <div className="max-w-2xl mx-auto p-8">

            <h1 className="text-3xl font-bold mb-8">
                Edit Product
            </h1>

            <form
                onSubmit={handleSubmit}
                className="space-y-4">

                <input
                    type="text"
                    name="title"
                    placeholder="Product Title"
                    value={formData.title}
                    onChange={handleChange}
                    className="w-full border p-3 rounded-lg"
                />

                <textarea
                    name="description"
                    placeholder="Description"
                    value={formData.description}
                    onChange={handleChange}
                    className="w-full border p-3 rounded-lg"
                />

                <input
                    type="text"
                    name="category"
                    placeholder="Category"
                    value={formData.category}
                    onChange={handleChange}
                    className="w-full border p-3 rounded-lg"
                />

                <input
                    type="number"
                    name="price"
                    placeholder="Price"
                    value={formData.price}
                    onChange={handleChange}
                    className="w-full border p-3 rounded-lg"
                />

                <input
                    type="number"
                    name="quantity"
                    placeholder="Quantity"
                    value={formData.quantity}
                    onChange={handleChange}
                    className="w-full border p-3 rounded-lg"
                />

                <input
                    type="text"
                    name="image"
                    placeholder="Image URL"
                    value={formData.image}
                    onChange={handleChange}
                    className="w-full border p-3 rounded-lg"
                />

                <button
                    type="submit"
                    className="w-full bg-emerald-600 text-white p-3 rounded-lg hover:bg-emerald-700"
                >
                    Update Product
                </button>

            </form>

        </div>
    );
}

export default EditProduct;