import { Link, useNavigate } from "react-router-dom";
function Navbar() {
    const navigate = useNavigate();

    const user = JSON.parse(localStorage.getItem("user"));

    const handleLogout = () => {

        localStorage.removeItem("token");
        localStorage.removeItem("user");

        navigate("/login");

    };
    return (

        <nav className="bg-white shadow">

            <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">

                <Link
                    to="/"
                    className="text-2xl font-bold text-emerald-600">
                    Textile Marketplace
                </Link>               

                <div className="flex gap-6 items-center">

                    <Link to="/">
                        Home
                    </Link>

                    {!user && (
                        <>
                            <Link to="/login">
                                Login
                            </Link>

                            <Link to="/register">
                                Register
                            </Link>
                        </>
                    )}
                    {user?.role === "buyer" && (
                        <Link to="/cart">Cart</Link>
                    )}

                    {user?.role === "buyer" && (

                        <Link
                            to="/orders"
                            className="hover:text-emerald-600"
                        >
                            My Orders
                        </Link>
                    )}

                    {user?.role === "supplier" && (
                        <>
                            <Link to="/add-product">
                                Sell
                            </Link>

                            <Link to="/dashboard">
                                Dashboard
                            </Link>
                        </>
                    )}

                    {user?.role === "buyer" && (
                        <Link to="/buyer-dashboard">
                            Dashboard
                        </Link>
                    )}

                    {user && (
                        <button
                            onClick={handleLogout}
                            className="text-red-600 hover:text-red-700"
                        >
                            Logout
                        </button>
                    )}

                </div>

            </div>

        </nav>

    );
}

export default Navbar;