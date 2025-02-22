import { useState, useEffect } from "react";
// import { toast } from "react-toastify";

const ProductCard = () => {

    const [products, setProducts] = useState([]);
    const URL = import.meta.env.VITE_BACKEND_URL;
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {

        const fetchProducts = async () => {
            setIsLoading(true);
            try {
                const response = await fetch(`${URL}/api/products`);
                const data = await response.json();
                setProducts(data);
            } catch (error) {
                console.log(error);
            }
            setIsLoading(false);
        };
        fetchProducts();
    }, []);

    return (
        <div>
            {isLoading && (
                <div className="flex items-center justify-center">
                    <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-gray-900"></div>
                </div>
            )}
            <div className="grid grid-cols-2 md:grid-cols-5 gap-4 p-9">

                {products ? products.map((product) => (
                    <div
                        key={product.product_id}
                        className="max-w-sm border rounded-lg p-4 bg-white cursor-pointer"
                        onClick={() => window.location.href = `/product/${product.product_id}`}
                    >
                        {/* Main Product Image */}
                        <div className="relative mb-4">
                            <img
                                src={product.image}
                                className="w-full h-48 object-cover rounded-md hover:scale-103 duration-200 ease-in-out"
                                alt={product.heading}
                            />
                        </div>

                        {/* Product Details */}
                        <div className="mb-4">
                            <h3 className="text-sm text-gray-800 mb-2 line-clamp-2">
                                {product.heading}
                            </h3>

                            {/* Price Section */}
                            <div className="flex items-baseline gap-2 mb-2">
                                <span className="text-lg font-bold">₹{product.price ? product.price.toLocaleString('en-IN') : 'N/A'}</span>
                                <span className="text-sm text-gray-500 line-through">M.R.P: ₹{product.mrp ? product.mrp.toLocaleString('en-IN') : 'N/A'}</span>
                                <span className="text-green-600">{product.mrp && product.price && (100 - Math.round((product.price / product.mrp) * 100))}% off</span>
                            </div>
                        </div>
                    </div>
                )) : <p>No products found</p>}
            </div>
        </div>
    );

};

export default ProductCard;