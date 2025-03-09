import { useState, useEffect } from 'react';
import { Minus, Plus, ShieldCheck } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import image from "../assets/images/shopping.png"
import useAuth from '../components/contexts/AuthContext';

function CartPage() {
    const [item, setItem] = useState(0);
    const [total, setTotal] = useState(0);
    const [discount, setDiscount] = useState(0);
    const [payable, setPayable] = useState(0);
    const navigate = useNavigate();
    const [isLoading, setIsLoading] = useState(false);
    const [carts, setCarts] = useState([]);
    const [products, setProducts] = useState([]) // cart items
    const URL = import.meta.env.VITE_BACKEND_URL;
    const [isProduct, setisProduct] = useState(false);
    const { getAccessToken } = useAuth();
    const userId = JSON.parse(atob(getAccessToken().split('.')[1])).sub;
    // console.log(carts)

    // Fetch Carts
    const fetchCarts = async () => {


        const token = getAccessToken();

        if (!token) {
            console.log("token not found")
            return;
        }
        const userId = JSON.parse(atob(token.split('.')[1])).sub;

        if (!userId) {
            console.log("userId not found")
            return;
        }

        try {
            const response = await fetch(`${URL}/api/carts/${userId}`, {
                headers: {
                    'Content-Type': 'application/json',
                }
            });

            const data = await response.json();
            if (data.length > 0) {
                setisProduct(true)
            }
            setCarts(data)
        } catch (error) {
            console.error("Error fetching carts:", error); // Use console.error for errors
        }
    };

    useEffect(() => {
        fetchCarts();
    }, []);

    // Fetch Products
    const fetchProducts = async () => {
        setIsLoading(true);

        try {
            const promises = carts.map(async (cart) => {
                const response = await fetch(`${URL}/api/products/${cart.product_id}`, {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                    }
                });
                const data = await response.json();
                return { ...data, cartId: cart.cart_id }; // Include cartId for later use (e.g., removing from cart)
            });

            const productsData = await Promise.all(promises);
            setProducts(productsData);
        } catch (error) {
            console.error("Error fetching products:", error);
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        if (carts.length > 0) { // Only fetch products if there are items in the cart
            fetchProducts();
        } else {
            setProducts([]); // Ensure products is empty when cart is empty
        }
    }, [carts]);


    // Handle Quantity Change
    const handleQuantityChange = async (newQuantity, productId) => {

        const updatedProducts = carts.map((cart) => {

            if (cart.product_id === productId) {

                const qty = Math.max(1, Math.min(10, newQuantity));
                return {
                    ...cart,
                    quantity: qty,
                };
            }
            return cart;
        });

        setCarts(updatedProducts);

        try {

            updatedProducts.map(async (cart) => {
                await fetch(`${URL}/api/carts/${cart.cart_id}/${cart.quantity}`, {
                    method: 'PUT',
                    headers: {
                        'Content-Type': 'application/json',
                    }
                });

            });

            console.log(carts)
            fetchProducts();

            // return (

            //     <div>


            //         <Popup
            //             theme="ios"
            //             themeVariant="dark"
            //         />


            //     </div>
            // )


        } catch (error) {
            console.error('Error updating cart:', error);
            throw new Error('Server Error: Unable to update cart');
        }
    };

    // Handle Product Details
    const handleProductsDetails = () => {
        setItem(carts.length);

        // Calculate total, discount, and payable amounts
        let calculatedTotal = 0;
        let calculatedDiscount = 0;

        products.forEach(product => {
            carts.forEach(cart => {
                if (cart.product_id === product.product_id) {
                    calculatedTotal += product.mrp * cart.quantity; // Use quantity from cart
                    calculatedDiscount += (product.mrp - product.price) * cart.quantity; // Use quantity from cart
                }
            });
        });

        setTotal(calculatedTotal);
        setDiscount(calculatedDiscount);
        setPayable(calculatedTotal - calculatedDiscount);
    };

    useEffect(() => {
        handleProductsDetails();
    }, [products]);


    // Handle Remove From Cart
    const handleRemoveFromCart = async (userId, productId) => {
        if (!userId || !productId) {
            console.error('Invalid ID');
            return;
        }

        try {
            const response = await fetch(`${URL}/api/remove-product-from-carts/${userId}/${productId}`, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                }
            });

            if (!response.ok) {
                // Handle HTTP errors
                console.error(`HTTP error! status: ${response.status}`);
                return;
            }

            window.location.reload();



        } catch (error) {
            console.error("Error removing from cart:", error);
        } finally {
            fetchCarts(); // Refresh the cart after removing an item
        }
    };


    return (
        <div className="min-h-screen bg-gray-50">
            <div className="container mx-auto px-4 py-8">
                {!isProduct && (
                    <div className="bg-white p-6 rounded shadow-sm">
                        <div className="flex gap-6">
                            <div className="flex-1 flex flex-col items-center justify-center">
                                <img src={image} alt="img" className="w-25 h-25" />
                                <h3 className="font-stretch-100% text-gray-900 text-2xl mt-4">Your cart is empty</h3>
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

                {isLoading && (
                    <div className="flex gap-8">
                        <div className="flex-1 space-y-4">
                            <div className="flex items-center justify-center">
                                <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-gray-900"></div>
                            </div>
                        </div>
                    </div>
                )}
                {!isLoading && isProduct && (
                    <div className="flex gap-8">
                        <div className="flex-1 space-y-4">
                            {/* Cart Item */}
                            {carts.map((cart) => {
                                const product = products.find((product) => product.product_id === cart.product_id);
                                if (!product) return null;
                                return (
                                    <div className="bg-white p-6 rounded shadow-sm" key={product.product_id}>
                                        <div className="flex gap-6">
                                            <img
                                                onClick={() => navigate(`/product/${product.product_id}`)}
                                                src={product.image}
                                                alt={product.heading}
                                                className="w-24 h-24 object-contain cursor-pointer hover:scale-101 duration-200"
                                            />
                                            <div className="flex-1">
                                                <h3 onClick={() => navigate(`/product/${product.product_id}`)} className="font-medium cursor-pointer hover:text-orange-400 ">{product.heading}</h3>
                                                <p className="text-sm text-gray-500">{product.description}</p>

                                                <div className="flex items-center gap-4 mt-4">
                                                    <span className="text-xl font-bold">₹{payable.toLocaleString('en-IN')}</span>
                                                    <span className="text-gray-500 line-through">₹{total.toLocaleString('en-IN')}</span>
                                                    <span className="text-green-600">{total && payable && (100 - Math.round((payable / total) * 100))}% off</span>
                                                </div>

                                                <div className="flex items-center gap-6 mt-4">
                                                    <div className="flex items-center gap-2">
                                                        <button
                                                            onClick={() => handleQuantityChange((cart.quantity || 1) - 1, cart.product_id)}
                                                            className={`cursor-pointer w-8 h-8 flex items-center justify-center border rounded-full text-gray-600`}
                                                        >
                                                            <Minus className="w-4 h-4" />
                                                        </button>
                                                        <input
                                                            type="text"
                                                            value={cart.quantity || 1}
                                                            onChange={(e) => handleQuantityChange(Number(e.target.value), cart.product_id)}
                                                            className="w-12 text-center border rounded"
                                                        />
                                                        <button
                                                            onClick={() => handleQuantityChange((cart.quantity || 1) + 1, cart.product_id)}
                                                            className={`cursor-pointer w-8 h-8 flex items-center justify-center border rounded-full text-gray-600`}
                                                        >
                                                            <Plus className="w-4 h-4" />
                                                        </button>
                                                    </div>
                                                    <button onClick={() => handleRemoveFromCart(userId, product.product_id)} className="font-medium cursor-pointer">REMOVE</button>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                );
                            })}
                            {/* Extended Warranty */}
                            <div className="bg-white p-6 rounded shadow-sm">
                                <div className="flex gap-4">
                                    <img
                                        src="https://static-assets-web.flixcart.com/fk-p-linchpin-web/fk-cp-zion/img/shield_5f9216.png"
                                        alt="Extended Warranty"
                                        className="w-12 h-12"
                                    />
                                    <div className="flex-1">
                                        <h3 className="font-medium">Extended Warranty by OneAssist</h3>
                                        <p className="text-sm text-gray-600 mt-2">
                                            Get brand authorised repairs with free pickup and drop. Absolutely no hidden charges!{' '}
                                            <button className="text-blue-600">Know More</button>
                                        </p>
                                    </div>
                                    <button className="px-8 py-2 bg-orange-500 text-white rounded">
                                        Add
                                    </button>
                                </div>
                            </div>
                        </div>

                        {/* Price Details */}
                        <div className="w-[320px]">
                            <div className="bg-white p-4 rounded shadow-sm">
                                <h2 className="font-medium text-gray-500 pb-4 border-b">PRICE DETAILS</h2>
                                <div className="space-y-4 py-4">
                                    <div className="flex justify-between">
                                        <span>Price ({item} item)</span>
                                        <span>₹{total ? total.toLocaleString('en-IN') : 'N/A'}</span>
                                    </div>

                                    <div className="flex justify-between">
                                        <span>Discount</span>
                                        <span className="text-green-600">− ₹{discount ? discount.toLocaleString('en-IN') : 'N/A'}</span>
                                    </div>

                                    <div className="flex justify-between font-bold text-lg pt-4 border-t">
                                        <span>Total Amount</span>
                                        <span>₹{payable ? payable.toLocaleString('en-IN') : 'N/A'}</span>
                                    </div>

                                    <p className="text-green-600 font-medium">You will save ₹{discount ? discount.toLocaleString('en-IN') : 'N/A'} on this order</p>

                                    <Link to="/checkout"> {/*  Using Link to navigate to the checkout page */}
                                        <button className="cursor-pointer w-full py-2 text-white bg-orange-500 rounded-md">Buy Now</button>
                                    </Link>
                                </div>
                                <div className="flex items-center gap-2 text-sm text-gray-500 mt-4 pb-4 border-b">
                                    <ShieldCheck className="w-5 h-5" />
                                    Safe and Secure Payments.Easy returns.100% Authentic products.
                                </div>
                            </div>

                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}

export default CartPage;
