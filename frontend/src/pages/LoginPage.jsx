import { useState, useEffect} from 'react';
import { Link } from 'react-router-dom';
import { Loader2, Mail, Lock, Eye, EyeOff } from 'lucide-react';
import toast from 'react-hot-toast';
import { ShoppingBag } from 'lucide-react';
import supabase from '../config/DataBase'
import { useNavigate } from 'react-router-dom';

export function Login() {
    const [isLoading, setIsLoading] = useState(false);
    const [showPassword, setShowPassword] = useState(false);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();

    useEffect(() => {
        const checkSession = async () => {
          const { data: { session } } = await supabase.auth.getSession();
          if (session) {
            navigate('/');
          }
        };
    
        checkSession();
      }, [navigate]);

    const handleLogin = async (e) => {
        e.preventDefault();
        setIsLoading(true);

        try {
          const { error } = await supabase.auth.signInWithPassword({
            email,
            password,
          });
    
          if (error) {
            toast.error(error.message || 'Login failed');
            console.error('Login error:', error);
          } 

            toast.success('Welcome back to SagarShop!');
          
        } catch (error) {
          console.error('Error logging in:', error);
          toast.error('An error occurred. Please try again.');
        } finally {
            setIsLoading(false);
        }
    };

    const handleGoogleLogin = async () => {
        setIsLoading(true);
        try {
            const {error } = await supabase.auth.signInWithOAuth({
                provider: 'google',
            });


            if (error) {
                toast.error('google login failed');
                console.error('google login error:', error);
            }

            toast.success('Welcome back to SagarShop!');

        } catch (error) {   
            console.error('Error with google login:', error);
            toast.error('An error occurred. Please try again.');
        }finally {
        setIsLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-orange-50 via-white to-orange-50 flex items-center justify-center p-4">
            <div className="max-w-md w-full">


                <div className="text-center mb-8">
                    <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-orange-600 text-white mb-4">
                        <ShoppingBag className="h-8 w-8" />
                    </div>
                    <h1 className="text-4xl font-bold text-gray-900 mb-2">SagarShop</h1>
                    <p className="text-orange-600 font-medium">Your One-Stop Shopping Destination</p>
                </div>


                <div className='bg-white rounded-2xl shadow-xl p-8 border border-orange-100'>
                    <div className="text-center mb-8">
                        <h2 className="text-2xl font-bold text-gray-900 mb-2">Welcome back!</h2>
                        <p className="text-gray-600">Access your SagarShop account</p>
                    </div>

                    <form onSubmit={handleLogin} className="space-y-6">
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                Email Address
                            </label>
                            <div className="relative">
                                <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
                                <input
                                    type="email"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    className="pl-10 w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
                                    placeholder="you@example.com"
                                    required
                                />
                            </div>
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                Password
                            </label>
                            <div className="relative">
                                <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
                                <input
                                    type={showPassword ? 'text' : 'password'}
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    className="pl-10 w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
                                    placeholder="Enter your password"
                                    required
                                />

                                <button
                                    type="button"
                                    onClick={() => setShowPassword(!showPassword)}
                                    className="absolute right-3 top-3 text-gray-400 hover:text-gray-600"
                                >
                                    {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                                </button>
                            </div>
                            <button 
                            onClick={()=>window.location.href='/forgot-password'}
                            type="button" className="cursor-pointer mt-2 text-sm text-orange-600 hover:text-orange-500">
                                Forgot your password?
                            </button>
                        </div>

                        <button
                            type="submit"
                            disabled={isLoading}
                            className="cursor-pointer w-full bg-orange-600 text-white py-3 px-4 rounded-lg hover:bg-orange-700 focus:ring-4 focus:ring-orange-200 transition-colors disabled:opacity-50 flex items-center justify-center font-medium"
                        >
                            {isLoading ? (
                                <Loader2 className="animate-spin h-5 w-5" />
                            ) : (
                                <span>Login</span>
                            )}
                        </button>

                        <div className="relative my-6">
                            <div className="absolute inset-0 flex items-center">
                                <div className="w-full border-t border-gray-300"></div>
                            </div>
                            <div className="relative flex justify-center text-sm">
                                <span className="px-2 bg-white text-gray-500">Or continue with</span>
                            </div>
                        </div>

                        <button
                            type="button"
                            onClick={handleGoogleLogin}
                            disabled={isLoading}
                            className="cursor-pointer w-full flex items-center justify-center gap-2 bg-white text-gray-700 py-3 px-4 rounded-lg border border-gray-300 hover:bg-gray-50 focus:ring-4 focus:ring-gray-100 transition-colors font-medium"
                        >
                            <svg className="h-5 w-5" viewBox="0 0 24 24">
                                <path
                                    d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                                    fill="#4285F4"
                                />
                                <path
                                    d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                                    fill="#34A853"
                                />
                                <path
                                    d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                                    fill="#FBBC05"
                                />
                                <path
                                    d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                                    fill="#EA4335"
                                />
                            </svg>
                            <span>Continue with Google</span>
                        </button>
                    </form>

                    <p className="mt-6 text-center text-sm text-gray-600">
                        Don&apos;t have an account?
                        <Link to="/signup" className="ml-1 text-orange-600 hover:text-orange-500 font-medium">
                            Sign up
                        </Link>
                    </p>
                </div>
            </div>
        </div>

    );
}

export default Login;