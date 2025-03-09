import { Search, ChevronRight, Loader } from 'lucide-react';
import useAuth from '../components/contexts/AuthContext';
import { useState, useEffect, useRef } from 'react';


function OrdersPage() {

    const URL = import.meta.env.VITE_BACKEND_URL;
    const { getAccessToken } = useAuth();
    const userId = JSON.parse(atob(getAccessToken().split('.')[1])).sub;
    const [orders, setOrders] = useState([]);
    const [products, setProducts] = useState([]);
    const searchInputRef = useRef(null);
    const [isLoading, setIsLoading] = useState(false);

    const handleSearch = () => {
        const searchQuery = searchInputRef.current.value.toLowerCase();
        const filteredProducts = products.filter(product => 

            product.products?.some(p => 
                p.product_name.toLowerCase().includes(searchQuery) || 
                p.description.toLowerCase().includes(searchQuery) || 
                p.heading.toLowerCase().includes(searchQuery) || 
                p.product_type.toLowerCase().includes(searchQuery) || 
                p.price.toLowerCase().includes(searchQuery)
            )
        );
        setProducts(filteredProducts);
        console.log(filteredProducts);
    };

    const fetchOrders = async () => {

        try {
            const response = await fetch(`${URL}/api/orders/${userId}`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                }
            });

            const data = await response.json();
            setOrders(data);
        }
        catch (error) {
            console.error("Error fetching carts:", error); // Use console.error for errors
        }

    };

    const fetchProducts = async () => {

        setIsLoading(true);
        try {

            const promises = orders.map(async (order) => {
                const response = await fetch(`${URL}/api/products/${order.product_id}`, {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                    }
                });
                const data = await response.json();
                return data;
            });

            setProducts(await Promise.all(promises));
            setIsLoading(false);
        }
        catch (error) {
            console.error("Error fetching products:", error); // Use console.error for errors
            setIsLoading(false);
        }
    };

    useEffect(() => {
        fetchOrders();
    }, []);

    useEffect(() => {
        fetchProducts();
    }, [orders]);


    return (
        <div className="min-h-screen bg-gray-50">

            {/* Breadcrumb */}
            <div className="max-w-7xl mx-auto px-4 py-4">
                <div className="flex items-center gap-2 text-sm text-gray-500">
                    <ChevronRight size={16} />
                    <span className="text-gray-900">My Orders</span>
                </div>
            </div>

            <div className="max-w-7xl mx-auto px-4">
                <div className="flex flex-col md:flex-row gap-6">

                    {/* Filters Sidebar */}
                    <div className="md:w-64 flex-shrink-0">
                        <div className="bg-white p-4 rounded-lg shadow-sm">
                            <h2 className="font-medium text-lg mb-4">Filters</h2>

                            {/* Order Status */}
                            <div className="mb-6">
                                <h3 className="font-medium mb-2">ORDER STATUS</h3>
                                <div className="space-y-2">
                                    {['On the way', 'Delivered', 'Cancelled', 'Returned'].map((status) => (
                                        <label key={status} className="flex items-center gap-2">
                                            <input type="checkbox" className="rounded border-gray-300" />
                                            <span className="text-gray-700">{status}</span>
                                        </label>
                                    ))}
                                </div>
                            </div>

                            {/* Order Time */}
                            <div>
                                <h3 className="font-medium mb-2">ORDER TIME</h3>
                                <div className="space-y-2">
                                    {['Last 30 days', '2024', '2023', '2022', '2021', 'Older'].map((time) => (
                                        <label key={time} className="flex items-center gap-2">
                                            <input type="checkbox" className="rounded border-gray-300" />
                                            <span className="text-gray-700">{time}</span>
                                        </label>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Main Content */}
                    <div className="flex-1">
                        {/* Search Bar */}
                        <div className="bg-white p-4 rounded-lg shadow-sm mb-4">
                            <div className="flex gap-2">
                                <div className="flex-1 relative">
                                    <input
                                        type="text"
                                        placeholder="Search your orders here"
                                        className="w-full pl-4 pr-10 py-2 border rounded-lg focus:outline-none"
                                        id="search-input"
                                        ref={searchInputRef}
                                        onChange={handleSearch}
                                    />
                                    <Search className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
                                </div>
                            </div>
                        </div>

                        {/* Orders List */}

                        {isLoading && (

                            <div className="flex items-center justify-center">
                                <Loader className="h-10 w-10 animate-spin rounded-full border-gray-900"></Loader>
                            </div>
                        )}

                        {!isLoading && (
                            <div className='space-y-4'>

                                {products.map((product) => (

                                    <div className="space-y-4" key={product.product_id}>

                                        <div className="bg-white rounded-lg shadow-sm overflow-hidden hover:shadow-md transition-shadow duration-300">

                                            <div className="p-4 cursor-pointer">
                                                <div className="flex items-start gap-4">
                                                    <img
                                                        src={product.image}
                                                        alt={product.heading}
                                                        className="w-24 h-24 object-cover rounded"
                                                    />
                                                    <div className="flex-1">
                                                        <div className="flex justify-between items-start">
                                                            <div>
                                                                <h3 className="font-medium">{product.heading}</h3>
                                                                <p className='text-gray-500 text-sm mt-1'>{product.description}</p>
                                                                <p className="text-gray-500 text-sm mt-1">₹{product.price}</p>
                                                            </div>
                                                            <div className="text-right">
                                                                <p className="text-sm text-gray-600 mt-1">Your item has been shipped.</p>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>



                                ))}

                            </div>

                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}

export default OrdersPage;