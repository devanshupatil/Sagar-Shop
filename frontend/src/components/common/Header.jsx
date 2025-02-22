import { Search, Heart, ShoppingCart, MoreHorizontal, Menu, X, User, ChevronRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useState } from 'react';
// import {  useAuth } from '../contexts/AuthContext';

const MainHeader = () => {
    // const { getAccessToken } = useAuth();
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    // const [isLoading, setIsLoading] = useState(false);

    const token = localStorage.getItem('sb-bnkirpzbgaxuikwgrmse-auth-token');

    const toggleMobileMenu = () => {
        setIsMobileMenuOpen(!isMobileMenuOpen);
    };

    // useEffect(() => {

    //     if (token) {
    //         setIsLoading(true);
    //     }


    //     setIsLoading(false);
    // }, [token]);

    return (
        <div className="px-4 py-3 flex flex-col md:flex-row items-center justify-between bg-gray-100">

            <div className="w-full flex items-center justify-between md:justify-start">
                <Link to="/" className="flex-shrink-0">
                    <h1 className="text-2xl font-serif font-bold text-orange-500 mr-0 md:mr-8 cursor-pointer duration-700 ease-in-out hover:text-orange-300">
                        Sagar Shop
                    </h1>
                </Link>

                {/* Mobile Menu Toggle */}
                <button
                    className="md:hidden text-gray-600 hover:text-orange-500"
                    onClick={toggleMobileMenu}
                >
                    {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
                </button>
            </div>

            {/* Search Bar */}
            <div className={`w-full max-w-xl flex md:pr-10 my-3 md:my-0 ${isMobileMenuOpen ? 'block' : 'hidden md:block'}`}>
                <div className="relative">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
                    <input
                        type="text"
                        placeholder="What are you looking for?"
                        className="w-full pl-10 pr-4 py-2 bg-gray-200 rounded-md focus:outline-none"
                    />
                </div>
            </div>

            {/* Right Side Actions */}
            <div className={`w-full flex flex-col md:flex-row items-center space-y-4 md:space-y-0 md:space-x-6 ${isMobileMenuOpen ? 'block' : 'hidden md:flex'}`}>

                <div className="flex w-full justify-between">

                    <Link to="/favourites" className="flex flex-col items-center cursor-pointer hover:text-orange-400 hover:underline hover:underline-offset-10">
                        <Heart className="h-6 w-6" />
                        <span className="text-600">Favourites</span>
                    </Link>
                    <Link to="/cart" className="flex flex-col items-center cursor-pointer hover:text-orange-400 hover:underline hover:underline-offset-10">
                        <ShoppingCart className="h-6 w-6" />
                        <span className="text-600">Cart</span>
                    </Link>

                    <Link to="/more" className="flex flex-col items-center cursor-pointer hover:text-orange-400 hover:underline hover:underline-offset-10">
                        <MoreHorizontal className="h-6 w-6" />
                        <span className="text-600">More</span>
                    </Link>

                    {token ? (

                        <div className="relative group w-full md:w-auto">

                            <div className="w-full md:w-auto flex items-center justify-center text-black px-6 py-2  hover:border-radius-90 cursor-pointer group">
                                <User className="h-6 w-6 mr-1" /> Devanshu <ChevronRight className="h-4 w-4 ml-1 rotate-90 group-hover:-rotate-90 transition-all duration-300 " />
                            </div>

                            <div className="hidden group-hover:block bg-white px-2 py-2 rounded-md shadow-md md:absolute top-10rem left-0  w-full z-1000">

                                <ul className="space-y-2 z-10">
                                    <li className="hover:text-orange-500 cursor-pointer"><Link to="/profile">Profile</Link></li>
                                    <li className="hover:text-orange-500 cursor-pointer"><Link to="/orders">Orders</Link></li>
                                    <li className="hover:text-orange-500 cursor-pointer"><Link to="/logout" onClick={() => localStorage.removeItem('sb-bnkirpzbgaxuikwgrmse-auth-token')}>Logout</Link></li>

                                </ul>
                            </div>


                        </div>




                    ) : (


                        <Link to="/login">
                            <button className="w-full md:w-auto flex items-center justify-center bg-orange-400 text-white px-6 py-2 rounded hover:bg-orange-500 cursor-pointer">
                                <User className="h-6 w-6 mr-2" />
                                Login
                            </button>
                        </Link>

                        // z- index

                    )}

                </div>
            </div>
        </div>
    );
};

const Header = () => {
    return (
        <header className="sticky top-0 z-50 bg-white">
            <MainHeader />
        </header>
    );
};

export default Header;