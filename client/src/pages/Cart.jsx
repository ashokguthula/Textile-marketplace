import { useEffect, useState } from "react";
import API from "../api/api";
import Loader from "../components/Loader";
import EmptyState from "../components/EmptyState";
import toast from "react-hot-toast";

function Cart() {

    const [cart, setCart] = useState([]);

    const [loading, setLoading] = useState(true);

    useEffect(() => {

        const fetchCart = async () => {

            try {

                const token = localStorage.getItem("token");

                const { data } = await API.get(
                    "/cart",
                    {
                        headers: {
                            Authorization: `Bearer ${token}`
                        }
                    }
                );

                setCart(data.cart);

            } catch (error) {

                console.log(error);

            } finally {

                setLoading(false);

            }

        };

        fetchCart();

    }, []);

    if (loading) {
    return <Loader />;
    }
    if (cart.length === 0) {
        return (
            <EmptyState
                title="Your Cart is Empty"
                description="Browse products and add your favorites."
                buttonText="Continue Shopping"
                buttonLink="/"
            />
        );
    }
    const updateQuantity = async (cartId, newQuantity) => {

        if (newQuantity < 1) return;

        try {

            const token = localStorage.getItem("token");

            await API.put(
                `/cart/${cartId}`,
                {
                    quantity: newQuantity
                },
                {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                }
            );

            setCart(

                cart.map(item =>

                    item._id === cartId

                        ? {
                            ...item,
                            quantity: newQuantity
                        }

                        : item

                )

            );

        } catch (error) {

            console.log(error);

        }

    };
    const removeItem = async (cartId) => {

        const confirmDelete = window.confirm(
            "Remove this item from your cart?"
        );

        if (!confirmDelete) return;

        try {

            const token = localStorage.getItem("token");

            await API.delete(
                `/cart/${cartId}`,
                {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                }
            );

            setCart(
                cart.filter(
                    item => item._id !== cartId
                )
            );

        } catch (error) {

            console.log(error);

        }

    };

    const total = cart.reduce(

        (sum, item) =>

            sum + item.product.price * item.quantity,

        0

    );
    const handleCheckout = async () => {

        try {

            const token = localStorage.getItem("token");

            const { data } = await API.post(
                "/orders",
                {},
                {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                }
            );

            toast.success(data.message);

            setCart([]);

        } catch (error) {

            console.log(error);

            toast.error(
                error.response?.data?.message ||
                "Checkout Failed"
            );

        }

    };


    return (

        <div className="grid md:grid-cols-3 gap-8">

            <div className="md:col-span-2 space-y-6">

                {
                cart.map((item) => (

                    <div
                        key={item._id}
                        className="flex items-center justify-between bg-white shadow rounded-xl p-4"
                    >

                        <div className="flex items-center gap-4">

                            <img
                                src={item.product.image}
                                alt={item.product.title}
                                className="w-28 h-28 object-cover rounded-lg"
                            />

                            <div>

                                <h2 className="text-xl font-bold">
                                    {item.product.title}
                                </h2>

                                <p className="text-gray-500">
                                    {item.product.category}
                                </p>

                                <p className="text-emerald-600 font-semibold mt-2">
                                    ₹{item.product.price}
                                </p>

                            </div>

                        </div>

                        <div className="text-center">

                            <p className="font-bold">
                                Qty
                            </p>

                            <div className="flex items-center gap-3">

                                <button

                                    onClick={() =>
                                        updateQuantity(
                                            item._id,
                                            item.quantity - 1
                                        )
                                    }

                                    className="bg-gray-200 px-3 py-1 rounded"

                                >
                                    -
                                </button>

                                <span className="font-bold">

                                    {item.quantity}

                                </span>

                                <button

                                    onClick={() =>
                                        updateQuantity(
                                            item._id,
                                            item.quantity + 1
                                        )
                                    }

                                    className="bg-emerald-600 text-white px-3 py-1 rounded"

                                >
                                    +
                                </button>

                            </div>
                            <button
                                onClick={() => removeItem(item._id)}
                                className="mt-3 bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700"
                            >
                                Remove
                            </button>

                        </div>

                    </div>

                ))
            }


            </div>

            <div>

                <div className="bg-white shadow rounded-xl p-6 sticky top-24">

                    <h2 className="text-2xl font-bold mb-6">

                        Cart Summary

                    </h2>

                    <div className="flex justify-between mb-4">

                        <span>

                            Items

                        </span>

                        <span>

                            {cart.length}

                        </span>

                    </div>

                    <div className="flex justify-between mb-4">

                        <span>

                            Delivery

                        </span>

                        <span className="text-green-600">

                            FREE

                        </span>

                    </div>

                    <hr className="my-4" />

                    <div className="flex justify-between text-xl font-bold">

                        <span>

                            Total

                        </span>

                        <span>

                            ₹{total}

                        </span>

                    </div>

                    <button
                        onClick={handleCheckout}
                        className="w-full mt-6 bg-emerald-600 text-white py-3 rounded-lg hover:bg-emerald-700"
                    >
                        Proceed to Checkout
                    </button>

                </div>

            </div>
        </div>

    );

}

export default Cart;