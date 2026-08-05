import { useEffect, useState } from "react";
import API from "../api/api";
import { Link } from "react-router-dom";
import toast from "react-hot-toast";
import Loader from "../components/Loader";
import EmptyState from "../components/EmptyState";

function Dashboard() {
    const [loading, setLoading] = useState(true);

    const [products, setProducts] = useState([]);

    useEffect(() => {

        const fetchMyProducts = async () => {

            setLoading(true);

            try {

                const token = localStorage.getItem("token");

                const { data } = await API.get("/products/my-products", {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                });

                setProducts(data.products);
                setLoading(false);

            } catch (error) {

                console.log(error);
                setLoading(false);

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

            toast.success("Product deleted successfully!");

        } catch (error) {

            console.log(error);
            

            toast.error(
                error.response?.data?.message || "Delete Failed"
            );

        }

    };
    if (loading) {
    return <Loader />;
}

    return (

        <div className="max-w-7xl mx-auto p-8">

            <h1 className="text-4xl font-bold mb-8">

                Supplier Dashboard

            </h1>

            {
                products.length === 0 ? (

                    <EmptyState
                        title="No Products Yet"
                        description="Start selling by adding your first product."
                        buttonText="Add Product"
                        buttonLink="/add-product"
                    />

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