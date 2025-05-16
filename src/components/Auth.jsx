import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { User, Mail, Phone, Home, Lock, Loader2, LogIn, UserPlus, Eye, EyeOff, Calendar, Coffee } from 'lucide-react';

function Auth({ onLogin }) {
  const [isLogin, setIsLogin] = useState(true);
  const [form, setForm] = useState({
    email: '',
    password: '',
    name: '',
    phone: '',
    address: ''
  });
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    const url = `https://hotel-management-back.vercel.app/auth/${isLogin ? 'login' : 'register'}`;

    try {
      const res = await axios.post(url, form);
      if (isLogin) {
        localStorage.setItem("token", res.data.access_token);
        localStorage.setItem("isAdmin", res.data.is_admin);
        localStorage.setItem("user", JSON.stringify(res.data.user));
        onLogin();
        // Redirect admin users to admin dashboard
        if (res.data.is_admin) {
          navigate('/admin-dashboard');
        } else {
          navigate('/'); // Navigate regular users to home page
        }
      } else {
        // Show success message and switch to login
        setError('success:Registration successful! Please log in with your credentials.');
        setIsLogin(true);
        // Reset form after successful registration
        setForm({
          email: '',
          password: '',
          name: '',
          phone: '',
          address: ''
        });
      }
    } catch (err) {
      setError(err.response?.data?.error || "Authentication failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const toggleForm = () => {
    setIsLogin(!isLogin);
    setError('');
    setForm({
      email: '',
      password: '',
      name: '',
      phone: '',
      address: ''
    });
  };

  // Hero features for the side panel
  const features = [
    { icon: <Calendar className="h-6 w-6 text-white" />, text: "Easy Booking Process" },
    { icon: <Coffee className="h-6 w-6 text-white" />, text: "Exclusive Member Benefits" },
    { icon: <Home className="h-6 w-6 text-white" />, text: "Premium Room Selection" }
  ];

  return (
    <div className="min-h-screen flex bg-gray-50">
      {/* Left Side - Hero Image & Content */}
      <div className="hidden lg:flex lg:w-1/2 bg-blue-900 text-white relative overflow-hidden">
        {/* Gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-br from-blue-800 to-blue-900 opacity-90"></div>
        
        {/* Hotel Image */}
        <div className="absolute inset-0 bg-cover bg-center" 
             style={{backgroundImage: "url('https://images.unsplash.com/photo-1566073771259-6a8506099945?q=80&w=1200&auto=format&fit=crop')", opacity: 0.4}}></div>
        
        {/* Content overlay */}
        <div className="relative z-10 flex flex-col justify-center px-12 py-20">
          <div className="mb-8">
            <div className="inline-block p-3 rounded-full bg-white/10 backdrop-blur-sm mb-6">
              <div className="text-4xl font-bold">Grand Hotel</div>
            </div>
            <h1 className="text-4xl font-bold mb-4">Experience Luxury at Every Stay</h1>
            <p className="text-xl opacity-90 mb-8">Join thousands of travelers who choose our premium accommodations worldwide.</p>
          </div>
          
          {/* Features List */}
          <div className="space-y-6">
            {features.map((feature, index) => (
              <div key={index} className="flex items-center space-x-4">
                <div className="flex-shrink-0 p-2 rounded-full bg-white/10 backdrop-blur-sm">
                  {feature.icon}
                </div>
                <span className="text-lg font-medium">{feature.text}</span>
              </div>
            ))}
          </div>
          
          {/* Testimonial */}
          <div className="mt-auto pt-12">
            <div className="bg-white/10 backdrop-blur-sm p-6 rounded-xl">
              <p className="italic mb-4">"The best hotel booking experience I've ever had. Seamless process and amazing rooms!"</p>
              <div className="font-medium">- Sarah J., Verified Guest</div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Right Side - Auth Form */}
      <div className="w-full lg:w-1/2 flex items-center justify-center p-6">
        <div className="max-w-md w-full">
          {/* Card Container */}
          <div className="bg-white rounded-2xl shadow-xl p-8">
            {/* Header */}
            <div className="text-center mb-8">
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-blue-100 mb-4">
                {isLogin ? (
                  <LogIn className="h-8 w-8 text-blue-800" />
                ) : (
                  <UserPlus className="h-8 w-8 text-blue-800" />
                )}
              </div>
              <h2 className="text-3xl font-bold text-gray-900 mb-2">
                {isLogin ? 'Welcome Back!' : 'Create Account'}
              </h2>
              <p className="text-gray-600">
                {isLogin 
                  ? 'Please sign in to your account' 
                  : 'Fill in your details to get started'}
              </p>
            </div>

            {/* Error/Success Message */}
            {error && (
              <div className={`mb-6 p-4 rounded-lg ${
                error.startsWith('success:')
                  ? 'bg-green-50 text-green-800 border border-green-200'
                  : 'bg-red-50 text-red-800 border border-red-200'
              }`}>
                {error.replace('success:', '')}
              </div>
            )}

            {/* Form */}
            <form className="space-y-6" onSubmit={handleSubmit}>
              {!isLogin && (
                <>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <User className="h-5 w-5 text-gray-400" />
                    </div>
                    <input
                      type="text"
                      required
                      className="pl-10 w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent placeholder-gray-400 text-gray-900"
                      placeholder="Full Name"
                      value={form.name}
                      onChange={(e) => setForm({ ...form, name: e.target.value })}
                    />
                  </div>

                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <Phone className="h-5 w-5 text-gray-400" />
                    </div>
                    <input
                      type="tel"
                      required
                      className="pl-10 w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent placeholder-gray-400 text-gray-900"
                      placeholder="Phone Number"
                      value={form.phone}
                      onChange={(e) => setForm({ ...form, phone: e.target.value })}
                    />
                  </div>

                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <Home className="h-5 w-5 text-gray-400" />
                    </div>
                    <input
                      type="text"
                      className="pl-10 w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent placeholder-gray-400 text-gray-900"
                      placeholder="Address (Optional)"
                      value={form.address}
                      onChange={(e) => setForm({ ...form, address: e.target.value })}
                    />
                  </div>
                </>
              )}

              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Mail className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  type="email"
                  required
                  className="pl-10 w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent placeholder-gray-400 text-gray-900"
                  placeholder="Email address"
                  value={form.email}
                  onChange={(e) => setForm({ ...form, email: e.target.value })}
                />
              </div>

              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Lock className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  type={showPassword ? "text" : "password"}
                  required
                  className="pl-10 w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent placeholder-gray-400 text-gray-900"
                  placeholder="Password"
                  value={form.password}
                  onChange={(e) => setForm({ ...form, password: e.target.value })}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute inset-y-0 right-0 pr-3 flex items-center"
                >
                  {showPassword ? (
                    <EyeOff className="h-5 w-5 text-gray-400 hover:text-gray-600" />
                  ) : (
                    <Eye className="h-5 w-5 text-gray-400 hover:text-gray-600" />
                  )}
                </button>
              </div>

              {isLogin && (
                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <input
                      id="remember-me"
                      name="remember-me"
                      type="checkbox"
                      className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                    />
                    <label htmlFor="remember-me" className="ml-2 block text-sm text-gray-700">
                      Remember me
                    </label>
                  </div>
                  <div className="text-sm">
                    <a href="#" className="font-medium text-blue-700 hover:text-blue-800">
                      Forgot password?
                    </a>
                  </div>
                </div>
              )}

              <div>
                <button
                  type="submit"
                  disabled={loading}
                  className="w-full flex justify-center items-center py-3 px-4 border border-transparent rounded-lg shadow-sm text-sm font-medium text-white bg-blue-800 hover:bg-blue-900 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed transition-colors duration-200"
                >
                  {loading ? (
                    <>
                      <Loader2 className="animate-spin -ml-1 mr-2 h-5 w-5" />
                      {isLogin ? 'Signing in...' : 'Creating account...'}
                    </>
                  ) : (
                    <>
                      {isLogin ? (
                        <LogIn className="h-5 w-5 mr-2" />
                      ) : (
                        <UserPlus className="h-5 w-5 mr-2" />
                      )}
                      {isLogin ? 'Sign in' : 'Create account'}
                    </>
                  )}
                </button>
              </div>
            </form>
            
            {/* Social Login Options */}
            {isLogin && (
              <div className="mt-6">
                <div className="relative">
                  <div className="absolute inset-0 flex items-center">
                    <div className="w-full border-t border-gray-300"></div>
                  </div>
                  <div className="relative flex justify-center text-sm">
                    <span className="px-2 bg-white text-gray-500">Or continue with</span>
                  </div>
                </div>
                
                <div className="mt-6 grid grid-cols-2 gap-3">
                  <button className="w-full py-2 px-4 border border-gray-300 rounded-lg shadow-sm bg-white text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500">
                    Google
                  </button>
                  <button className="w-full py-2 px-4 border border-gray-300 rounded-lg shadow-sm bg-white text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500">
                    Facebook
                  </button>
                </div>
              </div>
            )}
            
            {/* Toggle Form Type */}
            <div className="mt-6 text-center">
              <button
                onClick={toggleForm}
                className="text-sm text-blue-800 hover:text-blue-900 font-medium transition-colors duration-200"
              >
                {isLogin ? (
                  <span className="flex items-center justify-center">
                    <UserPlus className="h-4 w-4 mr-1" />
                    Need an account? Register
                  </span>
                ) : (
                  <span className="flex items-center justify-center">
                    <LogIn className="h-4 w-4 mr-1" />
                    Already have an account? Sign in
                  </span>
                )}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Auth;