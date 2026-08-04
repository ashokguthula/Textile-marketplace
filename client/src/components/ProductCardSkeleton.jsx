function ProductCardSkeleton() {
    return (
        <div className="bg-white rounded-xl shadow overflow-hidden animate-pulse">

            <div className="w-full h-56 bg-gray-300"></div>

            <div className="p-4">

                <div className="h-6 bg-gray-300 rounded w-3/4 mb-4"></div>

                <div className="h-4 bg-gray-300 rounded w-1/3 mb-6"></div>

                <div className="h-10 bg-gray-300 rounded w-1/2"></div>

            </div>

        </div>
    );
}

export default ProductCardSkeleton;