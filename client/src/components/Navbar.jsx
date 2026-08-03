import { Link } from "react-router-dom";

function Navbar() {
    return (

        <nav className="bg-white shadow">

            <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">

                <Link
                    to="/"
                    className="text-2xl font-bold text-emerald-600">
                    Textile Marketplace
                </Link>

                <div className="flex gap-6">

                    <Link to="/">
                        Home
                    </Link>

                    <Link to="/login">
                        Login
                    </Link>

                    <Link to="/register">
                        Register
                    </Link>

                    <Link to="/add-product">
                        Sell
                    </Link>
                    <Link
                        to="/dashboard"
                        className="hover:text-emerald-600">
                        Dashboard
                    </Link>
                   

                </div>

            </div>

        </nav>

    );
}

export default Navbar;