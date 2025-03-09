import { Search, Heart, ShoppingCart,  Menu, X, User, ChevronRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { useRef } from 'react';


const MainHeader = () => {

    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const token = localStorage.getItem('sb-bnkirpzbgaxuikwgrmse-auth-token');
    const searchInputRef = useRef(null);
    const [products, setProducts] = useState([]);
    const URL = import.meta.env.VITE_BACKEND_URL;


    const toggleMobileMenu = () => {
        setIsMobileMenuOpen(!isMobileMenuOpen);
    };


    const handleSearch = () => {

        const searchQuery = searchInputRef.current.value.toLowerCase();
        const filteredItems = products.filter(item => item.product_type.toLowerCase().includes(searchQuery) || item.product_name.toLowerCase().includes(searchQuery));
        setProducts(filteredItems);
        console.log(products)
    };

    const fetchProducts = async () => {
      
        try {
            const response = await fetch(`${URL}/api/products`);
            const data = await response.json();
            setProducts(data);
        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {

        fetchProducts();
    }, []);


    return (
        <div className="px-4 py-3 flex flex-col md:flex-row items-center justify-between bg-gray-100">
            <div className="w-full flex items-center justify-between md:justify-start">
                <Link to="/" className="flex-shrink-0">
                    <h1 className="text-2xl font-serif font-bold text-orange-500 mr-0 md:mr-8 cursor-pointer duration-700 ease-in-out hover:text-orange-300">
                        Sagar Shop
                    </h1>
                </Link>

                {/* Search Bar */}
                <div className={`w-full max-w-xl flex  md:pr-10 my-3 md:my-0 ${isMobileMenuOpen ? 'block' : 'hidden md:block'}`}>
                    <div className="relative">
                        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
                        <input
                            type="text"
                            id="searchInput"
                            placeholder="What are you looking for?"
                            ref={searchInputRef}
                            onChange={handleSearch}
                            className="w-full pl-10 pr-4 py-2 bg-gray-200 rounded-md focus:outline-none"
                        />
                    </div>
                </div>

                {/* Mobile Menu Toggle */}
                <button
                    className="md:hidden text-gray-600 hover:text-orange-500"
                    onClick={toggleMobileMenu}
                >
                    {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
                </button>
            </div>

            {/* Right Side Actions */}
            <div className={`flex items-center space-x-6 ${isMobileMenuOpen ? 'block' : 'hidden md:flex'}`}>

                <Link to="/favourites" className="flex flex-col items-center cursor-pointer hover:text-orange-400 hover:underline hover:underline-offset-10">
                    <Heart className="h-6 w-6" />
                    <span className="text-600">Favourites</span>
                </Link>
                <Link to="/cart" className="flex flex-col pl-6 items-center cursor-pointer hover:text-orange-400 hover:underline hover:underline-offset-10">
                    <ShoppingCart className="h-6 w-6" />
                    <span className="text-600">Cart</span>
                </Link>

                {token ? (

                    <div className="relative group w-full md:w-auto">

                        <div className="w-full md:w-auto flex items-center justify-center text-black px-6 py-2  hover:border-radius-90 cursor-pointer group ">
                            <User className="h-6 w-6 mr-1" /> Devanshu <ChevronRight className="h-4 w-4 ml-1 rotate-90 group-hover:-rotate-90 transition-all duration-300 " />
                        </div>

                        <div className="hidden group-hover:block bg-white px-2 py-2 rounded-md shadow-md md:absolute top-10rem left-0  w-full">

                            <ul className="space-y-2">
                                <li className="hover:text-orange-500 cursor-pointer"><Link to="/profile">Profile</Link></li>
                                <li className="hover:text-orange-500 cursor-pointer"><Link to="/orders">Orders</Link></li>
                                <li className="hover:text-orange-500 cursor-pointer"><Link to="/login" onClick={() => localStorage.removeItem('sb-bnkirpzbgaxuikwgrmse-auth-token')}>Logout</Link></li>

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

                )}


            </div>
        </div>
    );
};

const Header = () => {
    return (
        <header className="sticky top-0 z-100 bg-white">
            <MainHeader />
        </header>
    );
};

export default Header;