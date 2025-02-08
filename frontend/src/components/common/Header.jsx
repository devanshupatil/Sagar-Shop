import { Search, Heart, ShoppingBag, MoreHorizontal, Menu, X } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useState } from 'react';

const MainHeader = () => {
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

    const toggleMobileMenu = () => {
        setIsMobileMenuOpen(!isMobileMenuOpen);
    };

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
                <button className="w-full md:w-auto text-center bg-orange-400 text-white px-6 py-2 rounded hover:bg-orange-500 cursor-pointer">
                    SIGN UP / SIGN IN
                </button>
                
                <div className="flex w-full md:w-auto justify-between space-x-6">
                    
                    <div className="flex flex-col items-center cursor-pointer hover:text-orange-400 hover:underline hover:underline-offset-10">
                        <Heart className="h-6 w-6" />
                        <span className="text-xs">Favourites</span>
                    </div>
                    <div className="flex flex-col items-center cursor-pointer hover:text-orange-400 hover:underline hover:underline-offset-10">
                        <ShoppingBag className="h-6 w-6" />
                        <span className="text-xs">Basket</span>
                    </div>
                    <div className="flex flex-col items-center cursor-pointer hover:text-orange-400 hover:underline hover:underline-offset-10">
                        <MoreHorizontal className="h-6 w-6" />
                        <span className="text-xs">More</span>
                    </div>
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