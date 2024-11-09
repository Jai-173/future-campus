import React, { useState, useEffect } from 'react';
import Navbar from '../shared/Navbar';
import { Input } from '../ui/input';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSpinner } from '@fortawesome/free-solid-svg-icons';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';
import { toast } from 'sonner';
import 'react-toastify/dist/ReactToastify.css';
import { setLoading } from '@/redux/authSlice';

const BackendURL = import.meta.env.VITE_BACKEND_URL;

const Register = () => {
  const { user, loading } = useSelector((store) => store.auth);
  const [input, setInput] = useState({
    name: "",
    email: "",
    phoneNumber: "",
    password: "",
  });
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const changeEventHandler = (e) => {
    setInput({ ...input, [e.target.name]: e.target.value });
  };

  const submitHandler = async (e) => {
    e.preventDefault();
  
    // Basic validation to ensure all fields are filled
    if (!input.name || !input.email || !input.phoneNumber || !input.password) {
      toast.error("Please fill in all fields");
      return;
    }
  
    const data = {
      fullname: input.name,
      email: input.email,
      phoneNumber: input.phoneNumber,
      password: input.password,
    };    
  
    try {
      dispatch(setLoading(true));
      const res = await axios.post(`${BackendURL}/register`, data, {
        headers: { "Content-Type": "application/json" }, // Ensure data is sent as JSON
        withCredentials: true,
      });
  
      if (res.data.success) {
        navigate("/login");
        toast.success(res.data.message);
      }
    } catch (error) {
      console.error("Signup error:", error);
      if (error.response) {
        toast.error(error.response.data?.message || "An error occurred during signup");
      } else {
        toast.error("Network error. Please try again.");
      }
    } finally {
      dispatch(setLoading(false));
    }
  };  

  useEffect(() => {
    if (user) {
      navigate("/");  // Only navigate if user is properly set
    }
  }, [user, navigate]);  

  return (
    <div>
      <Navbar />
      <div className="flex items-center justify-center min-h-screen bg-gray-100">
        <div className="grid grid-cols-1 md:grid-cols-2 bg-white shadow-lg rounded-3xl overflow-hidden max-w-8xl">
          
          <div className="flex flex-col items-center justify-center bg-[#FFFACD] p-8">
            <img src="/assets/illustrations/admitted.svg" alt="Logo" className="w-64 mb-5" />
            <p className="text-[#cd7f32] text-3xl font-semibold font-mono mb-3">Be Verified</p>
            <p className="text-[#cd7f32] text-center font-mono">
              Join experienced Designers on this platform.
            </p>
          </div>

          <div className="flex flex-col justify-center p-10">
            <h2 className="text-[#cd7f32] text-3xl font-bold mb-5">Welcome!</h2>
            <p className="text-[#cd7f32] mb-8">We are happy to have you.</p>

            <form onSubmit={submitHandler}>
              <div className="mb-4">
                <Input
                  type="name"
                  name="name"
                  placeholder="Name"
                  value={input.name}
                  autoComplete="current-name"
                  onChange={changeEventHandler}
                  required
                />
              </div>
              <div className="mb-4">
                <Input
                  type="email"
                  name="email"
                  placeholder="Email address"
                  value={input.email}
                  autoComplete="current-email"
                  onChange={changeEventHandler}
                  required
                />
              </div>
              <div className="mb-4">
                <Input
                  type="text"
                  name="phoneNumber"
                  placeholder="Phone Number"
                  value={input.phoneNumber}
                  autoComplete="current-phone"
                  onChange={changeEventHandler}
                  required
                />
              </div>
              <div className="mb-4">
                <Input
                  type="password"
                  name="password"
                  placeholder="Password"
                  value={input.password}
                  autoComplete="current-password"
                  onChange={changeEventHandler}
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
