import React, { useState } from 'react';
import Navbar from '../shared/Navbar';
import { Input } from '../ui/input';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSpinner } from '@fortawesome/free-solid-svg-icons';

const Register = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
    rememberMe: false,
  });

  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === 'checkbox' ? checked : value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => {
      console.log(formData);
      setLoading(false);
    }, 2000);
  };

  return (
    <div>
      <Navbar />
      <div className="flex items-center justify-center min-h-screen bg-gray-100">
        <div className="grid grid-cols-1 md:grid-cols-2 bg-white shadow-lg rounded-3xl overflow-hidden max-w-8xl">
          
          <div className="flex flex-col items-center justify-center bg-[#FFFACD] p-8">
            <img src="/images/1.png" alt="Logo" className="w-64 mb-5" />
            <p className="text-[#cd7f32] text-3xl font-semibold font-mono mb-3">Be Verified</p>
            <p className="text-[#cd7f32] text-center font-mono">
              Join experienced Designers on this platform.
            </p>
          </div>

          <div className="flex flex-col justify-center p-10">
            <h2 className="text-[#cd7f32] text-3xl font-bold mb-5">Welcome!</h2>
            <p className="text-[#cd7f32] mb-8">We are happy to have you.</p>

            <form onSubmit={handleSubmit}>
              <div className="mb-4">
                <Input
                  type="name"
                  name="name"
                  placeholder="Name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="mb-4">
                <Input
                  type="email"
                  name="email"
                  placeholder="Email address"
                  value={formData.email}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="mb-4">
                <Input
                  type="password"
                  name="password"
                  placeholder="Password"
                  value={formData.password}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="mb-4">
                <Input
                  type="password"
                  name="confirmPassword"
                  placeholder="Confirm Password"
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  required
                />
              </div>

              <button
                type="submit"
                className="w-full bg-[#FFFACD] text-[#cd7f32] p-3 rounded-lg hover:bg-[#f7e7ce] hover:text-[#cd7f32] transition duration-200 flex justify-center items-center"
                disabled={loading}
              >
                {loading ? (
                  <span className="flex items-center gap-2">
                    <FontAwesomeIcon icon={faSpinner} spin />
                    Please wait...
                  </span>
                ) : (
                  "Register"
                )}
              </button>
            </form>

            <div className="flex mt-6 gap-2">
              <div className="bg-gray-600 mt-3 w-full h-0.5 flex items-center justify-center"></div>
              <div>OR</div>
              <div className="bg-gray-600 mt-3 w-full h-0.5 flex items-center justify-center"></div>
            </div>

            <div className="mt-6 flex gap-4">
              <button className="w-full text-sm bg-gray-100 text-gray-700 p-3 rounded-lg flex items-center justify-center hover:bg-gray-200">
                <img src="/assets/logos/Microsoft_Logo.png" alt="Google Logo" className="size-5 mr-3" />
                Sign In with Microsoft
              </button>
              <button className="w-full text-sm bg-gray-100 text-gray-700 p-3 rounded-lg flex items-center justify-center hover:bg-gray-200">
                <img src="/assets/logos/Google_Logo.png" alt="Google Logo" className="size-8 mr-3" />
                Sign In with Google
              </button>
            </div>

            <p className="mt-6 text-center text-sm">
              Already have an account? <a href="/login" className="text-blue-500 hover:underline">Login</a>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;
