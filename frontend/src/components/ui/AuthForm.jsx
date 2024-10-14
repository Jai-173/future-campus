// src/components/ui/AuthForm.jsx
import SocialIcon from './SocialIcon';
import AuthButton from './AuthButton';
import { faGoogle, faMicrosoft } from '@fortawesome/free-brands-svg-icons';
import { Input } from '../ui/input';

const AuthForm = ({ isLogin, handleAuth, loading, handleInputChange, formData }) => (
  <form className="flex flex-col items-center justify-center h-full px-10 bg-[#fff]">
    <h1 className="text-2xl mb-6 text-[#D4AF37]">{isLogin ? "Login" : "Signup"}</h1>
    <div className="flex space-x-3 mb-4">
      <SocialIcon icon={faGoogle} />
      <SocialIcon icon={faMicrosoft} />
    </div>
    {!isLogin && <Input type="text" placeholder="Name" name="signupName" onChange={handleInputChange} />}
    {!isLogin && <Input type="tel" placeholder="Phone Number" name="signupPhone" onChange={handleInputChange} />}
    <Input 
      type="email" 
      placeholder={isLogin ? "Login Email" : "Signup Email"} 
      name={isLogin ? "loginEmail" : "signupEmail"} 
      onChange={handleInputChange} 
    />
    <Input 
      type="password" 
      placeholder={isLogin ? "Login Password" : "Signup Password"} 
      name={isLogin ? "loginPassword" : "signupPassword"} 
      onChange={handleInputChange} 
    />
    {isLogin && <a href="/" className="text-[#D4AF37] text-sm mt-4">Forgot Your Password?</a>}
    <AuthButton text={isLogin ? "Login" : "Signup"} onClick={handleAuth} loading={loading} />
  </form>
);

export default AuthForm;
