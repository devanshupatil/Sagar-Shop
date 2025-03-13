import { useEffect, useState } from 'react';
import { User, Phone, Mail, ShoppingBag, Heart, Loader, LogOut, ChevronRight, Camera, Edit2 } from 'lucide-react';
import useAuth from '../components/contexts/AuthContext';
import { toast } from 'react-hot-toast';

function ProfilePage() {
    const [activeTab, setActiveTab] = useState('profile');
    const { getAccessToken } = useAuth();
    const userId = JSON.parse(atob(getAccessToken().split('.')[1])).sub;
    const URL = import.meta.env.VITE_BACKEND_URL;
    const [user, setUser] = useState({});
    const [isLoading, setIsLoading] = useState(false);
    const [isProfileEdit, setIsProfileEdit] = useState(false);
    const [isAddressEdit, setIsAddressEdit] = useState(false);
    const [userAddress, setUserAddress] = useState('');
    const [userCity, setUserCity] = useState('');
    const [userState, setUserState] = useState('');
    const [userPincode, setUserPincode] = useState('');
    const [userCountry, setUserCountry] = useState('');
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [email, setEmail] = useState('');
    const [phoneNumber, setPhoneNumber] = useState('');

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
            setFirstName(data.first_name);
            setLastName(data.last_name);
            setEmail(data.user_email);
            setPhoneNumber(data.phone_number);
            setUserAddress(data.address);
            setUserCity(data.city);
            setUserState(data.state);
            setUserPincode(data.pincode);
            setUserCountry(data.country);
            setFirstName(data.first_name);
            setLastName(data.last_name);
            setEmail(data.user_email);
            setPhoneNumber(data.phone_number);

        } catch (error) {
            console.log(error)
        }
        finally {
            setIsLoading(false);
        }
    }

    useEffect(() => {
        fetchUser()
    }, [])

    const handleProfileEdit = async () => {

        try {
            if (!userId || !firstName || !lastName || !email || !phoneNumber) {
                throw new Error('Invalid ID');
            }

            const response = await fetch(`${URL}/api/user/${userId}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${getAccessToken()}`
                },
                body: JSON.stringify({

                    userId: userId,
                    firstName: firstName,
                    lastName: lastName,
                    email: email,
                    phoneNumber: phoneNumber
                })
            });
            const data = await response.json();
            setUser(data);
            window.location.reload();

        } catch (error) {
            console.log(error)
            toast.error('Failed to update profile');
        }
        finally {
            setIsProfileEdit(false);
        }
    }

    const handleAddressEdit = async () => {
        try {

            const response = await fetch(`${URL}/api/users/shipping-details/${userId}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${getAccessToken()}`
                },
                body: JSON.stringify({
                    userId: userId,
                    address: userAddress,
                    city: userCity,
                    state: userState,
                    pincode: userPincode,
                    country: userCountry
                })
            });
            const data = await response.json();
            setUser(data);
            window.location.reload();


        } catch (error) {
            console.log(error)
            toast.error('Failed to update shipping details');
        }
        finally {
            setIsAddressEdit(false);
        }
    }

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
                                        <h2 className="font-semibold text-gray-900">{user.first_name} {user.last_name}</h2>
                                        <p className="text-sm text-gray-600">+91 {user.phone_number}</p>
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
                                {!isProfileEdit ? (
                                    <div className="bg-white rounded-lg shadow-sm overflow-hidden">
                                        <div className="p-6 border-b border-gray-100 flex justify-between items-center">
                                            <h2 className="text-xl font-semibold text-gray-900">Personal Information</h2>
                                            <button className="text-[#2874f0] flex items-center space-x-1 cursor-pointer">
                                                <Edit2 className="w-4 h-4" />
                                                <span onClick={() => setIsProfileEdit(true)}>Edit</span>
                                            </button>
                                        </div>
                                        <div className="p-6 space-y-6">
                                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                                <div className="space-y-2">
                                                    <label className="block text-sm font-medium text-gray-600">
                                                        Full Name
                                                    </label>
                                                    <div className="p-3 bg-gray-100 rounded-lg text-gray-900">
                                                        {user.first_name} {user.last_name}
                                                    </div>
                                                </div>
                                                <div className="space-y-2">
                                                    <label className="block text-sm font-medium text-gray-600 flex items-center space-x-1 gap-1">
                                                        Email Address
                                                        <Mail className="w-4 h-4" />
                                                    </label>
                                                    <div className="p-3 bg-gray-100 rounded-lg text-gray-900">
                                                        {user.user_email}
                                                    </div>
                                                </div>
                                                <div className="space-y-2">
                                                    <label className="block text-sm font-medium text-gray-600 flex items-center space-x-1 gap-1">
                                                        Phone Number
                                                        <Phone className="w-4 h-4" />
                                                    </label>
                                                    <div className="p-3 bg-gray-100 rounded-lg text-gray-900">
                                                        +91 {user.phone_number}
                                                    </div>
                                                </div>
                                            </div>



                                        </div>
                                    </div>
                                ) : (

                                    <div className="bg-white rounded-lg shadow-sm overflow-hidden">
                                        <div className="p-6 border-b border-gray-100 flex justify-between items-center">
                                            <h2 className="text-xl font-semibold text-gray-900">Personal Information</h2>
                                            <button className="text-[#2874f0] flex items-center space-x-1 cursor-pointer">
                                                <Edit2 className="w-4 h-4" />
                                                <span onClick={() => handleProfileEdit()}>Save</span>
                                            </button>
                                        </div>
                                        <div className="p-6 space-y-6">
                                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                                <div className="space-y-2">
                                                    <label className="block text-sm font-medium text-gray-700">
                                                        First Name
                                                    </label>
                                                    <input
                                                        value={firstName}
                                                        onChange={e => setFirstName(e.target.value)}
                                                        className="shadow-sm w-full px-4 py-2 bg-white border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-200"
                                                        type="text"
                                                        placeholder={user.first_name} />
                                                </div>
                                                <div className="space-y-2">
                                                    <label className="block text-sm font-medium text-gray-700">
                                                        Last Name
                                                    </label>
                                                    <input
                                                        value={lastName}
                                                        onChange={e => setLastName(e.target.value)}
                                                        className="shadow-sm w-full px-4 py-2 bg-white border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-200"
                                                        type="text"
                                                        placeholder={user.last_name} />
                                                </div>
                                                <div className="space-y-2">
                                                    <label className="block text-sm font-medium text-gray-700">
                                                        Email
                                                    </label>
                                                    <input
                                                        value={email}
                                                        onChange={e => setEmail(e.target.value)}
                                                        className="shadow-sm w-full px-4 py-2 bg-white border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-200"
                                                        type="text"
                                                        placeholder={user.user_email} />
                                                </div>
                                                <div className="space-y-2">
                                                    <label className="block text-sm font-medium text-gray-700">
                                                        Phone Number
                                                    </label>
                                                    <input
                                                        value={phoneNumber}
                                                        onChange={e => setPhoneNumber(e.target.value)}
                                                        className="shadow-sm w-full px-4 py-2 bg-white border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-200"
                                                        type="number"
                                                        placeholder={user.phone_number} />
                                                </div>

                                            </div>
                                        </div>
                                    </div>





                                )}

                                <div className="bg-white rounded-lg shadow-sm overflow-hidden mt-2">

                                    {!isAddressEdit ? (

                                        <div className="pt-4 border-t border-gray-100">

                                            <div className="p-6 border-b border-gray-100 flex justify-between items-center">
                                                <div className="flex items-center space-x-2">

                                                    <h2 className="text-xl font-semibold text-gray-900">My Addresses</h2>
                                                </div>
                                                <button className="text-[#2874f0] flex items-center space-x-1 cursor-pointer">
                                                    <Edit2 className="w-4 h-4" />
                                                    <span onClick={() => setIsAddressEdit(true)}>Edit</span>
                                                </button>
                                            </div>

                                            <div className="p-6 space-y-6">
                                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                                    <div className="space-y-2">
                                                        <h4 className="font-medium text-gray-900">Address</h4>
                                                        <p className="p-3 bg-gray-100 rounded-lg text-gray-900">{user.address}</p>
                                                    </div>
                                                    <div className="space-y-2">
                                                        <h4 className="font-medium text-gray-900">City</h4>
                                                        <p className="p-3 bg-gray-100 rounded-lg text-gray-900">{user.city}</p>
                                                    </div>
                                                    <div className="space-y-2">
                                                        <h4 className="font-medium text-gray-900">State</h4>
                                                        <p className="p-3 bg-gray-100 rounded-lg text-gray-900">{user.state}</p>
                                                    </div>
                                                    <div className="space-y-2">
                                                        <h4 className="font-medium text-gray-900">Pincode</h4>
                                                        <p className="p-3 bg-gray-100 rounded-lg text-gray-900">{user.pincode}</p>
                                                    </div>
                                                    <div className="space-y-2">
                                                        <h4 className="font-medium text-gray-900">Country</h4>
                                                        <p className="p-3 bg-gray-100 rounded-lg text-gray-900">{user.country}</p>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    ) : (
                                        <div className="pt-4 border-t border-gray-100">

                                            <div className="p-6 border-b border-gray-100 flex justify-between items-center">
                                                <div className="flex items-center space-x-2">

                                                    <h2 className="text-xl font-semibold text-gray-900">My Addresses</h2>
                                                </div>
                                                <button className="text-[#2874f0] flex items-center space-x-1 cursor-pointer">
                                                    <Edit2 className="w-4 h-4" />
                                                    <span onClick={() => handleAddressEdit()}>Save</span>
                                                </button>
                                            </div>

                                            <div className="p-6 space-y-6">
                                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                                    <div className="space-y-2">
                                                        <label className="block text-sm font-medium text-gray-700">
                                                            Address
                                                        </label>
                                                        <input
                                                            value={userAddress}
                                                            onChange={e => setUserAddress(e.target.value)}
                                                            className="shadow-sm w-full px-4 py-2 bg-white border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-200"
                                                            type="text"
                                                            placeholder={user.address} />
                                                    </div>
                                                    <div className="space-y-2">
                                                        <label className="block text-sm font-medium text-gray-700">
                                                            City
                                                        </label>
                                                        <input
                                                            value={userCity}
                                                            onChange={e => setUserCity(e.target.value)}
                                                            className="shadow-sm w-full px-4 py-2 bg-white border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-200"
                                                            type="text"
                                                            placeholder={user.city} />
                                                    </div>
                                                    <div className="space-y-2">
                                                        <label className="block text-sm font-medium text-gray-700">
                                                            State
                                                        </label>
                                                        <input
                                                            value={userState}
                                                            onChange={e => setUserState(e.target.value)}
                                                            className="shadow-sm w-full px-4 py-2 bg-white border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-200"
                                                            type="text"
                                                            placeholder={user.state} />
                                                    </div>
                                                    <div className="space-y-2">
                                                        <label className="block text-sm font-medium text-gray-700">
                                                            Pincode
                                                        </label>
                                                        <input
                                                            value={userPincode}
                                                            onChange={e => setUserPincode(e.target.value)}
                                                            className="shadow-sm w-full px-4 py-2 bg-white border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-200"
                                                            type="number"
                                                            placeholder={user.pincode} />
                                                    </div>

                                                    <div className="space-y-2">
                                                        <label className="block text-sm font-medium text-gray-700">
                                                            Country
                                                        </label>
                                                        <input
                                                            value={userCountry}
                                                            onChange={e => setUserCountry(e.target.value)}
                                                            className="shadow-sm w-full px-4 py-2 bg-white border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-200"
                                                            type="text"
                                                            placeholder={user.country} />
                                                    </div>

                                                </div>
                                            </div>
                                        </div>
                                    )}
                                </div>


                            </div>
                        )}
                </div>
            </div>
        </div>
    );
}

export default ProfilePage;