import { useEffect, useState } from 'react';
import { User, MapPin, Phone, Mail, ShoppingBag, Heart,Loader, LogOut, ChevronRight, Camera, Edit2 } from 'lucide-react';
import useAuth from '../components/contexts/AuthContext';

function ProfilePage() {
    const [activeTab, setActiveTab] = useState('profile');
    const { getAccessToken } = useAuth();
    const userId = JSON.parse(atob(getAccessToken().split('.')[1])).sub;
    const URL = import.meta.env.VITE_BACKEND_URL;
    const [user, setUser] = useState({});
    const [isLoading, setIsLoading] = useState(false);

    const fetchUser = async () => {

        setIsLoading(true);

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
        finally{
            setIsLoading(false);
        }
    }

    useEffect(() => {
        fetchUser()
    }, [])


    return (
        <div className="min-h-screen bg-gray-50">

            <div className="max-w-6xl mx-auto px-4 py-6">

                <div className="flex flex-col md:flex-row gap-6">
                    {/* Sidebar */}

                    <div className="w-full md:w-1/4">
                        <div className="bg-white rounded-lg shadow-sm overflow-hidden">
                            {/* Profile Summary */}
                            <div className="p-6 border-b border-gray-100">
                                <div className="flex items-center space-x-4">
                                    <div className="relative">
                                        <div className="w-16 h-16 rounded-full bg-gray-200 flex items-center justify-center overflow-hidden">
                                            <img
                                                src="https://images.unsplash.com/photo-1633332755192-727a05c4013d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1180&q=80"
                                                alt="Profile"
                                                className="w-full h-full object-cover"
                                            />
                                        </div>
                                        <button className="cursor-pointer absolute bottom-0 right-0 bg-orange-500 text-white p-1 rounded-full">
                                            <Camera className="w-3 h-3" />
                                        </button>
                                    </div>
                                    <div>
                                        <h2 className="font-semibold text-gray-900">Devanshu Patil</h2>
                                        <p className="text-sm text-gray-600">+91 7397927021</p>
                                    </div>
                                </div>
                            </div>

                            {/* Navigation */}
                            <nav className="p-2">
                                <ul className="space-y-1">
                                    <li>
                                        <button
                                            onClick={() => setActiveTab('profile')}
                                            className={`cursor-pointer w-full flex items-center justify-between p-3 rounded-lg ${activeTab === 'profile' ? 'bg-blue-50 text-orange-500' : 'text-gray-700 hover:bg-gray-100'}`}
                                        >
                                            <div className="flex items-center space-x-3">
                                                <User className="w-5 h-5" />
                                                <span>My Profile</span>
                                            </div>
                                            <ChevronRight className="w-4 h-4" />
                                        </button>
                                    </li>
                                    <li>
                                        <button
                                            onClick={() => setActiveTab('addresses')}
                                            className={`cursor-pointer  w-full flex items-center justify-between p-3 rounded-lg ${activeTab === 'addresses' ? 'bg-blue-50 text-orange-500' : 'text-gray-700 hover:bg-gray-100'}`}
                                        >
                                            <div className="flex items-center space-x-3">
                                                <MapPin className="w-5 h-5" />
                                                <span>Addresses</span>
                                            </div>
                                            <ChevronRight className="w-4 h-4" />
                                        </button>
                                    </li>
                                    <li>
                                        <button
                                            onClick={() => window.location.href = '/orders'}
                                            className={`cursor-pointer  w-full flex items-center justify-between p-3 rounded-lg ${activeTab === 'orders' ? 'bg-blue-50 text-orange-500' : 'text-gray-700 hover:bg-gray-100'}`}
                                        >
                                            <div className="flex items-center space-x-3">
                                                <ShoppingBag className="w-5 h-5" />
                                                <span>My Orders</span>
                                            </div>
                                            <ChevronRight className="w-4 h-4" />
                                        </button>
                                    </li>
                                    <li>
                                        <button
                                            onClick={() => window.location.href = '/favourites'}
                                            className={`cursor-pointer w-full flex items-center justify-between p-3 rounded-lg ${activeTab === 'wishlist' ? 'bg-blue-50 text-orange-500' : 'text-gray-700 hover:bg-gray-100'}`}
                                        >
                                            <div className="flex items-center space-x-3">
                                                <Heart className="w-5 h-5" />
                                                <span>Wishlist</span>
                                            </div>
                                            <ChevronRight className="w-4 h-4" />
                                        </button>
                                    </li>
                                    {/* <li>
                                        <button
                                            onClick={() => setActiveTab('payments')}
                                            className={`w-full flex items-center justify-between p-3 rounded-lg ${activeTab === 'payments' ? 'bg-blue-50 text-orange-500' : 'text-gray-700 hover:bg-gray-50'}`}
                                        >
                                            <div className="flex items-center space-x-3">
                                                <CreditCard className="w-5 h-5" />
                                                <span>Saved Payments</span>
                                            </div>
                                            <ChevronRight className="w-4 h-4" />
                                        </button>
                                    </li> */}
                                </ul>
                                <div className="mt-6 pt-4 border-t border-gray-100">
                                    <button
                                        onClick={() => {
                                            localStorage.removeItem('sb-bnkirpzbgaxuikwgrmse-auth-token');
                                            window.location.href = '/login';
                                        }}
                                        className="cursor-pointer w-full flex items-center space-x-3 p-3 text-red-500 hover:bg-red-50 rounded-lg">
                                        <LogOut className="w-5 h-5" />
                                        <span>Logout</span>
                                    </button>
                                </div>
                            </nav>
                        </div>
                    </div>

                    {
                        isLoading ? (
                            <div className="flex justify-center items-center pl-90">
                                <Loader className="animate-spin w-10 h-10 text-gray-500" />
                            </div>
                        ) : (
                            <div className="w-full md:w-3/4">
                                {activeTab === 'profile' && (
                                    <div className="bg-white rounded-lg shadow-sm overflow-hidden">
                                        <div className="p-6 border-b border-gray-100 flex justify-between items-center">
                                    <h2 className="text-xl font-semibold text-gray-900">Personal Information</h2>
                                    <button className="text-[#2874f0] flex items-center space-x-1">
                                        <Edit2 className="w-4 h-4" />
                                        <span>Edit</span>
                                    </button>
                                </div>
                                <div className="p-6 space-y-6">
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                        <div>
                                            <label className="block text-sm font-medium text-gray-600 mb-1">Full Name</label>
                                            <div className="p-3 bg-gray-50 rounded-lg text-gray-900">{user.first_name} {user.last_name}</div>
                                        </div>
                                        <div>
                                            <label className="block text-sm font-medium text-gray-600 mb-1">Email Address</label>
                                            <div className="p-3 bg-gray-50 rounded-lg text-gray-900">{user.user_email}</div>
                                        </div>
                                        <div>
                                            <label className="block text-sm font-medium text-gray-600 mb-1">Phone Number</label>
                                            <div className="p-3 bg-gray-50 rounded-lg text-gray-900">+91 {user.phone_number}</div>
                                        </div>
                                    </div>

                                    <div className="pt-4 border-t border-gray-100">
                                        <h3 className="text-lg font-semibold text-gray-900 mb-4">Account Security</h3>
                                        <div className="space-y-4">
                                            <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                                                <div>
                                                    <h4 className="font-medium text-gray-900">Password</h4>
                                                    <p className="text-sm text-gray-600">Last changed 3 months ago</p>
                                                </div>
                                                <button className="text-[#2874f0]">Change</button>
                                            </div>
                                            <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                                                <div>
                                                    <h4 className="font-medium text-gray-900">Two-Factor Authentication</h4>
                                                    <p className="text-sm text-gray-600">Not enabled</p>
                                                </div>
                                                <button className="text-[#2874f0]">Enable</button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        )}

                        {activeTab === 'addresses' && (
                            <div className="bg-white rounded-lg shadow-sm overflow-hidden">
                                <div className="p-6 border-b border-gray-100 flex justify-between items-center">
                                    <h2 className="text-xl font-semibold text-gray-900">My Addresses</h2>
                                    <button className="bg-[#2874f0] text-white px-4 py-2 rounded-lg hover:bg-[#2264d1] transition-colors">
                                        + Add New Address
                                    </button>
                                </div>
                                <div className="p-6 space-y-4">
                                    <div className="border border-gray-200 rounded-lg p-4 relative hover:border-[#2874f0] transition-colors">
                                        <div className="absolute top-4 right-4 bg-gray-100 text-gray-700 text-xs px-2 py-1 rounded">
                                            HOME
                                        </div>
                                        <h3 className="font-medium text-gray-900">Devanshu Patil</h3>
                                        <p className="text-gray-600 mt-1">
                                            Near Government hospital, Buldana District, Maharashtra - 443103
                                        </p>
                                        <p className="text-gray-600 mt-1">Phone: +917397927021</p>
                                        <div className="mt-4 pt-4 border-t border-gray-100 flex space-x-4">
                                            <button className="text-[#2874f0]">Edit</button>
                                            <button className="text-red-500">Delete</button>
                                        </div>
                                    </div>

                                </div>
                            </div>
                        )}


                        {/* {activeTab === 'payments' && (
                            <div className="bg-white rounded-lg shadow-sm overflow-hidden">
                                <div className="p-6 border-b border-gray-100 flex justify-between items-center">
                                    <h2 className="text-xl font-semibold text-gray-900">Saved Payment Methods</h2>
                                    <button className="bg-[#2874f0] text-white px-4 py-2 rounded-lg hover:bg-[#2264d1] transition-colors">
                                        + Add New Card
                                    </button>
                                </div>
                                <div className="p-6 space-y-4">
                                    <div className="border border-gray-200 rounded-lg p-4 relative hover:border-[#2874f0] transition-colors">
                                        <div className="flex items-center space-x-3">
                                            <div className="w-10 h-6 bg-blue-600 rounded"></div>
                                            <div>
                                                <h3 className="font-medium text-gray-900">HDFC Bank Debit Card</h3>
                                                <p className="text-gray-600">**** **** **** 4567</p>
                                            </div>
                                        </div>
                                        <div className="mt-4 pt-4 border-t border-gray-100 flex space-x-4">
                                            <button className="text-red-500">Remove</button>
                                        </div>
                                    </div>

                                    <div className="border border-gray-200 rounded-lg p-4 relative hover:border-[#2874f0] transition-colors">
                                        <div className="flex items-center space-x-3">
                                            <div className="w-10 h-6 bg-green-600 rounded"></div>
                                            <div>
                                                <h3 className="font-medium text-gray-900">ICICI Credit Card</h3>
                                                <p className="text-gray-600">**** **** **** 8901</p>
                                            </div>
                                        </div>
                                        <div className="mt-4 pt-4 border-t border-gray-100 flex space-x-4">
                                            <button className="text-red-500">Remove</button>
                                        </div>
                                    </div>

                                    <div className="border border-gray-200 rounded-lg p-4 relative hover:border-[#2874f0] transition-colors">
                                        <div className="flex items-center space-x-3">
                                            <div className="w-10 h-6 flex items-center justify-center bg-blue-50 rounded">
                                                <Phone className="w-4 h-4 text-[#2874f0]" />
                                            </div>
                                            <div>
                                                <h3 className="font-medium text-gray-900">PhonePe UPI</h3>
                                                <p className="text-gray-600">7397927021@upi</p>
                                            </div>
                                        </div>
                                        <div className="mt-4 pt-4 border-t border-gray-100 flex space-x-4">
                                            <button className="text-red-500">Remove</button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        )} */}
                    </div>
                        )}
                </div>
            </div>
        </div>
    );
}

export default ProfilePage;