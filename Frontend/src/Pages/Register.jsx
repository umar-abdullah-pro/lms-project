import { useState } from 'react';
import axios from 'axios';
import { useNavigate, Link } from 'react-router-dom';

const Register = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    role: 'student'
  });
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);
    try {
      await axios.post('http://localhost:3000/api/auth/register', formData);
      navigate('/login');
    } catch (err) {
      setError(err.response?.data?.message || 'Registration failed. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen">

      {/* LEFT SIDE: Purple Branding Section */}
      <div className="hidden lg:flex lg:w-1/2 bg-brand-purple p-12 flex-col justify-center">
        <div className="max-w-md mx-auto">

          {/* Icon */}
          <div className="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center mb-8">
            <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
            </svg>
          </div>

          <h1 className="text-4xl lg:text-5xl font-extrabold text-white leading-tight mb-6">
            Start your learning{' '}
            <span className="underline decoration-brand-yellow decoration-4 underline-offset-8">
              journey today.
            </span>
          </h1>

          <p className="text-lg text-white/80 mb-10">
            Join thousands of students and instructors already on Learnly.
          </p>

          {/* Social proof stats */}
          <div className="flex gap-8">
            <div>
              <p className="text-3xl font-extrabold text-white">12k+</p>
              <p className="text-white/60 text-sm font-medium">Students</p>
            </div>
            <div className="w-px bg-white/20" />
            <div>
              <p className="text-3xl font-extrabold text-white">300+</p>
              <p className="text-white/60 text-sm font-medium">Courses</p>
            </div>
            <div className="w-px bg-white/20" />
            <div>
              <p className="text-3xl font-extrabold text-white">95%</p>
              <p className="text-white/60 text-sm font-medium">Satisfaction</p>
            </div>
          </div>
        </div>
      </div>

      {/* RIGHT SIDE: Register Form */}
      <div className="w-full lg:w-1/2 flex items-center justify-center p-8 bg-brand-beige">
        <div className="w-full max-w-md bg-white rounded-[2rem] p-10 shadow-sm border border-gray-100">
          <h2 className="text-3xl font-extrabold text-gray-900 mb-2">Create an account</h2>
          <p className="text-gray-500 mb-8 font-medium">
            Already have one?{' '}
            <Link to="/login" className="text-brand-purple hover:underline">
              Log in
            </Link>
          </p>

          {error && (
            <div className="p-4 mb-6 text-sm text-red-600 bg-red-50 rounded-xl font-medium">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-5">

            {/* Full Name */}
            <div>
              <label className="block text-sm font-bold text-gray-700 mb-2">Full Name</label>
              <input
                type="text"
                name="name"
                placeholder="John Doe"
                value={formData.name}
                onChange={handleChange}
                className="w-full px-4 py-3 bg-white border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-brand-purple/50 focus:border-brand-purple transition-colors"
                required
              />
            </div>

            {/* Email */}
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

            {/* Password */}
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

            {/* Role Selector — styled cards instead of a plain dropdown */}
            <div>
              <label className="block text-sm font-bold text-gray-700 mb-3">I want to join as a...</label>
              <div className="grid grid-cols-2 gap-3">

                {/* Student Card */}
                <button
                  type="button"
                  onClick={() => setFormData({ ...formData, role: 'student' })}
                  className={`flex flex-col items-center gap-2 p-4 rounded-xl border-2 transition-all cursor-pointer ${
                    formData.role === 'student'
                      ? 'border-brand-purple bg-brand-purple/5'
                      : 'border-gray-200 hover:border-gray-300'
                  }`}
                >
                  <svg className={`w-6 h-6 ${formData.role === 'student' ? 'text-brand-purple' : 'text-gray-400'}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 14l9-5-9-5-9 5 9 5z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 14l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14z" />
                  </svg>
                  <span className={`text-sm font-bold ${formData.role === 'student' ? 'text-brand-purple' : 'text-gray-500'}`}>
                    Student
                  </span>
                </button>

                {/* Instructor Card */}
                <button
                  type="button"
                  onClick={() => setFormData({ ...formData, role: 'instructor' })}
                  className={`flex flex-col items-center gap-2 p-4 rounded-xl border-2 transition-all cursor-pointer ${
                    formData.role === 'instructor'
                      ? 'border-brand-purple bg-brand-purple/5'
                      : 'border-gray-200 hover:border-gray-300'
                  }`}
                >
                  <svg className={`w-6 h-6 ${formData.role === 'instructor' ? 'text-brand-purple' : 'text-gray-400'}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                  </svg>
                  <span className={`text-sm font-bold ${formData.role === 'instructor' ? 'text-brand-purple' : 'text-gray-500'}`}>
                    Instructor
                  </span>
                </button>
              </div>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={isLoading}
              className="w-full py-3.5 mt-4 text-white font-bold bg-brand-coral rounded-full hover:bg-[#ff554a] transition-all shadow-[0_8px_20px_rgb(255,107,96,0.3)] hover:shadow-[0_10px_25px_rgb(255,107,96,0.4)] transform hover:-translate-y-0.5 disabled:opacity-60 disabled:cursor-not-allowed disabled:transform-none"
            >
              {isLoading ? 'Creating account...' : 'Create account'}
            </button>
          </form>
        </div>
      </div>

    </div>
  );
};

export default Register;