import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import API from "../api/api";

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
    
    if (!product) {
        return (
            <h1 className="text-center mt-20">Loading...</h1>
        );
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

    </div>
);
}
export default ProductDetails;