
import { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGoogle, faMicrosoft } from '@fortawesome/free-brands-svg-icons';
import { faSpinner } from '@fortawesome/free-solid-svg-icons';
import Navbar from "../shared/Navbar";
import { useNavigate } from 'react-router-dom';
import { Input } from '../ui/input';
import { Button } from '../ui/button';

// Reusable components
const SocialIcon = ({ icon }) => (
  <a className="flex justify-center items-center w-10 h-10 border border-[#D4AF37] rounded-full cursor-pointer text-[#D4AF37] transition-all duration-[0.6s] ease-in-out hover:bg-[#D4AF37] hover:text-[#fff] hover:border-[#D4AF37]">
    <FontAwesomeIcon icon={icon} />
  </a>
);

const AuthButton = ({ text, onClick, loading }) => (
  <button
    className="px-6 py-2 text-sm text-[#fff] bg-[#D4AF37] border rounded-lg mt-4 transition-all duration-[0\.6s] ease-in-out hover:bg-[#fff] hover:text-[#D4AF37] hover:border-[#D4AF37]"
    onClick={onClick}
    disabled={loading}
  >
    {loading ? (
      <>
        <FontAwesomeIcon icon={faSpinner} className='animate-spin mr-2' />
        Please wait...
      </>
    ) : (
      text
    )}
  </button>
);

const AuthForm = ({ isLogin, handleAuth, loading, setLoading }) => (
  <form className="flex flex-col items-center justify-center h-full px-10 bg-[#fff]">
    <h1 className="text-2xl mb-6 text-[#D4AF37]">{isLogin ? "Login" : "Signup"}</h1>
    <div className="flex space-x-3 mb-4">
      <SocialIcon icon={faGoogle} />
      <SocialIcon icon={faMicrosoft} />
    </div>
    {!isLogin && <Input type="text" placeholder="Name" />}
    {!isLogin && <Input type="tel" placeholder="Phone Number" />}
    <Input type="email" placeholder="Email" />
    <Input type="password" placeholder="Password" />
    {isLogin && <a href="/" className="text-[#D4AF37] text-sm mt-4">Forgot Your Password?</a>}
    <AuthButton text={isLogin ? "Login" : "Signup"} onClick={handleAuth} loading={loading} />
  </form>
);

function Login1() {
  const [isRegisterActive, setIsRegisterActive] = useState(false);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const toggleForm = () => setIsRegisterActive(!isRegisterActive);

  const handleAuth = async (e) => {
    e.preventDefault();
    setLoading(true);
    await new Promise((resolve) => setTimeout(resolve, 2000));
    setLoading(false);
    navigate("/login");
  };

  return (
    <div>
      <Navbar />
      <div className="flex justify-center items-center min-h-screen bg-gray-800 h-screen bg-cover bg-center login-bg">
        <div className="relative w-[768px] max-w-full min-h-[480px] bg-[#fff] rounded-[30px] shadow-lg overflow-hidden">
          <div className={`absolute top-0 h-full w-1/2 transition-all duration-[0\.6s] transform ${isRegisterActive ? 'translate-x-full opacity-100 z-20' : 'opacity-0 z-10 pointer-events-none'}`}>
            <AuthForm isLogin={true} handleAuth={handleAuth} loading={loading} />
          </div>

          <div className={`absolute top-0 left-0 h-full w-1/2 transition-all duration-[0\.6s] transform ${isRegisterActive ? 'translate-x-full opacity-0 z-10 pointer-events-none' : 'opacity-100 z-20'}`}>
            <AuthForm isLogin={false} handleAuth={handleAuth} loading={loading} />
          </div>

          <div className={`absolute top-0 left-1/2 h-full w-1/2 bg-[#D4AF37] text-[#fff] flex justify-center items-center transition-all duration-[0\.6s] transform ${isRegisterActive ? 'translate-x-[-100%]' : 'translate-x-0'}`}>
            <div className="flex flex-col items-center text-center">
              <h1 className="text-2xl mb-4">{isRegisterActive ? "Welcome!" : "Welcome Back!"}</h1>
              <p className="text-sm mb-4">{isRegisterActive ? "Don't have an account? Create one!" : "Already have an account?"}</p>
              <Button variant="outline" onClick={toggleForm}>
                {isRegisterActive ? "Signup" : "Login"}
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login1;
