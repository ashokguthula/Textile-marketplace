import ProductCard from "../components/ProductCard";
import { useEffect, useState } from "react";
import API from "../api/api";
import ProductCardSkeleton from "../components/ProductCardSkeleton";



function Home() {
    const [products, setProducts] = useState([]);
    const [search, setSearch] = useState("");
    const [category, setCategory] = useState("All");
    const [loading, setLoading] = useState(true);


    useEffect(() => {

        const fetchProducts = async () => {

            setLoading(true);

            try {

                const { data } = await API.get("/products");

                setProducts(data.products);
                setLoading(false);

            } catch (error) {

                console.log(error);
                setLoading(false);

            }

        };

        fetchProducts();

    }, []);
    const filteredProducts = products.filter((product) => {

        const matchesSearch =
            product.title.toLowerCase().includes(search.toLowerCase());

        const matchesCategory =
            category === "All" || product.category === category;

        return matchesSearch && matchesCategory;

    });
    return (
        <>

            {/* Hero */}

            <section className="text-center py-16">

                <h1 className="text-5xl font-bold">

                    Premium Textile Marketplace

                </h1>

                <p className="text-gray-500 mt-5 text-lg">

                    Buy & Sell Quality Textile Products

                </p>

            </section>

            {/* Search */}

            <div className="max-w-xl mx-auto">

                <input
                    type="text"
                    placeholder="Search Products..."
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    className="w-full border rounded-xl p-4 shadow"
                />

            </div>

            {/* Categories */}

            <div className="flex flex-wrap justify-center gap-4 mt-10">

                {
                    [

                        "All",
                        "Cotton",
                        "Silk",
                        "Denim",
                        "Wool",
                        "Fabric"
                        
                    ].map((cat) => (

                        <button
                            key={cat}
                            onClick={() => setCategory(cat)}
                            className={`px-6 py-2 rounded-full transition ${
                                category === cat
                                    ? "bg-emerald-600 text-white"
                                    : "bg-white shadow hover:bg-emerald-600 hover:text-white"
                            }`}
                        >
                            {cat}
                        </button>
                    ))
                }

            </div>

            {/* Products */}

            <section className="mt-16">

                <h2 className="text-3xl font-bold mb-8">

                    Latest Products

                </h2>

                <div className="grid md:grid-cols-3 gap-8">

                    {
                        loading
                            ? Array.from({ length: 6 }).map((_, index) => (
                                <ProductCardSkeleton key={index} />
                            ))
                            : filteredProducts.map((product) => (
                                <ProductCard
                                    key={product._id}
                                    product={product}
                                />
                            ))
                    }

                </div>

            </section>

        </>

    );

}

export default Home;