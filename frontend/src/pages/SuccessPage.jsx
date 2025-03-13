import { useEffect, useState } from 'react';
import { CheckCircle2} from 'lucide-react';
import { useParams } from 'react-router-dom';
import useAuth from '../components/contexts/AuthContext';

function App() {
    const { productId, orderId } = useParams();
    const [showAnimation, setShowAnimation] = useState(false);
    const [product, setProduct] = useState({});
    const URL = import.meta.env.VITE_BACKEND_URL;
    const { getAccessToken } = useAuth();
    const userId = JSON.parse(atob(getAccessToken().split('.')[1])).sub;
    const [transactionId, setTransactionId] = useState('');
    const [user, setUser] = useState('');

    const fetchUser = async () => {

        try {
            const response = await fetch(`${URL}/api/user/${userId}`, {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${getAccessToken()}`
                }
            });
            const data = await response.json();
            setUser(data);


        } catch (error) {
            console.log(error)
        }

    }

    useEffect(() => {
        fetchUser();
    }, []);

    const fetchProductData = async () => {

        try {
            const response = await fetch(`${URL}/api/products/${productId}`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                }
            })
            const data = await response.json();
            setProduct(data);

        }
        catch (error) {
            console.error('Error fetching products:', error);
        }
    }

    const fetchTransactionData = async () => {

        try {
            const response = await fetch(`${URL}/api/order/${userId}/${orderId}`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                }
            })
            const data = await response.json();
            setTransactionId(data[0].transaction_id)
        }
        catch (error) {
            console.error('Error fetching transaction:', error);
        }
    }

    useEffect(() => {
        fetchProductData();
        fetchTransactionData();
        setShowAnimation(true);
    }, []);


    return (
        <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
            <div className="max-w-2xl mx-auto space-y-4">
                {/* Success Card */}
                <div className="bg-white rounded-lg shadow-sm overflow-hidden">
                    <div className="bg-orange-500 text-white p-6 text-center">
                        <div className={`transform transition-transform duration-1000 ${showAnimation ? 'scale-100' : 'scale-0'}`}>
                            <CheckCircle2 className="w-16 h-16 mx-auto mb-4" />
                            <h1 className="text-2xl font-bold">Payment Successful!</h1>
                            <p className="text-white/80 mt-2">Transaction ID: {transactionId}</p>
                        </div>
                    </div>

                    <div className="p-6 space-y-6">
                        {/* Amount Details */}
                        <div className="text-center">
                            <p className="text-gray-600">Amount Paid</p>
                            <p className="text-3xl font-bold text-gray-900">₹{product.price}</p>
                        </div>

                        {/* Order Details */}

                        <div className="space-y-4">
                            <h2 className="font-semibold text-gray-900">Order Details</h2>
                            <div onClick={() => window.location.href = `/product/${productId}`} className="flex items-center space-x-4 bg-gray-50 p-4 rounded-lg">
                                <img
                                    src={product.image}
                                    alt={product.heading}
                                    className="w-16 h-16 object-cover rounded cursor-pointer hover:scale-105 transition-all duration-300"
                                />
                                <div className="flex-1">
                                    <h3 className="cursor-pointer font-medium text-gray-900 hover:text-gray-600">{product.heading}</h3>
                                    <p className="cursor-pointer text-sm text-gray-600">{product.description}</p>
                                </div>
                            </div>
                        </div>

                        {/* Delivery Details */}
                        <div className="space-y-4">
                            <h2 className="font-semibold text-gray-900">Delivery Details</h2>
                            <div className="bg-gray-50 p-4 rounded-lg">
                                <p className="font-medium text-gray-900">{user.first_name} {user.last_name}</p>
                                <p className="text-gray-600 mt-1">
                                    {user.address}, {user.city}, {user.state} - {user.pincode}
                                </p>
                                <p className="text-gray-600 mt-1">Phone: {user.phone_number}</p>

                            </div>
                        </div>

                    </div>
                </div>

                {/* Continue Shopping */}
                <div className="text-center">
                    <button
                        className="cursor-pointer text-orange-500 font-medium hover:underline"
                        onClick={() => window.location.href = '/'}
                    >
                        Continue Shopping

                    </button>
                </div>
            </div>
        </div>
    );
}

export default App;