import { Package2, CheckCircle2, MapPin, Clock, Info, Loader } from 'lucide-react';
import useAuth from '../components/contexts/AuthContext';
import { useState, useEffect } from 'react';
// import { useNavigate } from 'react-router-dom';
import { useParams } from 'react-router-dom';
import { toast } from 'react-hot-toast';


function OrderDetailsPage() {

  const { productId, orderId } = useParams();
  const URL = import.meta.env.VITE_BACKEND_URL;
  const { getAccessToken } = useAuth();
  const [order, setOrder] = useState('');
  const [product, setProduct] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const userId = JSON.parse(atob(getAccessToken().split('.')[1])).sub;
  const [orderStatus, setOrderStatus] = useState('');
  const [discount, setDiscount] = useState(0);
  const [user, setUser] = useState('');
  // const navigate = useNavigate();

  console.log(user)



  useEffect(() => {
    fetchProducts();
  }, []);

  useEffect(() => {
    fetchOrders();
  }, [])

  useEffect(() => {
    fetchUser()
  }, [])

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
    finally {
      setIsLoading(false);
    }
  }


  const fetchProducts = async () => {
    setIsLoading(true);

    try {
      const response = await fetch(`${URL}/api/products/${productId}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });
      const data = await response.json();
      setProduct(data)
    }
    catch (error) {
      console.error('Error fetching products:', error);
      toast.error('Failed to fetch data');
    }
    finally {
      setIsLoading(false);
    }
  }


  const fetchOrders = async () => {
    try {
      const response = await fetch(`${URL}/api/order/${userId}/${orderId}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });
      const data = await response.json();
      setOrder(data);
      setOrderStatus(data.order_status); // Fix: Set the orderStatus state with data.order_status
      setDiscount((product.mrp - product.price) * data.quantity);
    }
    catch (error) {
      console.error('Error fetching orders:', error);
      toast.error('Failed to fetch order data');
    }
  }


  return (
    <div className="min-h-screen bg-gray-50">

      {isLoading && (
        <div>
          <div className="flex items-center justify-center">
            <Loader className="h-10 w-10 animate-spin rounded-full border-orange-500 mt-50"></Loader>
          </div>
        </div>
      )}

      {!isLoading && (

        <main className="container mx-auto px-4 py-8">


          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">

            {/* Product and Status Section */}
            <div className="lg:col-span-2">
              <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
                {/* Product Info */}
                <div className="flex items-start gap-6 mb-6" key={product.product_id}>
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-24 h-24 object-contain"
                  />
                  <div>
                    <h1 className="text-lg font-medium">{product.heading}</h1>
                    <p className="text-gray-500">{product.description}</p>
                    {/* <p className="text-gray-500 text-sm mt-1">Seller: {product.seller}</p> */}
                    <p className="text-xl font-medium mt-2">₹{product.price}</p>
                  </div>
                </div>

                {/* Timeline */}
                {
                  orderStatus != 'cancelled' && (
                    <div className="space-y-8 relative">
                      <div className="absolute left-4 top-4 bottom-0 w-0.5 bg-gray-200"></div>

                      <div className="flex items-start relative">



                        <div className="flex-shrink-0 z-10">
                          <div className={`w-8 h-8 rounded-full flex items-center justify-center ${orderStatus === 'pending' ? 'bg-red-500' : 'bg-gray-200'} ${orderStatus === 'processing' || orderStatus === 'shipped' || orderStatus === 'out-for-delivery' || orderStatus === 'delivered' ? 'bg-green-500' : 'bg-gray-200'}`}>
                            <CheckCircle2 className={`w-5 h-5 ${orderStatus === 'pending' ? 'text-white' : 'text-gray-400'} ${orderStatus === 'processing' ? 'text-white' : 'text-gray-400'}`} />
                          </div>
                        </div>

                        <div className="ml-6">
                          <h3 className="text-lg font-medium text-gray-900">{orderStatus == 'pending' ? 'Pending' : 'Order Confirmed'}</h3>
                          {/* <p className="text-sm text-gray-500">Tue Mar 11</p> */}
                        </div>

                      </div>

                      <div className="flex items-start relative">
                        <div className="flex-shrink-0 z-10">
                          <div className={`w-8 h-8 rounded-full flex items-center justify-center ${orderStatus === 'shipped' || orderStatus === 'out-for-delivery' || orderStatus === 'delivered' ? 'bg-green-500' : 'bg-gray-200'}`}>
                            <Package2 className={`w-5 h-5 ${orderStatus === 'shipped' ? 'text-white' : 'text-gray-400'}`} />
                          </div>
                        </div>
                        <div className="ml-6">
                          <h3 className={`text-lg font-medium ${orderStatus === 'shipped' ? 'text-green-900' : 'text-gray-900'}`}>Shipped</h3>
                          <p className="text-sm text-gray-500">Your item has left a Flipkart Facility, Thane, Wed 12th Mar</p>
                        </div>
                      </div>

                      <div className="flex items-start relative">
                        <div className="flex-shrink-0 z-10">
                          <div className={`w-8 h-8 rounded-full flex items-center justify-center ${orderStatus === 'out-for-delivery' || orderStatus == 'delivered' ? 'bg-green-500' : 'bg-gray-200'}`}>
                            <MapPin className={`w-5 h-5 ${orderStatus === 'out-for-delivery' ? 'text-white' : 'text-gray-400'}`} />
                          </div>
                        </div>
                        <div className="ml-6">
                          <h3 className={`text-lg font-medium ${orderStatus === 'out-for-delivery' ? 'text-green-900' : 'text-gray-900'}`}>Out For Delivery</h3>
                          <p className="text-sm text-gray-500">Estimated delivery by Mar 16</p>
                        </div>
                      </div>

                      <div className="flex items-start relative">
                        <div className="flex-shrink-0 z-10">
                          <div className={`w-8 h-8 rounded-full flex items-center justify-center ${orderStatus == 'delivered' ? 'bg-green-500' : 'bg-gray-200'}`}>
                            <Clock className={`w-5 h-5 ${orderStatus === 'delivered' ? 'text-white' : 'text-gray-400'}`} />
                          </div>
                        </div>
                        <div className="ml-6">
                          <h3 className={`text-lg font-medium ${orderStatus === 'delivered' ? 'text-green-900' : 'text-gray-900'}`}>Delivery</h3>
                          <p className="text-sm text-gray-500">Mar 16 By 11 PM</p>
                        </div>
                      </div>


                    </div>
                  )
                }
                {orderStatus === 'cancelled' && (

                  <div className="flex items-start relative">
                    <div className="flex-shrink-0 z-10">
                      <div className={`w-8 h-8 rounded-full flex items-center justify-center ${orderStatus == 'cancelled' ? 'bg-red-500' : 'bg-gray-200'}`}>
                        <Clock className={`w-5 h-5 ${orderStatus === 'cancelled' ? 'text-white' : 'text-gray-400'}`} />
                      </div>
                    </div>
                    <div className="ml-6">
                      <h3 className={`text-lg font-medium ${orderStatus === 'cancelled' ? 'text-red-900' : 'text-gray-900'}`}>Cancelled</h3>
                      <p className="text-sm text-gray-500">Mar 16 By 11 PM</p>
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Order Details Sidebar */}
            <div className="lg:col-span-1">


              {/* Shipping Details */}
              <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
                <h2 className="text-lg font-medium mb-4">Shipping Details</h2>
                <div className="space-y-2">
                  <p className="font-medium">{user.first_name} {user.last_name}</p>
                  <p className="text-gray-600">{user.address}, {user.city}</p>
                  <p className="text-gray-600">{user.state} - {user.pincode}</p>
                  <p className="text-gray-600">Phone number: {user.phone_number}</p>
                </div>
              </div>

              {/* Price Details */}
              <div className="bg-white rounded-lg shadow-sm p-6">
                <h2 className="text-lg font-medium mb-4">Price Details</h2>
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Original price</span>
                    <span className="line-through">₹{product.mrp ? product.mrp.toLocaleString('en-IN') : 'N/A'}</span>
                  </div>
                  <div className="flex justify-between text-green-600">
                    <span>Discount</span>
                    <span>- ₹{discount ? discount.toLocaleString('en-IN') : '0'}</span>
                  </div>
                  <div className="pt-3 border-t flex justify-between font-medium">
                    <span>Total Amount</span>
                    <span>₹{product.price ? product.price.toLocaleString('en-IN') : '0'}</span>
                  </div>
                </div>


              </div>
            </div>
          </div>
        </main>
      )}
    </div>
  );
}

export default OrderDetailsPage;