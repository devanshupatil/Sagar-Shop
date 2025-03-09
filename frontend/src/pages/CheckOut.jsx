import { useState, useEffect } from 'react';
import { BellRing, Star, Truck, CreditCard, Banknote, Info, Loader } from 'lucide-react';
import { useParams } from 'react-router-dom';
import useAuth from '../components/contexts/AuthContext';
import { useNavigate } from 'react-router-dom';




// complate orders button .
// CSV to JSON TO Database (XL)
// selar page (handle status) 
// category add with XL file in Database and display in frontend using API
// give type in products .
// seler will update status of orders of users
// show on frount page true or false .



function CheckOut() {
    const { id: productId } = useParams();
    const URL = import.meta.env.VITE_BACKEND_URL;
    const [quantity, setQuantity] = useState(1);
    // const [email, setEmail] = useState('');
    const [isLoginChanged, setIsLoginChanged] = useState(false);
    const [isAddressChanged, setIsAddressChanged] = useState(false)
    const [isOrderConfirmed, setIsOrderConfirmed] = useState(false)
    // const [isPaymentDone, setIsPaymentDone] = useState(false)
    const [product, setProduct] = useState({});
    const [productPrice, setProductPrice] = useState(0);
    const [discountedPrice, setDiscountedPrice] = useState(0);
    const [discount, setDiscount] = useState(0);
    const [total, setTotal] = useState(0);
    const [isEdit, setIsEdit] = useState(false);
    const { getAccessToken } = useAuth();
    const userId = JSON.parse(atob(getAccessToken().split('.')[1])).sub;
    const [isCheckoutLoading, setIsCheckoutLoading] = useState(false);
    const navigate = useNavigate();
    const [user, setUser] = useState('');
    const [shippingAddress, setShippingAddress] = useState('');
    // const [oderStatus, setOderStatus] = useState('pending');

    const fetchQuantity = async () => {

        try {


            const response = await fetch(`${URL}/api/carts/${userId}/${productId}`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                }
            });

            const data = await response.json();
            if (data.length > 0) {
                setQuantity(data[0].quantity)
            }
        }
        catch (error) {
            console.error('Error updating cart:', error);
            throw new Error('Server Error: Unable to update cart');
        }



    };

    const fetchUser = async () => {

        try {

            const response = await fetch(`${URL}/api/user/${userId}`, {
                headers: {
                    'Content-Type': 'application/json',
                }
            });
            const data = await response.json();
            setUser(data);
            setShippingAddress(`${data.address}, ${data.city}, ${data.pincode}, ${data.state}, ${data.country}`);
            console.log(shippingAddress)
        } catch (error) {
            console.log(error);
        }
    };


    const fetchData = async () => {


        try {
            const response = await fetch(`${URL}/api/products/${productId}`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                },


            });


            const data = await response.json();
            setProduct(data);
            setProductPrice(data.mrp * quantity);
            setDiscountedPrice(data.price * quantity);
            setDiscount((data.mrp - data.price) * quantity);
            setTotal((data.mrp - data.price) * quantity);
        }

        catch (error) {
            console.error('Error fetching products:', error);
        }

    }


    useEffect(() => {
        fetchQuantity();
        fetchUser();
        fetchData();
    }, [productId, quantity])

    const handleLoginChange = () => {
        setIsLoginChanged(false);
        setIsAddressChanged(true);
    };
    const handleEditAddress = () => {
        setIsEdit(true);
        setIsAddressChanged(false);
    }

    // const handleCheckout = () => {
    //     setIsOrderConfirmed(true);
    //     setIsPaymentDone(true);
    // }

    const handleCheckout = async (productId) => {

        setIsCheckoutLoading(true);

        const generateTransactionId = () => {
            const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789'.split('');
            const transactionId = [];
            for (let i = 0; i < 12; i++) {
                transactionId.push(chars[Math.floor(Math.random() * chars.length)]);
            }
            return transactionId.join('');
        }
        const transactionId = generateTransactionId();

        try {

            const response = await fetch(`${URL}/api/orders/${userId}/${productId}/${quantity}`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ transactionId, shippingAddress})
            })

            const data = await response.json();
            console.log(data[0])

            navigate(`/success/${productId}/${data[0].order_id}`);

        }
        catch (error) {
            console.log(error)
        }
        finally {
            setIsCheckoutLoading(false);
        }


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
                                                    <div className="font-semibold">{user.first_name} {user.last_name}</div>
                                                </div>

                                                <div>
                                                    <div className="text-gray-500">Phone</div>
                                                    <div className="font-semibold">{user.phone_number}</div>
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
                                <p className="text-gray-600 mt-1">{user.first_name} {user.last_name} +{user.phone_number}</p>
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
                                                    <p>{shippingAddress}</p>
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

                        {!isOrderConfirmed && (



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
                                            <span className="text-lg">₹{discountedPrice.toLocaleString('en-IN')}</span>
                                            {product.mrp && product.price && (
                                                <>
                                                    <span className="text-gray-500 line-through text-sm">₹{productPrice.toLocaleString('en-IN')}</span>
                                                    <span className="text-green-600 text-sm">{Math.round(((product.mrp - product.price) / product.mrp) * 100)}% Off</span>
                                                </>
                                            )}
                                        </div>

                                        <div className="flex items-center gap-4 mt-2">
                                            <div className="flex items-center ">
                                                <p className="text-gray-500">Quantity : {quantity}</p>
                                            </div>
                                        </div>
                                    </div>
                                </div>




                                {/* <div className="inline-block">
                                <label className="">Order confirmation email will be sent to</label>
                                <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} className="border p-2 w-60 rounded" placeholder="Enter your email ID" />
                            </div> */}

                                <div className="flex justify-end">
                                    <button
                                        onClick={() => handleCheckout(productId)}
                                        className="cursor-pointer w-50 bg-orange-500 text-white py-3 px-4 rounded hover:bg-orange-600 transition-colors">
                                        {isCheckoutLoading ? <Loader className="animate-spin" /> : 'CONTINUE CHECKOUT'}
                                    </button>
                                </div>

                                <div className="mt-4 flex items-center gap-2 text-sm">
                                    <Info size={16} className="text-blue-500" />
                                    <span>Open Box Delivery is eligible for this item. You will receive a confirmation post payment.</span>
                                    <button className="text-blue-500">Know More</button>
                                </div>
                            </div>
                        )}

                        {isOrderConfirmed && (

                            <div className="bg-white p-4 rounded-sm mb-4">
                                <div className="flex items-center gap-2 mb-4">
                                    <span className="bg-blue-500 text-white w-5 h-5 rounded-full flex items-center justify-center text-sm">3</span>
                                    <h2 className="font-medium">ORDER SUMMARY ✓</h2>
                                </div>
                            </div>
                        )}


                        {/* Security Info
                        <div className="bg-white p-4 rounded-sm">
                            <div className="flex items-center gap-2 text-gray-500">
                                <ShieldCheck className="text-gray-400" />
                                <span className="text-sm">Safe and Secure Payments. Easy returns. 100% Authentic products.</span>
                            </div>
                        </div> */}

                        {/* Payment method*/}
                        {/* {!isPaymentDone && (
                            <div className="bg-white p-4 rounded-sm mb-4">
                                <div className="flex items-center justify-between">
                                    <div className="flex items-center gap-2">
                                        <span className="bg-blue-500 text-white w-5 h-5 rounded-full flex items-center justify-center text-sm">4</span>
                                        <h2 className="font-medium">PAYMENT METHOD ✓</h2>
                                    </div>
                                </div>
                            </div>

                        )} */}

                        {/* {isPaymentDone && ( */}

                        {/* <div className="bg-white rounded-sm mb-50">

                                {/* Header */}
                        {/* <div className="bg-orange-400 p-4 text-white flex items-center">
                                    <div className=" font-semibold">
                                        <span className="bg-white text-orange-500 px-2 py-1 rounded mr-2">4</span>
                                        PAYMENT METHOD
                                    </div>
                                </div> */}



                        {/* Payment Methods */}
                        {/* <div className="divide-y"> */}
                        {/* PhonePe UPI */}
                        {/* <label className="flex items-start p-4 cursor-pointer hover:bg-gray-50">
                                        <input
                                            type="radio"
                                            name="payment"
                                            value="phonepe"
                                            // checked={selectedPayment === 'phonepe'}
                                            // onChange={(e) => setSelectedPayment(e.target.value)}
                                            className="mt-1"
                                        />
                                        <div className="ml-4 flex-1">
                                            <div className="font-medium">Phonepe UPI</div>
                                            <div className="text-sm text-gray-500">7397927021@ibl</div>
                                        </div>
                                    </label> */}

                        {/* Paytm UPI */}
                        {/* <label className="flex items-start p-4 cursor-pointer hover:bg-gray-50">
                                        <input
                                            type="radio"
                                            name="payment"
                                            value="paytm-upi"
                                            checked={selectedPayment === 'paytm-upi'}
                                            onChange={(e) => setSelectedPayment(e.target.value)}
                                            className="mt-1"
                                        />
                                        <div className="ml-4 flex-1">
                                            <div className="flex items-center gap-2">
                                                <img src="https://static-assets-web.flixcart.com/fk-p-web-static/images/paytmUpi.svg" alt="Paytm" className="h-6" />
                                                <span className="font-medium">UPI</span>
                                            </div>
                                            <div className="text-sm text-gray-500">Pay by any UPI app</div>
                                        </div>
                                    </label> */}

                        {/* Paytm Wallet */}
                        {/* <label className="flex items-start p-4 cursor-pointer hover:bg-gray-50">
                                        <input
                                            type="radio"
                                            name="payment"
                                            value="paytm-wallet"
                                            checked={selectedPayment === 'paytm-wallet'}
                                            onChange={(e) => setSelectedPayment(e.target.value)}
                                            className="mt-1"
                                        />
                                        <div className="ml-4 flex-1">
                                            <div className="flex items-center gap-2">
                                                <img src="https://static-assets-web.flixcart.com/fk-p-web-static/images/paytmUpi.svg" alt="Paytm" className="h-6" />
                                                <span className="font-medium">Wallets</span>
                                            </div>
                                        </div>
                                    </label> */}

                        {/* Credit/Debit Card */}
                        {/* <label className="flex items-start p-4 cursor-pointer hover:bg-gray-50">
                                        <input
                                            type="radio"
                                            name="payment"
                                            value="card"
                                            // checked={selectedPayment === 'card'}
                                            // onChange={(e) => setSelectedPayment(e.target.value)}
                                            className="mt-1"
                                        />
                                        <div className="ml-4 flex-1">
                                            <div className="font-medium flex items-center gap-2">
                                                <CreditCard className="w-5 h-5" />
                                                Credit / Debit / ATM Card
                                            </div>
                                            <div className="text-sm text-gray-500">Add and secure cards as per RBI guidelines</div>
                                        </div>
                                    </label> */}

                        {/* Net Banking */}
                        {/* <label className="flex items-start p-4 cursor-pointer hover:bg-gray-50">
                                        <input
                                            type="radio"
                                            name="payment"
                                            value="netbanking"
                                            checked={selectedPayment === 'netbanking'}
                                            onChange={(e) => setSelectedPayment(e.target.value)}
                                            className="mt-1"
                                        />
                                        <div className="ml-4 flex-1">
                                            <div className="font-medium flex items-center gap-2">
                                                <Building2 className="w-5 h-5" />
                                                Net Banking
                                            </div>
                                            <div className="text-sm text-gray-500">This instrument has low success, use UPI or cards for better experience</div>
                                        </div>
                                    </label> */}

                        {/* EMI */}
                        {/* <label className="flex items-start p-4 cursor-pointer hover:bg-gray-50">
                                        <input
                                            type="radio"
                                            name="payment"
                                            value="emi"
                                            checked={selectedPayment === 'emi'}
                                            onChange={(e) => setSelectedPayment(e.target.value)}
                                            className="mt-1"
                                        />
                                        <div className="ml-4 flex-1">
                                            <div className="font-medium">EMI (Easy Installments)</div>
                                        </div>
                                    </label> */}

                        {/* Cash on Delivery */}
                        {/* <label className="flex items-start p-4 cursor-pointer hover:bg-gray-50">
                                        <input
                                            type="radio"
                                            name="payment"
                                            value="cod"
                                            // checked={selectedPayment === 'cod'}
                                            // onChange={(e) => setSelectedPayment(e.target.value)}
                                            className="mt-1"
                                        />
                                        <div className="ml-4 flex-1">
                                            <div className="font-medium flex items-center gap-2">
                                                <Banknote className="w-5 h-5" />
                                                Cash on Delivery
                                            </div>
                                        </div>
                                    </label> */}

                        {/* Gift Card */}
                        {/* <button className="w-full p-4 text-left hover:bg-gray-50">
                                        <div className="flex items-center gap-2 text-[#2874f0]">
                                            <Plus className="w-5 h-5" />
                                            Add Gift Card
                                        </div>
                                    </button> */}
                        {/* </div>
                            </div> */}


                        {/* )} */}
                    </div>

                    {/* Price Details - Right Side */}
                    <div className="w-[320px]">
                        <div className="bg-white p-4 rounded-sm ">
                            <h2 className="font-medium mb-4">PRICE DETAILS</h2>
                            <div className="space-y-2">
                                <div className="flex justify-between">
                                    <span>Price (1 item)</span>
                                    <span>₹{productPrice.toLocaleString('en-IN')}</span>
                                </div>
                                <div className="flex justify-between">
                                    <span>Discount</span>
                                    <span className="text-green-600">- ₹{discount.toLocaleString('en-IN')}</span>
                                </div>

                                <div className="border-t pt-2 font-medium flex justify-between">
                                    <span>Total Payable</span>
                                    <span>₹{discountedPrice.toLocaleString('en-IN')}</span>
                                </div>

                                <div className="text-green-600 font-medium mt-2 md:mt-4">
                                    Your Total Savings on this order ₹{total.toLocaleString('en-IN')}
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