import { Link } from "react-router-dom";

function EmptyState({
    title,
    description,
    buttonText,
    buttonLink
}) {
    return (

        <div className="flex flex-col items-center justify-center py-20 text-center">

            <div className="text-7xl mb-6">
                📦
            </div>

            <h2 className="text-3xl font-bold">
                {title}
            </h2>

            <p className="text-gray-500 mt-3 max-w-md">
                {description}
            </p>

            {
                buttonText && (

                    <Link
                        to={buttonLink}
                        className="mt-8 bg-emerald-600 text-white px-6 py-3 rounded-lg hover:bg-emerald-700 transition"
                    >
                        {buttonText}
                    </Link>

                )
            }

        </div>

    );
}

export default EmptyState;