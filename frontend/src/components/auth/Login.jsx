import React, { useState, useEffect } from 'react';
import Navbar from '../shared/Navbar';
import { Input } from '../ui/input';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSpinner } from '@fortawesome/free-solid-svg-icons';
import { useDispatch, useSelector } from 'react-redux';
import { setUser, setLoading } from '@/redux/authSlice'; // Adjust path if necessary
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useNavigate } from 'react-router-dom';
import axios from 'axios'; // Make sure axios is imported

const BackendURL = import.meta.env.VITE_BACKEND_URL;

const Login = () => {
  const { user, loading } = useSelector((store) => store.auth);
  const [input, setInput] = useState({
    email: "",
    password: "",
    rememberMe: false, 
  });

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const changeEventHandler = (e) => {
    setInput({ ...input, [e.target.name]: e.target.value });
  };

  const submitHandler = async (e) => {
    e.preventDefault();

    // Check if input fields are filled
    if (!input.email || !input.password) {
      toast.error("Please fill in all fields");
      return;
    }

    try {
      dispatch(setLoading(true));
      // Send login request to backend
      const res = await axios.post(`${BackendURL}/login`, input, {
        headers: {
          "Content-Type": "application/json",
        },
        withCredentials: true,
      });

      if (res.data.success) {
        dispatch(setUser(res.data.user)); // Save user in Redux store
        toast.success(res.data.message); // Show success message
        navigate("/"); // Redirect to home page or dashboard
      }
    } catch (error) {
      console.error("Login error:", error);
      toast.error(error.response?.data?.message || "An error occurred during login");
    } finally {
      dispatch(setLoading(false));
    }
  };

  useEffect(() => {
    if (user) {
      navigate("/"); // Redirect if already logged in
    }
  }, [user, navigate]);

  return (
    <div>
      <Navbar />
      <div className="flex items-center justify-center min-h-screen bg-gray-100">
        <div className="grid grid-cols-1 md:grid-cols-2 bg-white shadow-lg rounded-3xl overflow-hidden max-w-8xl">
          
          <div className="flex flex-col items-center justify-center bg-[#FFFACD] p-8">
            <img src="/assets/illustrations/graduate.svg" alt="Logo" className="w-64 mb-5" />
            <p className="text-[#cd7f32] text-3xl font-semibold font-mono mb-3">A few clicks away</p>
            <p className="text-[#cd7f32] text-center font-mono">
              from finding your dream college.
            </p>
          </div>

          <div className="flex flex-col justify-center p-10">
            <h2 className="text-[#cd7f32] text-3xl font-bold mb-5">Welcome Back!</h2>
            <p className="text-[#cd7f32] mb-8">We are happy to have you back.</p>

            <form onSubmit={submitHandler}>
              <div className="mb-4">
                <Input
                  type="email"
                  name="email"
                  placeholder="Email address"
                  value={input.email}
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
                  onChange={changeEventHandler}
                  required
                />
              </div>
              <div className="flex items-center justify-between mb-6">
                <label className="inline-flex items-center">
                  <input
                    type="checkbox"
                    name="rememberMe"
                    checked={input.rememberMe}
                    onChange={changeEventHandler}
                    className="text-blue-500 focus:ring-blue-500"
                  />
                  <span className="ml-2 text-sm text-gray-500">Remember Me</span>
                </label>
                <a href="#" className="text-sm text-blue-500 hover:underline">Forgot Password?</a>
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
                  "Login"
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
              Don't have an account? <a href="/register" className="text-blue-500 hover:underline">Register</a>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
