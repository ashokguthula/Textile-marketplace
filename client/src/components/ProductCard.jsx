import { Link } from "react-router-dom";

function ProductCard({ product }) {
    return (
        <div className="bg-white rounded-xl shadow hover:shadow-lg transition overflow-hidden">

            {product.image && (
                <img
                    src={product.image}
                    alt={product.title}
                    className="w-full h-56 object-cover"
                />
            )}

            <div className="p-4">

                <h2 className="text-xl font-semibold">
                    {product.title}
                </h2>

                <p className="text-gray-500 mt-2">
                    ₹{product.price}
                </p>

                <Link
                    to={`/product/${product._id}`}
                    className="mt-4 inline-block bg-emerald-600 text-white px-4 py-2 rounded-lg hover:bg-emerald-700"
                >
                    View Details
                </Link>

            </div>

        </div>
    );
}

export default ProductCard;