import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import API from "../api/api";
import Loader from "../components/Loader";
import toast from "react-hot-toast";

function ProductDetails() {

    const { id } = useParams();
    const [product, setProduct] = useState(null);
    useEffect(() => {

        const fetchProduct = async () => {

            try {

                const { data } = await API.get(`/products/${id}`);

                setProduct(data.product);

            } catch (error) {

                console.log(error);
                

            }

        };
        fetchProduct();

    }, [id]);
    const handleAddToCart = async () => {

        try {

            const token = localStorage.getItem("token");

            await API.post(
                "/cart",
                {
                    productId: product._id,
                    quantity: 1
                },
                {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                }
            );

            toast.success("Added to Cart!");

        } catch (error) {

            console.log(error);

            toast.error(
                error.response?.data?.message || "Failed to add to cart"
            );

        }

    };
    
    if (!product) {
        return <Loader />;
    }


return (
    <div className="max-w-5xl mx-auto py-10">

        <img
            src={product.image}
            alt={product.title}
            className="w-full max-w-md rounded-xl"
        />

        <h1 className="text-4xl font-bold mt-6">
            {product.title}
        </h1>

        <p className="text-2xl text-emerald-600 mt-3">
            ₹{product.price}
        </p>

        <p className="mt-6">
            {product.description}
        </p>

        <div className="mt-6">
            <h3 className="font-bold">
                Seller
            </h3>

            <p>{product.seller.fullName}</p>
            <p>{product.seller.email}</p>
        </div>
        <button
            onClick={handleAddToCart}
            className="mt-6 bg-emerald-600 text-white px-6 py-3 rounded-lg hover:bg-emerald-700"
        >
            Add to Cart
        </button>

    </div>
);
}
export default ProductDetails;