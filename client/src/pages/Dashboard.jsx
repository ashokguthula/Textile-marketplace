import { useEffect, useState } from "react";
import API from "../api/api";
import { Link } from "react-router-dom";

function Dashboard() {

    const [products, setProducts] = useState([]);

    useEffect(() => {

        const fetchMyProducts = async () => {

            try {

                const token = localStorage.getItem("token");

                const { data } = await API.get("/products/my-products", {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                });

                setProducts(data.products);

            } catch (error) {

                console.log(error);

            }

        };

        fetchMyProducts();

    }, []);
    const handleDelete = async (id) => {

        const confirmDelete = window.confirm(
            "Are you sure you want to delete this product?"
        );

        if (!confirmDelete) return;

        try {

            const token = localStorage.getItem("token");

            await API.delete(`/products/${id}`, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });

            setProducts(
                products.filter(product => product._id !== id)
            );

            alert("Product deleted successfully!");

        } catch (error) {

            console.log(error);

            alert(
                error.response?.data?.message || "Delete Failed"
            );

        }

    };

    return (

        <div className="max-w-7xl mx-auto p-8">

            <h1 className="text-4xl font-bold mb-8">

                Seller Dashboard

            </h1>

            {
                products.length === 0 ? (

                    <h2>No products yet.</h2>

                ) : (

                    <table className="w-full border">

                        <thead>

                            <tr className="bg-emerald-600 text-white">

                                <th className="p-3">Title</th>
                                <th className="p-3">Price</th>
                                <th className="p-3">Quantity</th>
                                <th className="p-3">Actions</th>

                            </tr>

                        </thead>

                        <tbody>

                            {
                                products.map((product) => (

                                    <tr
                                        key={product._id}
                                        className="border-b"
                                    >

                                        <td className="p-3">
                                            {product.title}
                                        </td>

                                        <td className="p-3">
                                            ₹{product.price}
                                        </td>

                                        <td className="p-3">
                                            {product.quantity}
                                        </td>
                                        <td className="p-3">

                                            <Link
                                                to={`/edit-product/${product._id}`}
                                                className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700">
                                                Edit
                                            </Link>
                                            <button
                                                onClick={() => handleDelete(product._id)}
                                                className="bg-red-600 text-white px-4 py-2 rounded-lg ml-2 hover:bg-red-700">
                                                Delete
                                            </button>

                                        </td>
                                        
                                        

                                    </tr>

                                ))
                            }

                        </tbody>

                    </table>

                )
            }

        </div>

    );

}

export default Dashboard;