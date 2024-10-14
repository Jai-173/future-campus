// src/hooks/useForm.js
import { useState } from 'react';

export const useForm = (isRegisterActive) => {
  const [signupData, setSignupData] = useState({
    name: '',
    phone: '',
    email: '',
    password: '',
  });
  
  const [loginData, setLoginData] = useState({
    email: '',
    password: '',
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    if (isRegisterActive) {
      setSignupData((prevData) => ({
        ...prevData,
        [name]: value,
      }));
    } else {
      setLoginData((prevData) => ({
        ...prevData,
        [name]: value,
      }));
    }
  };

  return { signupData, loginData, handleInputChange };
};