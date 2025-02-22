import { Heart, ShoppingCart, Info, Check, Loader } from 'lucide-react';
import { useParams } from 'react-router-dom';
import { Link } from 'react-router-dom';
import { toast } from 'react-hot-toast';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import useAuth from '../components/contexts/AuthContext';

function Product() {

  const { id: productId } = useParams();
  const URL = import.meta.env.VITE_BACKEND_URL;
  const [product, setProduct] = useState({});
  const navigate = useNavigate();
  const [isAddedToCartLodding, setIsAddedToCartLodding] = useState(false);
  const [isBuyNowLoading, setIsBuyNowLoading] = useState(false);
  const [isInWishlist, setIsInWishlist] = useState(false);
  const { getAccessToken } = useAuth();
  const userId = JSON.parse(atob(getAccessToken().split('.')[1])).sub;


  const fetchData = async () => {

    try {
      const response = await fetch(`${URL}/api/products/${productId}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },


      });
      const data = await response.json();
      setProduct(data)
      // Wishlist(userId, productId);
    }
    catch (error) {
      console.error('Error fetching products:', error);
      toast.error('Failed to fetch data');
    }

  }

  const Wishlist = async (userId, productId) => {

    try {
      
      const response = await fetch(`${URL}/api/wishlist/${userId}/${productId}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        }
      });
      const data = await response.json();

      if(data){
        setIsInWishlist(true);
      }
      else{
        setIsInWishlist(false);
      }
    }
    catch (error) {
      console.error('Error adding to wishlist:', error);
      toast.error('Failed to fetch data to wishlist');
    }
  }



  useEffect(() => {
    fetchData();

  }, [])


  const handleAddToCart = async (productId) => {
    setIsAddedToCartLodding(true);

    try {

      const response = await fetch(`${URL}/api/add-to-cart/${userId}/${productId}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          // 'Authorization': `Bearer ${getAccessToken()}`
        },


      });

      const data = await response.json();

      if (data) {
        navigate('/cart');
      }


    } catch (error) {
      console.log(error)
      toast.error('Failed to add to cart');
    }
    finally {
      setIsAddedToCartLodding(false);
    }
  }

  const handleBuyNow = async (productId) => {
    setIsBuyNowLoading(true);

    try {

      // const response = await fetch(`${URL}/api/checkout/${1}/${id}`, {
      //   method: 'POST',
      //   headers: {
      //     'Content-Type': 'application/json',
      //     // 'Authorization': `Bearer ${getAccessToken()}`
      //   },

      // });

      // const data = await response.json();
      // if (data) {
      //   navigate('/cart');
      // }

      window.location.href = `/checkout/${productId}`;
    }

    catch (error) {
      console.log(error)
      toast.error('Failed to buy now');
    }
    finally {

      setIsBuyNowLoading(false);
    }

  }


  const addToWishlist = async (userId, productId) => {
    try {

      const response = await fetch(`${URL}/api/add-to-wishlist/${userId}/${productId}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          // 'Authorization': `Bearer ${getAccessToken()}`
        },

      });

      const data = await response.json();
      console.log(data)

    } catch (error) {
      console.log(error)
    }
  }

  if (!product) {
    return (

      <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center">
        <div className='bg-white rounded-lg shadow-lg p-8 max-w-md mx-auto'>
          <div className="flex flex-col items-center">
            <h1 className='text-4xl font-bold mb-4'>Product not found</h1>
            <p className="text-gray-600 text-center">The product you are looking for does not exist.</p>
            <div className="mt-8">
              <Link to="/">
                <button className="cursor-pointer bg-orange-500 text-white px-4 py-2 rounded-md hover:bg-orange-600 transition duration-300 shadow-lg">
                  Go back
                </button>
              </Link>
            </div>
          </div>
        </div>
      </div>

    );
  }

  return (
    <div className="min-h-screen bg-gray-50">

      {/* Main Content */}
      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Product Images */}
          <div className="space-y-6">
            <div className="bg-white p-8 rounded-lg shadow-sm relative">
              <button
                className={`cursor-pointer absolute top-4 right-4 p-2 rounded-full ${isInWishlist ? 'bg-red-500' : 'text-gray-400'}`}
                onClick={() => addToWishlist(userId, product.product_id)}
              >
                <Heart
                  className={`w-6 h-6 ${isInWishlist ? 'text-white' : 'text-gray-400'}`} />
              </button>
              <img
                src={product.image}
                alt="Product view"
                className="w-full h-auto"
              />
            </div>
            <div className="grid grid-cols-4 gap-4">
              {[1, 2, 3, 4].map((i) => (
                <button key={i} className="bg-white p-2 rounded-lg shadow-sm hover:ring-2 hover:ring-blue-500">
                  <img
                    src="https://images.unsplash.com/photo-1616711906333-23cf8b122d38?auto=format&fit=crop&q=80&w=200"
                    alt={`Product view ${i}`}
                    className="w-full h-auto"
                  />
                </button>
              ))}
            </div>
          </div>

          {/* Product Info */}
          <div className="space-y-6">
            <div>
              <h1 className="text-2xl font-semibold text-gray-900 mb-2">
                {product.heading}
              </h1>
              <div className="flex items-center gap-4">
                <div className="flex items-center gap-1">
                  <span className="bg-green-500 text-white px-2 py-1 rounded text-sm">4.4 ★</span>
                  <span className="text-sm text-gray-500">1,791 Ratings & 151 Reviews</span>
                </div>
                <div className="flex items-center gap-1">
                  <Check className="w-4 h-4 text-blue-600" />
                  <span className="text-sm text-gray-700">Assured</span>
                </div>
              </div>
            </div>

            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <span className="text-3xl font-bold">{product.price ? product.price.toLocaleString('en-IN') : 'N/A'}</span>
                <span className="text-gray-500 line-through">₹{product.mrp ? product.mrp.toLocaleString('en-IN') : 'N/A'}</span>
                <span className="text-green-600 font-semibold">{product.mrp && product.price && (100 - Math.round((product.price / product.mrp) * 100))}% off</span>
                <Info className="w-4 h-4 text-gray-400" />
              </div>
            </div>

            <div className="space-y-4">
              <h3 className="font-semibold">Available offers</h3>
              <div className="space-y-3">
                {[
                  'Bank Offer: 5% Unlimited Cashback on Flipkart Axis Bank Credit Card',
                  'Bank Offer: 10% instant discount on SBI Credit Card EMI Transactions',
                  'Bank Offer: 10% off on BOBCARD Transactions',
                  'Special Price: Get extra 41% off (price inclusive of cashback/coupon)'
                ].map((offer, i) => (
                  <div key={i} className="flex items-start gap-2">
                    <div className="p-1 bg-green-100 rounded">
                      <Check className="w-4 h-4 text-green-600" />
                    </div>
                    <p className="text-sm text-gray-700">{offer}</p>
                  </div>
                ))}
              </div>
            </div>


            <div className="flex gap-4 pt-6">
              <button
                onClick={() => handleAddToCart(product.product_id)}
                className="cursor-pointer flex-1 bg-orange-500 text-white py-4 rounded-lg font-semibold hover:bg-orange-600 flex items-center justify-center gap-2">
                {isAddedToCartLodding ? <Loader className="w-5 h-5" /> : <ShoppingCart className="w-5 h-5" />}
                {isAddedToCartLodding ? 'ADDING...' : 'ADD TO CART'}
              </button>
              <button
                onClick={() => handleBuyNow(product.product_id)}
                className="cursor-pointer flex-1 bg-orange-600 text-white py-4 rounded-lg font-semibold hover:bg-orange-700 flex items-center justify-center gap-2">
                {isBuyNowLoading ? <Loader className="w-5 h-5" /> : <ShoppingCart className="w-5 h-5" />}
                {isBuyNowLoading ? 'LOADING...' : 'BUY NOW'}
              </button>
            </div>

            {/* <div className="flex items-center gap-4">
              <span className="font-semibold">Description:</span>
              <p className="text-gray-600">{product.description}</p>
            </div> */}
          </div>

        </div>
      </div>
    </div>
  );
}

export default Product;