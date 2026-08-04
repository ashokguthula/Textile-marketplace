import { Link } from "react-router-dom";

function NotFound() {

    return (

        <div className="flex flex-col items-center justify-center min-h-[70vh] text-center">

            <div className="text-8xl mb-6">
                🚫
            </div>

            <h1 className="text-6xl font-bold">
                404
            </h1>

            <p className="text-gray-500 mt-4 text-lg">
                Oops! The page you're looking for doesn't exist.
            </p>

            <Link
                to="/"
                className="mt-8 bg-emerald-600 text-white px-6 py-3 rounded-lg hover:bg-emerald-700 transition"
            >
                Back to Home
            </Link>

        </div>

    );

}

export default NotFound;