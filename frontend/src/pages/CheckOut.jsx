import { useState, useEffect } from 'react';
import { ShieldCheck, Info, Minus, Plus } from 'lucide-react';
import { BellRing, Star, Truck } from 'lucide-react';
import { useParams } from 'react-router-dom';

function CheckOut() {
    const { id } = useParams();
    const URL = import.meta.env.VITE_BACKEND_URL;
    const [quantity, setQuantity] = useState(1);
    const [email, setEmail] = useState('');
    const [useGST, setUseGST] = useState(false);
    const [isLoginChanged, setIsLoginChanged] = useState(false);
    const [isAddressChanged, setIsAddressChanged] = useState(false)
    const [product, setProduct] = useState({});
    const isFreeDelivery = true;
    const [productPrice, setProductPrice] = useState(0);
    const [discountedPrice, setDiscountedPrice] = useState(0);
    const [discount, setDiscount] = useState(0);
    const [deliveryCharge] = useState(0);
    const [total, setTotal] = useState(0);
    const [isEdit, setIsEdit] = useState(false);


    const decreaseQuantity = () => {
        if (quantity > 1) setQuantity(quantity - 1);
    };

    const fetchData = async () => {


        try {
            const response = await fetch(`${URL}/api/products/${id}`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                },


            });


            const data = await response.json();
            setProduct(data)
            setProductPrice(data.mrp)
            setDiscountedPrice(data.price)
            setDiscount(product.mrp && product.price && (100 - Math.round((product.price / product.mrp) * 100)))
            setTotal(productPrice - discountedPrice)
        }
        catch (error) {
            console.error('Error fetching products:', error);
        }

    }


    useEffect(() => {
        fetchData();

    }, [])

    const increaseQuantity = () => {
        setQuantity(quantity + 1);
    };

    const handleLoginChange = () => {
        setIsLoginChanged(false);
        setIsAddressChanged(true);
    };
    const handleEditAddress = () => {
        setIsEdit(true);
        setIsAddressChanged(false);
    }


    return (
        <div className="min-h-screen bg-gray-100 p-4">
            <div className="max-w-7xl mx-auto">
                <div className="flex flex-col lg:flex-row gap-4">
                    {/* Main Content - Left Side */}
                    <div className="flex-1">
                        {/* Login Section */}

                        {isLoginChanged && (
                            <div>
                                {/* Header */}
                                < div className="bg-orange-400 p-4 text-white flex items-center">
                                    <div className=" font-semibold">
                                        <span className="bg-white text-blue-500 px-2 py-1 rounded mr-2">1</span>
                                        LOGIN
                                    </div>
                                </div>

                                {/* Main Content */}
                                <div className="bg-white p-6 mx-auto max-w-5xl mb-8">
                                    <div className="flex flex-col md:flex-row justify-between gap-8 gap-y-4 md:gap-y-0">
                                        <div className="flex-1">
                                            <div className="space-y-4">
                                                <div>
                                                    <div className="text-gray-500">Name</div>
                                                    <div className="font-semibold">Devanshu Patil</div>
                                                </div>

                                                <div>
                                                    <div className="text-gray-500">Phone</div>
                                                    <div className="font-semibold">+917397927021</div>
                                                </div>

                                                <div className="text-blue-500 cursor-pointer hover:underline">
                                                    Logout & Sign In to another account
                                                </div>

                                                <button
                                                    onClick={() => handleLoginChange()}
                                                    className="cursor-pointer w-full bg-orange-500 text-white py-3 px-4 rounded hover:bg-orange-600 transition-colors">
                                                    CONTINUE CHECKOUT
                                                </button>

                                                <p className="text-gray-500 text-sm mt-4">
                                                    Please note that upon clicking &quot;`Logout&quot;` you will lose all items in cart and will be redirected to Flipkart home page.
                                                </p>
                                            </div>
                                        </div>

                                        {/* Right Side - Advantages */}
                                        <div className="flex-1">
                                            <h3 className="text-gray-600 mb-4">Advantages of our secure login</h3>
                                            <div className="space-y-6">
                                                <div className="flex items-start gap-3">
                                                    <Truck className="w-6 h-6 text-blue-500 flex-shrink-0" />
                                                    <span>Easily Track Orders, Hassle free Returns</span>
                                                </div>

                                                <div className="flex items-start gap-3">
                                                    <BellRing className="w-6 h-6 text-blue-500 flex-shrink-0" />
                                                    <span>Get Relevant Alerts and Recommendation</span>
                                                </div>

                                                <div className="flex items-start gap-3">
                                                    <Star className="w-6 h-6 text-blue-500 flex-shrink-0" />
                                                    <span>Wishlist, Reviews, Ratings and more.</span>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>

                        )}


                        {!isLoginChanged && (
                            <div className="bg-white p-4 rounded-sm mb-4">
                                <div className="flex items-center justify-between">
                                    <div className="flex items-center gap-2">
                                        <span className="bg-blue-500 text-white w-5 h-5 rounded-full flex items-center justify-center text-sm">1</span>
                                        <h2 className="font-medium">LOGIN ✓</h2>
                                    </div>
                                    <button
                                        onClick={() => setIsLoginChanged(true)}
                                        className="text-blue-500 font-medium cursor-pointer border border-gray-500 px-7 py-1">CHANGE</button>
                                </div>
                                <p className="text-gray-600 mt-1">Devanshu Patil +917397927090</p>
                            </div>
                        )}

                        {isAddressChanged && (
                            <div>
                                {/* Header */}
                                < div className="bg-orange-400 p-4 text-white flex items-center">
                                    <div className=" font-semibold">
                                        <span className="bg-white text-blue-500 px-2 py-1 rounded mr-2">2</span>
                                        DELIVERY ADDRESS
                                    </div>
                                </div>

                                {/* Main Content */}
                                <div className="bg-white p-6 mx-auto max-w-5xl mb-8">
                                    <div className="flex flex-col md:flex-row justify-between gap-8 gap-y-4 md:gap-y-0">
                                        <div className="flex-1">
                                            <div className="space-y-4">
                                                <div>
                                                    <div className="font-semibold">Edit Address</div>
                                                </div>

                                                <div>
                                                    <button onClick={() => handleEditAddress()} className="cursor-pointer float-right mt-[-55px] text-orange-500 font-semibold">
                                                        Edit
                                                    </button>
                                                </div>
                                                <div>
                                                    <p>Adarsha Nagar Nandura road motala, buldhana</p>
                                                </div>
                                                <button
                                                    onClick={() => setIsAddressChanged(false)}
                                                    className="cursor-pointer w-50 bg-orange-500 text-white py-3 px-4 rounded hover:bg-orange-600 transition-colors">
                                                    CONTINUE CHECKOUT
                                                </button>
                                            </div>
                                        </div>

                                    </div>
                                </div>
                            </div>

                        )}

                        {/* Edit Address */}
                        {isEdit && (

                            <div>
                                <div className="bg-white p-4 rounded-sm mb-4">
                                    <div className="flex items-center justify-between">
                                        <div className="flex items-center gap-2">
                                            <span className="bg-blue-500 text-white w-5 h-5 rounded-full flex items-center justify-center text-sm">2</span>
                                            <h2 className="font-medium"> ✓</h2>
                                        </div>
                                        <button
                                            onClick={() => setIsEdit(false)}
                                            className="text-blue-500 font-medium cursor-pointer border border-gray-500 px-7 py-1">CHANGE</button>
                                    </div>
                                    <p className="text-gray-600 mt-1">MOTALA</p>
                                </div>
                            </div>
                        )}

                        {/* Delivery Address */}
                        {!isAddressChanged && (
                            <div className="bg-white p-4 rounded-sm mb-4">
                                <div className="flex items-center justify-between">
                                    <div className="flex items-center gap-2">
                                        <span className="bg-blue-500 text-white w-5 h-5 rounded-full flex items-center justify-center text-sm">2</span>
                                        <h2 className="font-medium">DELVERY ADDRESS ✓</h2>
                                    </div>
                                    <button
                                        onClick={() => setIsAddressChanged(true)}
                                        className="text-blue-500 font-medium cursor-pointer border border-gray-500 px-7 py-1">CHANGE</button>
                                </div>
                                <p className="text-gray-600 mt-1">MOTALA</p>
                            </div>
                        )}

                        {/* Order Summary */}
                        <div className="bg-white p-4 rounded-sm mb-4">
                            <div className="flex items-center gap-2 mb-4">
                                <span className="bg-blue-500 text-white w-5 h-5 rounded-full flex items-center justify-center text-sm">3</span>
                                <h2 className="font-medium">ORDER SUMMARY</h2>
                            </div>

                            <div className="flex gap-4">
                                <img
                                    src={product.image}
                                    // alt={product.name}
                                    className="w-24 h-24 object-cover"
                                />
                                <div className="flex-1">
                                    <h3 className="font-medium">{product.heading}</h3>
                                    {/* <p className="text-gray-500">{product.color}</p> */}


                                    <div className="flex items-center gap-2 mt-2">
                                        <span className="text-lg">₹{discountedPrice}</span>
                                        <span className="text-gray-500 line-through text-sm">₹{productPrice}</span>
                                        <span className="text-green-600 text-sm">{discount}% Off</span>
                                    </div>

                                    <div className="flex items-center gap-4 mt-2">
                                        <div className="flex items-center border rounded">
                                            <button onClick={decreaseQuantity} className="p-1"><Minus size={16} /></button>
                                            <input
                                                type="text"
                                                value={quantity}
                                                className="w-12 text-center border-x"
                                                readOnly
                                            />
                                            <button onClick={increaseQuantity} className="p-1"><Plus size={16} /></button>
                                        </div>
                                        <button className="text-blue-500 cursor-pointer font-medium">REMOVE</button>
                                    </div>
                                </div>
                            </div>

                            <div className="mt-4 flex items-center gap-2 text-sm">
                                <Info size={16} className="text-blue-500" />
                                <span>Open Box Delivery is eligible for this item. You will receive a confirmation post payment.</span>
                                <button className="text-blue-500">Know More</button>
                            </div>
                        </div>

                        {/* Email and GST */}
                        <div className="bg-white p-4 rounded-sm mb-4">
                            <div className="mb-4">
                                <label className="block text-sm mb-1">Order confirmation email will be sent to</label>
                                <input
                                    type="email"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    className="border p-2 w-full rounded"
                                    placeholder="Enter your email ID"
                                />
                            </div>

                            <label className="flex items-center gap-2">
                                <input
                                    type="checkbox"
                                    checked={useGST}
                                    onChange={(e) => setUseGST(e.target.checked)}
                                    className="w-4 h-4"
                                />
                                <span>Use GST Invoice</span>
                            </label>
                        </div>

                        {/* Security Info */}
                        <div className="bg-white p-4 rounded-sm">
                            <div className="flex items-center gap-2 text-gray-500">
                                <ShieldCheck className="text-gray-400" />
                                <span className="text-sm">Safe and Secure Payments. Easy returns. 100% Authentic products.</span>
                            </div>
                        </div>
                    </div>

                    {/* Price Details - Right Side */}
                    <div className="w-[320px]">
                        <div className="bg-white p-4 rounded-sm ">
                            <h2 className="font-medium mb-4">PRICE DETAILS</h2>
                            <div className="space-y-2">
                                <div className="flex justify-between">
                                    <span>Price (1 item)</span>
                                    <span>₹{productPrice}</span>
                                </div>
                                <div className="flex justify-between">
                                    <span>Discount</span>
                                    <span className="text-green-600">- ₹{discount}</span>
                                </div>

                                <div className="flex justify-between">
                                    <span>Delivery Charges</span>
                                    <span className="text-green-600">{isFreeDelivery ? 'FREE' : `₹${deliveryCharge}`}</span>
                                </div>
                                <div className="border-t pt-2 font-medium flex justify-between">
                                    <span>Total Payable</span>
                                    <span>₹{discountedPrice}</span>
                                </div>

                                <div className="text-green-600 font-medium mt-2 md:mt-4">
                                    Your Total Savings on this order ₹{total}
                                </div>
                            </div>


                        </div>
                    </div>
                </div>
            </div>
        </div >
    );
}

export default CheckOut;