import { Package, CheckCircle2, Shield, ShieldCheck } from 'lucide-react';
import useAuth from '../components/contexts/AuthContext';
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

function OrderDetailsPage() {

  const URL = import.meta.env.VITE_BACKEND_URL;
  const { getAccessToken } = useAuth();
  const [orders, setOrders] = useState([]);
  const [products, setProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();


  useEffect(() => {
    fetchOrders();
  }, []);

  useEffect(() => {
    fetchProducts();
  }, [orders]);

  const fetchOrders = async () => {

    if(!getAccessToken())
    {
      navigate('/login');
    }

    const userId = JSON.parse(atob(getAccessToken().split('.')[1])).sub;

    try {
      const response = await fetch(`${URL}/api/orders/${userId}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        }
      });

      const data = await response.json();
      setOrders(data);
    }
    catch (error) {
      console.error("Error fetching carts:", error); // Use console.error for errors
    }

  };

  const fetchProducts = async () => {

    setIsLoading(true);
    try {

      const promises = orders.map(async (order) => {
        const response = await fetch(`${URL}/api/products/${order.product_id}`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          }
        });
        const data = await response.json();
        return data;
      });

      setProducts(await Promise.all(promises));
      setIsLoading(false);
    }
    catch (error) {
      console.error("Error fetching products:", error); // Use console.error for errors
      setIsLoading(false);
    }
  };


  return (
    <div className="min-h-screen bg-gray-50 p-4 md:p-8">
      <div className="max-w-4xl mx-auto">
        <div className="bg-white rounded-lg shadow-sm p-6 grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Product Details */}
          <div className="md:col-span-2">
            <div className="flex gap-4 items-start">
              <img
                src="https://images.unsplash.com/photo-1585659722983-3a675dabf23d?auto=format&fit=crop&q=80&w=200&h=200"
                alt="Sandwich Maker"
                className="w-24 h-24 object-cover rounded-lg"
              />
              <div>
                <h2 className="text-lg font-medium">iBELL SM1515 Sandwich Maker with Floating Hinges, 1000 Watt</h2>
                <p className="text-gray-500 text-sm">Black, Silver</p>
                <p className="text-gray-500 text-sm mt-1">Seller: iBellHomeAppliances</p>
                <p className="text-xl font-semibold mt-2">₹1,412</p>
              </div>
            </div>

            {/* Delivery Status */}
            <div className="mt-8">
              <div className="flex items-center gap-2 text-sm text-gray-600 mb-4">
                <Package size={18} />
                <span>Open Box Delivery will be done</span>
                <button className="text-blue-600 ml-auto">View Checks</button>
              </div>

              {/* Timeline */}
              <div className="relative">
                <div className="absolute left-2 top-0 h-full w-0.5 bg-gray-200"></div>

                <div className="relative pl-10 pb-8">
                  <div className="absolute left-0 -ml-1">
                    <div className="w-6 h-6 bg-green-500 rounded-full flex items-center justify-center">
                      <CheckCircle2 size={16} className="text-white" />
                    </div>
                  </div>
                  <p className="font-medium">Order Confirmed</p>
                  <p className="text-sm text-gray-500">Tue Mar 11</p>
                </div>

                <div className="relative pl-10 pb-8">
                  <div className="absolute left-0 -ml-1">
                    <div className="w-6 h-6 bg-green-500 rounded-full flex items-center justify-center">
                      <CheckCircle2 size={16} className="text-white" />
                    </div>
                  </div>
                  <p className="font-medium">Shipped</p>
                  <p className="text-sm text-gray-500">Your item has left a Flipkart Facility, Thane, Wed 12th Mar</p>
                </div>

                <div className="relative pl-10 pb-8">
                  <div className="absolute left-0 -ml-1">
                    <div className="w-6 h-6 bg-gray-200 rounded-full"></div>
                  </div>
                  <p className="font-medium text-gray-500">Out For Delivery</p>
                </div>

                <div className="relative pl-10">
                  <div className="absolute left-0 -ml-1">
                    <div className="w-6 h-6 bg-gray-200 rounded-full"></div>
                  </div>
                  <p className="font-medium text-gray-500">Delivery</p>
                  <p className="text-sm text-gray-500">Mar 16 By 11 PM</p>
                </div>
              </div>
            </div>
          </div>

          {/* Price Details */}
          <div className="bg-gray-50 p-4 rounded-lg">
            <h3 className="font-medium mb-4">Price Details</h3>
            <div className="space-y-3 text-sm">
              <div className="flex justify-between">
                <span className="text-gray-600">List price</span>
                <span>₹4,650</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Selling price</span>
                <span>₹1,620</span>
              </div>
              <div className="flex justify-between text-green-600">
                <span>Extra Discount</span>
                <span>-₹227</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Special Price</span>
                <span>₹1,393</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Delivery Charge</span>
                <span className="text-green-600">Free</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Handling Fee</span>
                <span>₹10</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Protect Promise Fee</span>
                <span>₹9</span>
              </div>
              <div className="pt-3 border-t flex justify-between font-medium">
                <span>Total Amount</span>
                <span>₹1,412</span>
              </div>
              <div className="pt-3 flex items-center gap-2 text-green-600">
                <Shield size={16} />
                <span>Cash On Delivery: ₹1412.0</span>
              </div>
            </div>
          </div>
        </div>

        {/* Customer Details */}
        <div className="mt-6 bg-white rounded-lg shadow-sm p-6">
          <div className="flex items-start gap-4">
            <ShieldCheck className="text-green-600" size={24} />
            <div>
              <h3 className="font-medium">Devanshu Patil</h3>
              <p className="text-gray-600 mt-1">
                Adarsh nagar, sayli general, near government hospital, motala<br />
                Near Cotton market, motala, Buldhana, Buldana District<br />
                Maharashtra - 443103
              </p>
              <p className="text-gray-600 mt-2">
                Phone number: 7397927021, 7410744850
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default OrderDetailsPage;