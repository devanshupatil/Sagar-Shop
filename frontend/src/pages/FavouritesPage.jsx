import { Trash2, Search } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-hot-toast';
import { useState, useEffect } from 'react';
import image from "../assets/images/shopping.png"
import useAuth from '../components/contexts/AuthContext';



function App() {
  const [totalItems, setTotalItems] = useState(0);
  const navigate = useNavigate();
  const URL = import.meta.env.VITE_BACKEND_URL;
  const [wishlist, setWishlist] = useState([]);
  const [products, setProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isProduct, setisProduct] = useState(false);
  const { getAccessToken } = useAuth();
 
  const fetchWishlistProducts = async () => {

    if (!getAccessToken()) {
      navigate('/login');
      return;
    }

    const userId = JSON.parse(atob(getAccessToken().split('.')[1])).sub;

    try {

      const response = await fetch(`${URL}/api/wishlist/${userId}`, {
        headers: {
          'Content-Type': 'application/json',
        }
      });

      const data = await response.json();
      if (data.length > 0) {
        setisProduct(true)
      }
      setTotalItems(data.length);
      setWishlist(data);
    } catch (error) {
      console.log(error);
    }
  };


  const fetchProducts = async () => {
    setIsLoading(true);

    const promises = wishlist.map(async (wishlist) => {

      const response = await fetch(`${URL}/api/products/${wishlist.product_id}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        }
      });
      const data = await response.json();
      return data;
    });

    const productsData = await Promise.all(promises);
    setProducts(productsData);
    setIsLoading(false);

  };

  useEffect(() => {
    if (!getAccessToken()) {
      setisProduct(false)
      return;
    }
    fetchWishlistProducts();
  }, []);


  useEffect(() => {
    if (!getAccessToken()) {
      setisProduct(false)
      return;
    }
    fetchProducts();
  }, [wishlist]);

  const handleRemoveFromWishlist = ( productId) => {

    if (!getAccessToken()) {
      navigate('/login');
      return;
    }

    const userId = JSON.parse(atob(getAccessToken().split('.')[1])).sub;


    if (!userId || !productId) {
      console.log('Invalid ID');
      return;
    }

    try {

      fetch(`${URL}/api/remove-from-wishlist/${userId}/${productId}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        }
      });
      fetchWishlistProducts();
      navigate(0);

    } catch (error) {
      console.log(error)
      toast.error('Failed to remove from wishlist');
    }
  }

  return (
    <div className="min-h-screen bg-light">

      <div className="container mx-auto px-4 py-8 shadow-md">
        {!isProduct && (
          <div className="bg-white p-6 rounded shadow-sm">
            <div className="flex gap-6">
              <div className="flex-1 flex flex-col items-center justify-center">
                <img src={image} alt="img" className="w-25 h-25" />
                <h3 className="font-stretch-100% text-gray-900 text-2xl mt-4">Your Wishlist is empty</h3>
                <p className="text-sm text-gray-600 mt-2">Add items to it now.</p>
                <Link to="/">
                  <button className="cursor-pointer px-15 py-2 bg-orange-500 text-white rounded mt-4">
                    Shop Now
                  </button>
                </Link>
              </div>
            </div>
          </div>
        )}
        {isProduct && (
          <div className="flex gap-8 shadow-md">

            {/* Main Content */}
            <div className="flex-1 shadow-md">
              <div className="bg-white rounded shadow-md ">
                <div className="p-4 border-b flex justify-between">
                  <h2 className="text-xl font-medium">My Wishlist ({totalItems})</h2>

                  <div className="relative">
                    <button>
                      <Search className="cursor-pointer absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-900 h-5 w-5" />
                    </button>
                    <input
                      type="text"
                      placeholder="Search products"
                      className="w-full pl-10 pr-4 py-2 bg-gray-200 rounded-md focus:outline-none"
                    />
                  </div>

                </div>


                <div className="divide-y ">



                  {isLoading && (
                    <div className="flex items-center justify-center">
                      <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-gray-900"></div>
                    </div>
                  )}
                  {products.map((item) => (

                    <div
                      key={item.product_id}
                      className="p-4 flex items-center gap-6 hover:bg-gray-50"
                    >
                      <img
                        onClick={() => navigate(`/product/${item.product_id}`)}
                        src={item.image}
                        alt={item.name}
                        className="w-24 h-24 object-contain hover:scale-103 duration-200 cursor-pointer"
                      />
                      <div className="flex-1">
                        <h3 onClick={() => navigate(`/product/${item.product_id}`)} className="font-medium mb-2 cursor-pointer hover:underline">{item.heading}</h3>
                        <div className="flex items-center gap-4">
                          <span className="text-xl font-bold">₹{item.price ? item.price.toLocaleString('en-IN') : 'N/A'}</span>
                          <span className="text-gray-500 line-through">₹{item.mrp ? item.mrp.toLocaleString('en-IN') : 'N/A'}</span>
                          <span className="text-green-600">{item.mrp && item.price && (100 - Math.round((item.price / item.mrp) * 100))}% off</span>
                        </div>
                      </div>
                      <button className="p-2 rounded-full">
                        <Trash2
                          onClick={() => handleRemoveFromWishlist(item.product_id)}
                          className="w-5 h-5 text-gray-400 hover:text-gray-500 cursor-pointer" />
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default App;