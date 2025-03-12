import { useEffect, useState } from 'react';
import useAuth from '../components/contexts/AuthContext';
import {
    Package,
    Users,
    Settings,
    LogOut,
    Search,
    Edit,
    Trash,
} from 'lucide-react';

// const Product = {
//     id: Number,
//     name: String,
//     brand: String,
//     image: String,
//     price: Number,
//     originalPrice: Number,
//     discount: Number,
//     status: ['Pending', 'processing', 'shipped', 'delivered', 'cancelled'],
//     orderId: String,
//     orderDate: String,
//     customer: String,
//     address: String,
// };



function AdminPage() {
    
    const { getAccessToken } = useAuth();
    const [selectedStatus, setSelectedStatus] = useState('all');
    const [searchTerm, setSearchTerm] = useState('');
    //   const [editingProduct, setEditingProduct] = useState(null);
    const URL = import.meta.env.VITE_BACKEND_URL;
    const [product, setProduct] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [orders, setOrders] = useState([]);
    const [users, setUsers] = useState([]);

    const products = product.map((product) => ({
        id: product.product_id,
        name: product.heading,
        brand: product.brand,
        image: product.image,
        price: product.price,
        originalPrice: product.mrp,
        discount: product.discount,
        status: orders.find((order) => order.product_id === product.product_id)?.order_status,
        orderId: orders.find((order) => order.product_id === product.product_id)?.order_id,
        orderDate: orders.find((order) => order.product_id === product.product_id)?.created_at,
        customer: users.find((user) => user.user_id === orders.find((order) => order.product_id === product.product_id)?.user_id)?.first_name,
        address: orders.find((order) => order.product_id === product.product_id)?.shipping_address,
    }));


    useEffect(() => {
        fetchOrders();
    }, []);

    useEffect(() => {
        fetchProducts();
    }, [orders]);



    const fetchProducts = async () => {
        setIsLoading(true);

        try {
            const promises = orders.map(async (order) => {
                const response = await fetch(`${URL}/api/products/${order.product_id}`);
                const data = await response.json();
                return data;
            });
            const data = await Promise.all(promises);
            setProduct(data);
        } catch (error) {
            console.log(error);
        } finally {
            setIsLoading(false);
        }
    };

    const fetchOrders = async () => {
        try {
            const response = await fetch(`${URL}/api/orders`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                }
            });

            const data = await response.json();
            setOrders(data);
        } catch (error) {
            console.error("Error fetching carts:", error); // Use console.error for errors
        }
    };

    const fetchUsers = async () => {
        setIsLoading(true);

        try {
            const promises = orders.map(async (order) => {
                const response = await fetch(`${URL}/api/user/${order.user_id}`, {
                    headers: {
                        'Content-Type': 'application/json',
                        Authorization: `Bearer ${getAccessToken()}`,
                    }
                });
                const data = await response.json();
                return data;
            });
            const data = await Promise.all(promises);
            setUsers(data);
        } catch (error) {
            console.log(error);
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        fetchUsers();
    }, [orders]);




    const filteredProducts = products.filter(product => {
        const matchesStatus = selectedStatus === 'all' || product.status === selectedStatus;
        const matchesSearch =
            product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
            product.orderId.toLowerCase().includes(searchTerm.toLowerCase()) ||
            product.customer.toLowerCase().includes(searchTerm.toLowerCase());
        return matchesStatus && matchesSearch;
    });

    const handleStatusChange = async (orderId, newStatus) => {

        try {
            const response = await fetch(`${URL}/api/order-status/${orderId}/${newStatus}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
            });

            const data = await response.json();
            console.log("data", data)
            window.location.reload();


        } catch (error) {
            console.log(error);
        }
    };



    return (


        <div className="min-h-screen bg-gray-100 flex">
            {/* Sidebar */}
            <aside className="w-64 bg-white shadow-md">
                <div className="p-4">
                    <h1 className="text-2xl font-bold text-orange-500">Admin Panel</h1>
                </div>
                <nav className="mt-8">
                    <a href="#" className="flex items-center px-4 py-3 bg-blue-50 text-orange-500">
                        <Package className="mr-3" />
                        Orders
                    </a>
                    <a href="#" className="flex items-center px-4 py-3 text-gray-600 hover:bg-gray-50">
                        <Users className="mr-3" />
                        Customers
                    </a>
                    <a href="#" className="flex items-center px-4 py-3 text-gray-600 hover:bg-gray-50">
                        <Settings className="mr-3" />
                        Settings
                    </a>
                    <a href="#" className="flex items-center px-4 py-3 text-gray-600 hover:bg-gray-50 mt-auto">
                        <LogOut className="mr-3" />
                        Logout
                    </a>
                </nav>
            </aside>



            {/* Main Content */}
            <main className="flex-1 p-8">



                <div className="mb-8 flex justify-between items-center">
                    <h2 className="text-2xl font-semibold">Orders Management</h2>
                    <div className="flex space-x-4">
                        <div className="relative">
                            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
                            <input
                                type="text"
                                placeholder="Search orders..."
                                className="pl-10 pr-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                            />
                        </div>
                        <select
                            className="px-4 py-2 border rounded-lg focus:outline-none focus:ring-1 cursor-pointer"
                            value={selectedStatus}
                            onChange={(e) => setSelectedStatus(e.target.value)}
                        >
                            <option value="all" >All Status</option>
                            <option value="pending">Pending</option>
                            <option value="processing">Processing</option>
                            <option value="shipped">Shipped</option>
                            <option value="out-for-delivery">Out For Delivery</option>
                            <option value="delivered">Delivered</option>
                            <option value="cancelled">Cancelled</option>
                        </select>
                    </div>
                </div>

                {/* Orders Table */}
                <div className="bg-white rounded-lg shadow-md overflow-hidden">
                    <table className="w-full">
                        <thead className="bg-gray-50">
                            <tr>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Order</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Customer</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Amount</th>
                                <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-200">
                            {filteredProducts.map((product) => (
                                <tr key={product.id} className="hover:bg-gray-50">
                                    <td className="px-6 py-4">
                                        <div className="flex items-center">
                                            <img src={product.image} alt={product.name} className="h-10 w-10 rounded-md object-cover" />
                                            <div className="ml-4">
                                                <div className="text-sm font-medium text-gray-900">{product.orderId}</div>
                                                <div className="text-sm text-gray-500">{product.name}</div>
                                            </div>
                                        </div>
                                    </td>
                                    <td className="px-6 py-4">
                                        <div className="text-sm text-gray-900">{product.customer}</div>
                                        <div className="text-sm text-gray-500">{product.address}</div>
                                    </td>
                                    <td className="px-6 py-4">
                                        <select
                                            className="text-sm rounded-full px-3 py-1 font-medium"
                                            style={{
                                                backgroundColor:
                                                    product.status === 'delivered' ? '#DEF7EC' :
                                                        product.status === 'shipped' ? '#E5EDFF' :
                                                            product.status === 'pending' ? '#FEF3C7' :
                                                                product.status === 'cancelled' ? '#FDE2E2' : '#E5EDFF',
                                                color:
                                                    product.status === 'delivered' ? '#03543F' :
                                                        product.status === 'shipped' ? '#1E3A8A' :
                                                            product.status === 'pending' ? '#92400E' :
                                                                product.status === 'cancelled' ? '#9B1C1C' : '#1E3A8A'
                                            }}
                                            value={product.status}
                                            onChange={(e) => handleStatusChange(product.orderId, e.currentTarget.value)}>
                                            <option value="pending">Pending</option>
                                            <option value="processing">Processing</option>
                                            <option value="shipped">Shipped</option>
                                            <option value="out-for-delivery">Out For Delivery</option>
                                            <option value="delivered">Delivered</option>
                                            <option value="cancelled">Cancelled</option>
                                        </select>
                                    </td>
                                    <td className="px-6 py-4 text-sm text-gray-500">{product.orderDate}</td>
                                    <td className="px-6 py-4 text-sm text-gray-900">₹{product.price}</td>
                                    <td className="px-6 py-4 text-right text-sm font-medium">
                                        <button className="text-blue-600 hover:text-blue-900 mr-3">
                                            <Edit size={18} />
                                        </button>
                                        <button className="text-red-600 hover:text-red-900">
                                            <Trash size={18} />
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>


            </main>

        </div>
    );
}

export default AdminPage;