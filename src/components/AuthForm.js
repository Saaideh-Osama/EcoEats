import { useState } from 'react';
import axios from 'axios';
import './AuthForm.css';

const AuthForm = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [isVegetarian, setIsVegetarian] = useState(false); // Changed from dietSystem
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  const phoneRegex = /^(078|077|079)\d{7}$/;
  const passwordRegex = /^(?=.*[A-Z]).{8,}$/;

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    phone: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  const handleVegetarianChange = (e) => {
    setIsVegetarian(e.target.checked); // Changed to boolean toggle
  };

  const validateForm = () => {
    const newErrors = {};
    
    if (!isLogin && !formData.name.trim()) {
      newErrors.name = 'Required';
    }
    
    if (!formData.email.trim()) {
      newErrors.email = 'Required';
    } else if (!emailRegex.test(formData.email)) {
      newErrors.email = 'Invalid email';
    }
    
    if (!isLogin && !formData.phone.trim()) {
      newErrors.phone = 'Required';
    } else if (!isLogin && !phoneRegex.test(formData.phone)) {
      newErrors.phone = 'Must start with 078/077/079';
    }
    
    if (!formData.password.trim()) {
      newErrors.password = 'Required';
    } else if (!passwordRegex.test(formData.password)) {
      newErrors.password = '8+ chars with 1 uppercase';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }
    
    setIsSubmitting(true);
    
    try {
      if (isLogin) {
        const response = await axios.post(
          "https://87e9-92-241-35-12.ngrok-free.app/api/login",
          {
            email: formData.email,
            password: formData.password
          }
        );
        console.log("Login Successful", response.data);
        alert("Login successful!");
      } else {
        const response = await axios.post(
          "https://87e9-92-241-35-12.ngrok-free.app/api/clients/register",
          {
            ...formData,
            is_vegetarian: isVegetarian, // Changed to match backend expectation
            role_id: 2
          },
          {
            headers: {
              "Content-Type": "application/json"
            }
          }
        );
        console.log("Signup Successful", response.data);
        alert("Signup successful! You can now log in.");
      }
    } catch (err) {
      console.error("Error", err.response?.data || err.message);
      setErrors(prev => ({ 
        ...prev, 
        form: err.response?.data?.message || 
        (isLogin ? "Login failed. Please try again." : "Signup failed. Please try again.") 
      }));
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="page">
      <div className="auth-container">
        <div className={`message ${isLogin ? 'login' : 'signup'}`}>
          <div className="btn-wrapper">
            <button 
              type="button"
              className="button" 
              id="signup" 
              onClick={() => setIsLogin(false)}
            >
              Sign Up
            </button>
            <button 
              type="button"
              className="button" 
              id="login" 
              onClick={() => setIsLogin(true)}
            >
              Login
            </button>
          </div>
        </div>
        
        <div className={`form form--signup ${!isLogin ? 'active' : ''}`}>
          <div className="form--heading">
            {isLogin ? 'Welcome Back! Login' : 'Welcome! Sign Up'}
          </div>
          {errors.form && <div className="form-error">{errors.form}</div>}
          <form autoComplete="off" onSubmit={handleSubmit}>
            {!isLogin && (
              <>
                <div className="input-group">
                  <input 
                    type="text" 
                    name="name"
                    placeholder="Name"
                    value={formData.name}
                    onChange={handleChange}
                    className={errors.name ? 'error' : ''}
                  />
                  {errors.name && <span className="error-message">{errors.name}</span>}
                </div>
                <div className="input-group">
                  <input 
                    type="tel"
                    name="phone"
                    placeholder="Phone (0781234567)"
                    value={formData.phone}
                    onChange={handleChange}
                    className={errors.phone ? 'error' : ''}
                  />
                  {errors.phone && <span className="error-message">{errors.phone}</span>}
                </div>
              </>
            )}
            
            <div className="input-group">
              <input 
                type="email" 
                name="email"
                placeholder="Email"
                value={formData.email}
                onChange={handleChange}
                className={errors.email ? 'error' : ''}
              />
              {errors.email && <span className="error-message">{errors.email}</span>}
            </div>
            
            <div className="input-group">
              <input 
                type="password" 
                name="password"
                placeholder="Password (8+ chars with uppercase)"
                value={formData.password}
                onChange={handleChange}
                className={errors.password ? 'error' : ''}
              />
              {errors.password && <span className="error-message">{errors.password}</span>}
            </div>
            
            {!isLogin && (
              <div className="input-group vegetarian-toggle">
                <label>
                  <input 
                    type="checkbox"
                    checked={isVegetarian}
                    onChange={handleVegetarianChange}
                  />
                  <span>Vegetarian</span>
                </label>
              </div>
            )}
            
            <button 
              className="button" 
              type="submit"
              disabled={isSubmitting}
            >
              {isSubmitting ? 'Processing...' : (isLogin ? 'Login' : 'Sign Up')}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AuthForm;