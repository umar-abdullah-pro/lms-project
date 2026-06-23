import { useState } from 'react';
import axios from 'axios';
import { useNavigate, Link } from 'react-router-dom';

const Login = () => {
  const [formData, setFormData] = useState({ email: '', password: '' });
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    try {
      const response = await axios.post('http://localhost:3000/api/auth/login', formData);
      localStorage.setItem('token', response.data.token);
      navigate('/'); 
    } catch (err) {
      setError(err.response?.data?.message || 'Invalid credentials');
    }
  };

  return (
    <div className="flex min-h-screen">
      
      {/* LEFT SIDE: Purple Branding Section */}
      <div className="hidden lg:flex lg:w-1/2 bg-brand-purple p-12 flex-col justify-center">
        <div className="max-w-md mx-auto">
          {/* Small book icon replacement */}
          <div className="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center mb-8">
            <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
            </svg>
          </div>
          <h1 className="text-4xl lg:text-5xl font-extrabold text-white leading-tight mb-6">
            Welcome back — let's pick up <span className="underline decoration-brand-yellow decoration-4 underline-offset-8">right where you left off.</span>
          </h1>
          <p className="text-brand-purple-100 text-lg text-white/80">
            Your progress, streaks and saved lessons are all exactly how you left them.
          </p>
        </div>
      </div>

      {/* RIGHT SIDE: Login Form */}
      <div className="w-full lg:w-1/2 flex items-center justify-center p-8 bg-brand-beige">
        <div className="w-full max-w-md bg-white rounded-4xl p-10 shadow-sm border border-gray-100">
          <h2 className="text-3xl font-extrabold text-gray-900 mb-2">Log in</h2>
          <p className="text-gray-500 mb-8 font-medium">
            New to Learnly? <Link to="/register" className="text-brand-purple hover:underline">Create an account</Link>
          </p>

          {error && <div className="p-4 mb-6 text-sm text-red-600 bg-red-50 rounded-xl font-medium">{error}</div>}

          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label className="block text-sm font-bold text-gray-700 mb-2">Email</label>
              <input 
                type="email" 
                name="email" 
                placeholder="you@school.edu"
                value={formData.email} 
                onChange={handleChange} 
                className="w-full px-4 py-3 bg-white border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-brand-purple/50 focus:border-brand-purple transition-colors"
                required 
              />
            </div>

            <div>
              <label className="block text-sm font-bold text-gray-700 mb-2">Password</label>
              <input 
                type="password" 
                name="password" 
                placeholder="••••••••"
                value={formData.password} 
                onChange={handleChange} 
                className="w-full px-4 py-3 bg-white border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-brand-purple/50 focus:border-brand-purple transition-colors"
                required 
              />
            </div>

            <button 
              type="submit" 
              className="w-full py-3.5 mt-4 text-white font-bold bg-brand-coral rounded-full hover:bg-[#ff554a] transition-all shadow-[0_8px_20px_rgb(255,107,96,0.3)] hover:shadow-[0_10px_25px_rgb(255,107,96,0.4)] transform hover:-translate-y-0.5"
            >
              Log in
            </button>
          </form>
        </div>
      </div>
      
    </div>
  );
};

export default Login;