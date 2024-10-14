
import { useState } from 'react';
import Navbar from "../shared/Navbar";
import { useNavigate } from 'react-router-dom';
import { Button } from '../ui/button';
import AuthForm from '../ui/AuthForm';
import { useForm } from '@/hooks/UseForm';


function Login() {
  const [isRegisterActive, setIsRegisterActive] = useState(false);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { signupData, loginData, handleInputChange } = useForm(isRegisterActive);

  const toggleForm = () => {
    setIsRegisterActive(!isRegisterActive);
  };

  const handleAuth = async (e) => {
    e.preventDefault();

    if (isRegisterActive) {
      const { name, phone, email, password } = signupData;
      if (!name || !phone || !email || !password) {
        alert("Please fill all the fields");
        return;
      }
    } else {
      const { email, password } = loginData;
      if (!email || !password) {
        alert("Please fill all the fields");
        return;
      }
    }

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
          <div className={`absolute top-0 h-full w-1/2 transition-all duration-[0.6s] transform ${isRegisterActive ? 'translate-x-full opacity-100 z-20' : 'opacity-0 z-10 pointer-events-none'}`}>
            <AuthForm 
              isLogin={true} 
              handleAuth={handleAuth} 
              loading={loading} 
              handleInputChange={handleInputChange}
              formData={loginData}
            />
          </div>

          <div className={`absolute top-0 left-0 h-full w-1/2 transition-all duration-[0.6s] transform ${isRegisterActive ? 'translate-x-full opacity-0 z-10 pointer-events-none' : 'opacity-100 z-20'}`}>
            <AuthForm 
              isLogin={false} 
              handleAuth={handleAuth} 
              loading={loading} 
              handleInputChange={handleInputChange}
              formData={signupData}
            />
          </div>

          <div className={`absolute top-0 left-1/2 h-full w-1/2 bg-[#D4AF37] text-[#fff] flex justify-center items-center transition-all duration-[0.6s] transform ${isRegisterActive ? 'translate-x-[-100%]' : 'translate-x-0'}`}>
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

export default Login;