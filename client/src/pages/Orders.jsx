import { useEffect, useState } from "react";
import API from "../api/api";
import Loader from "../components/Loader";

function Orders() {

    const [orders, setOrders] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {

        const fetchOrders = async () => {

            try {

                const token = localStorage.getItem("token");

                const { data } = await API.get(
                    "/orders/my-orders",
                    {
                        headers: {
                            Authorization: `Bearer ${token}`
                        }
                    }
                );

                setOrders(data.orders);

            } catch (error) {

                console.log(error);

            } finally {

                setLoading(false);

            }

        };

        fetchOrders();

    }, []);

    if (loading) return <Loader />;

    return (

        <div className="max-w-5xl mx-auto">

            <h1 className="text-3xl font-bold mb-8">
                My Orders
            </h1>

            {orders.length === 0 ? (

                <p>No orders yet.</p>

            ) : (

                orders.map(order => (

                    <div
                        key={order._id}
                        className="bg-white shadow-lg rounded-xl p-6 mb-6"
                    >

                        <div className="flex justify-between items-center mb-4">

                            <div>

                                <h2 className="font-bold text-lg">
                                    Order #{order._id.slice(-6)}
                                </h2>

                                <p className="text-gray-500 text-sm">
                                    {new Date(order.createdAt).toLocaleDateString()}
                                </p>

                            </div>

                            <span className="bg-yellow-100 text-yellow-700 px-3 py-1 rounded-full text-sm font-semibold">

                                {order.status}

                            </span>

                        </div>

                        {order.products.map((item, index) => (

                            <div
                                key={`${order._id}-${item.product?._id || item._id}`}
                                className="flex justify-between border-b py-3"
                            >

                                <div>

                                    <p className="font-semibold">
                                        {item.product?.title || "Product not available"}
                                    </p>

                                    <p className="text-gray-500">
                                        Qty: {item.quantity}
                                    </p>

                                </div>

                                <p className="font-bold">
                                    ₹{item.price}
                                </p>

                            </div>

                        ))}

                        <div className="flex justify-end mt-4">

                            <h3 className="text-xl font-bold text-emerald-600">

                                Total ₹{order.totalAmount}

                            </h3>

                        </div>

                    </div>

                ))
            )}

        </div>

    );

}

export default Orders;