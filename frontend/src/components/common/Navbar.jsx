import { ChevronRight, Menu, X } from 'lucide-react'
import { Link } from 'react-router-dom'
import { useState } from 'react'

const Navbar = () => {
    const [isOpen, setIsOpen] = useState(false)

    const toggleMenu = () => {
        setIsOpen(!isOpen)
    }

    return (
        <div className="sticky top-14 z-50 bg-white">
            <nav className="px-4 py-5">
                {/* Mobile Menu Button */}
                <div className="md:hidden">
                    <button
                        onClick={toggleMenu}
                        className="p-2 text-gray-600 hover:text-orange-500"
                    >
                        {isOpen ? <X size={24} /> : <Menu size={24} />}
                    </button>
                </div>

                {/* Desktop and Mobile Menu */}
                <ul className={`
                    ${isOpen ? 'block' : 'hidden'} 
                    md:flex md:justify-center md:items-center 
                    flex-col md:flex-row 
                    space-y-4 md:space-y-0 md:space-x-14 
                    font-sans
                    absolute md:relative 
                    left-0 
                    w-full md:w-auto
                    bg-white 
                    p-4 md:p-0
                    shadow-md md:shadow-none
                    mt-2 md:mt-0
                `}>
                    <div className="relative group w-full md:w-auto">
                        <li className="cursor-pointer text-center">
                            <span className="hover:text-orange-500 hover:underline hover:underline-offset-15 flex items-center justify-between md:justify-center">
                                Women <ChevronRight className="h-5 w-5 ml-1 transform rotate-90 group-hover:-rotate-90 transition-all duration-300 ease-in-out" />
                            </span>
                        </li>
                        <div className="hidden group-hover:block bg-white px-2 py-2 rounded-md shadow-md md:absolute relative w-1/2 md:w-auto">
                            <ul className="space-y-2">
                                <li className="hover:text-orange-500 cursor-pointer"><Link to="/women/dresses">Dresses</Link></li>
                                <li className="hover:text-orange-500 cursor-pointer"><Link to="/women/tops">Tops</Link></li>
                                <li className="hover:text-orange-500 cursor-pointer"><Link to="/women/bottoms">Bottoms</Link></li>
                                <li className="hover:text-orange-500 cursor-pointer"><Link to="/women/outerwear">Outerwear</Link></li>
                            </ul>
                        </div>
                    </div>

                    <div className="relative group w-full md:w-auto">
                        <li className="cursor-pointer text-center">
                            <span className="hover:text-orange-500 hover:underline hover:underline-offset-15 flex items-center justify-between md:justify-center">
                                Men <ChevronRight className="h-5 w-5 ml-1 transform rotate-90 group-hover:-rotate-90 transition-all duration-300 ease-in-out" />
                            </span>
                        </li>
                        <div className="hidden group-hover:block bg-white px-2 py-2 rounded-md shadow-md md:absolute relative w-25 ">
                            <ul className="space-y-2">
                                <li className="hover:text-orange-500 cursor-pointer"><Link to="/men/dresses">Shirts</Link></li>
                                <li className="hover:text-orange-500 cursor-pointer"><Link to="/men/tops">T-Shirts</Link></li>
                                <li className="hover:text-orange-500 cursor-pointer"><Link to="/men/bottoms">Pants</Link></li>
                                <li className="hover:text-orange-500 cursor-pointer"><Link to="/men/outerwear">Jackets</Link></li>
                            </ul>
                        </div>
                    </div>

                    <div className="relative group w-full md:w-auto">
                        <li className="cursor-pointer text-center">
                            <span className="hover:text-orange-500 hover:underline hover:underline-offset-15 flex items-center justify-between md:justify-center">
                                Kids <ChevronRight className="h-5 w-5 ml-1 transform rotate-90 group-hover:-rotate-90 transition-all duration-300 ease-in-out" />
                            </span>
                        </li>
                        <div className="hidden group-hover:block bg-white px-2 py-2 rounded-md shadow-md md:absolute relative w-25 ">
                            <ul className="space-y-2">
                                <li className="hover:text-orange-500 cursor-pointer"><Link to="/kids/girls">Girls</Link></li>
                                <li className="hover:text-orange-500 cursor-pointer"><Link to="/kids/boys">Boys</Link></li>
                            </ul>
                        </div>
                    </div>

                    <div className="relative group w-full md:w-auto">
                        <li className="cursor-pointer text-center">
                            <span className="hover:text-orange-500 hover:underline hover:underline-offset-15 flex items-center justify-between md:justify-center">
                                Shoes & Bags <ChevronRight className="h-5 w-5 ml-1 transform rotate-90 group-hover:-rotate-90 transition-all duration-300 ease-in-out" />
                            </span>
                        </li>
                        <div className="hidden group-hover:block bg-white px-2 py-2 rounded-md shadow-md md:absolute relative w-25 ">
                            <ul className="space-y-2">
                                <li className="hover:text-orange-500 cursor-pointer"><Link to="/shoes-bags/shoes">Shoes</Link></li>
                                <li className="hover:text-orange-500 cursor-pointer"><Link to="/shoes-bags/bags">Bags</Link></li>
                            </ul>
                        </div>
                    </div>

                    <div className="relative group w-full md:w-auto">
                        <li className="cursor-pointer text-center">
                            <span className="hover:text-orange-500 hover:underline hover:underline-offset-15 flex items-center justify-between md:justify-center">
                                Wedding <ChevronRight className="h-5 w-5 ml-1 transform rotate-90 group-hover:-rotate-90 transition-all duration-300 ease-in-out" />
                            </span>
                        </li>
                        <div className="hidden group-hover:block bg-white px-2 py-2 rounded-md shadow-md md:absolute relative w-25">
                            <ul className="space-y-2">
                                <li className="hover:text-orange-500 cursor-pointer"><Link to="/wedding/dresses">Dresses</Link></li>
                                <li className="hover:text-orange-500 cursor-pointer"><Link to="/wedding/shoes">Shoes</Link></li>
                            </ul>
                        </div>
                    </div>

                    <div className="relative group w-full md:w-auto">
                        <li className="cursor-pointer text-center">
                            <span className="hover:text-orange-500 hover:underline hover:underline-offset-15 flex items-center justify-between md:justify-center">
                                Gen Z <ChevronRight className="h-5 w-5 ml-1 transform rotate-90 group-hover:-rotate-90 transition-all duration-300 ease-in-out" />
                            </span>
                        </li>
                        <div className="hidden group-hover:block bg-white px-2 py-2 rounded-md shadow-md md:absolute relative w-25">
                            <ul className="space-y-2">
                                <li className="hover:text-orange-500 cursor-pointer"><Link to="/gen-z/watches">Watches</Link></li>
                                <li className="hover:text-orange-500 cursor-pointer"><Link to="/gen-z/hoodies">Hoodies</Link></li>
                            </ul>
                        </div>
                    </div>

                    <div className="relative group w-full md:w-auto">
                        <li className="cursor-pointer text-center">
                            <span className="hover:text-orange-500 hover:underline hover:underline-offset-15 flex items-center justify-between md:justify-center">
                                Winterwear <ChevronRight className="h-5 w-5 ml-1 transform rotate-90 group-hover:-rotate-90 transition-all duration-300 ease-in-out" />
                            </span>
                        </li>
                        <div className="hidden group-hover:block bg-white px-2 py-2 rounded-md shadow-md md:absolute relative w-25">
                            <ul className="space-y-2">
                                <li className="hover:text-orange-500 cursor-pointer"><Link to="/winterwear/womens">Womens</Link></li>
                                <li className="hover:text-orange-500 cursor-pointer"><Link to="/winterwear/mens">Mens</Link></li>
                            </ul>
                        </div>
                    </div>
                </ul>
            </nav>
        </div>
    )
}

export default Navbar