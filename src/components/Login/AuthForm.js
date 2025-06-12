import { useState } from "react";
import { useEffect } from "react";
import axios from "axios";
import { useLocation } from "react-router-dom";
import { userContext } from "../context/UserContext";
import { useContext } from "react";
import AlertModal from "../Alerts/AlertModal";
import "./AuthForm.css";

const AuthForm = () => {
  const location = useLocation();

  const [isLogin, setIsLogin] = useState(false);
  const [isSignup, setIsSignup] = useState(false);
  const [is_vegetarian, setIsVegetarian] = useState("");
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [alert, setAlert] = useState({ show: false, message: "", type: "" });
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  const phoneRegex = /^(078|077|079)\d{7}$/;
  const passwordRegex = /^(?=.*[A-Z]).{8,}$/;

  useEffect(() => {
    if (location.state?.isLogin) {
      setIsLogin(true); // Ensure login form is shown
    }
    if (location.state?.isSignup) {
      setIsSignup(true); // Ensure signup form is shown
    }
  }, [location]);

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    phone: "",
    is_vegetarian: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));

    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: "" }));
    }
  };

  const handleDietChange = (e) => {
    const value = e.target.value;
    setIsVegetarian(value);
    setFormData((prev) => ({
      ...prev,
      is_vegetarian: value,
    }));
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    if (isLogin) {
      try {
        const response = await axios.post(
          "https://d201-91-186-254-78.ngrok-free.app/api/login",
          {
            email: formData.email,
            password: formData.password,
          }
        );
        console.log("Login Successful", response.data);

        setAlert({
          show: true,
          message: "Login successful!",
          type: "success",
        });

        localStorage.setItem("authToken", response.data.token);

        setTimeout(() => {
          if (response.data.role_id === 2) {
            window.location.href = "/clientmain";
          } else if (response.data.role_id === 1) {
            window.location.href = "/admin";
          } else if (response.data.role_id === 3) {
            window.location.href = "/restdash";
          } else {
            setAlert({
              show: true,
              message: "Invalid role ID. Please contact support.",
              type: "error",
            });
          }
        }, 2000); // small delay to show alert
      } catch (err) {
        console.error("Error", err.response?.data || err.message);
        setErrors((prev) => ({
          ...prev,
          form:
            err.response?.data?.message ||
            (isLogin
              ? "Login failed. Please try again."
              : "Signup failed. Please try again."),
        }));
        setAlert({
          show: true,
          message:
            err.response?.data?.message || "Login failed. Please try again.",
          type: "error",
        });
      } finally {
        setIsSubmitting(false);
      }
    }
  };

  const validateForm = () => {
    const newErrors = {};

    if (isSignup && !formData.name.trim()) {
      newErrors.name = "Required";
    }

    if (isSignup && !formData.phone.trim()) {
      newErrors.phone = "Required";
    } else if (!isLogin && !phoneRegex.test(formData.phone)) {
      newErrors.phone = "Must start with 078/077/079";
    }

    if (!formData.email.trim()) {
      newErrors.email = "Required";
    } else if (!emailRegex.test(formData.email)) {
      newErrors.email = "Invalid email";
    }

    if (!formData.password.trim()) {
      newErrors.password = "Required";
    } else if (!passwordRegex.test(formData.password)) {
      newErrors.password = "8+ chars with 1 uppercase";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSignup = async (e) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    setIsSubmitting(true);

    if (isSignup) {
      try {
        const response = await axios.post(
          "https://d201-91-186-254-78.ngrok-free.app/api/clients/register",
          {
            ...formData,
            role_id: 2,
          },
          {
            headers: {
              "Content-Type": "application/json",
            },
          }
        );
        console.log("Signup Successful", response.data);

        setAlert({
          show: true,
          message: "Signup successful! You can now log in.",
          type: "success",
        });

        // Optionally switch to login form after a delay
        setTimeout(() => {
          setIsLogin(true);
          setIsSignup(false);
          setFormData({
            name: "",
            email: "",
            password: "",
            phone: "",
            is_vegetarian: "",
          });
        }, 2000);
      } catch (err) {
        console.error("Signup error", err.response?.data || err.message);

        setAlert({
          show: true,
          message:
            err.response?.data?.message || "Signup failed. Please try again.",
          type: "error",
        });

        setErrors((prev) => ({
          ...prev,
          form:
            err.response?.data?.message || "Signup failed. Please try again.",
        }));
      } finally {
        setIsSubmitting(false);
      }
    }
  };

  return (
    <div className="page">
      <div className="auth-container">
        <div className={`message ${isLogin ? "login" : "signup"}`}>
          <div className="btn-wrapper">
            <button
              type="button"
              className="button"
              id="signup"
              onClick={() => {
                setIsSignup(true);
                setIsLogin(false);
                setFormData({
                  name: "",
                  email: "",
                  password: "",
                  phone: "",
                  is_vegetarian: "",
                });
              }}
            >
              Sign Up
            </button>
            <button
              type="button"
              className="button"
              id="login"
              onClick={() => {
                setIsLogin(true);
                setIsSignup(false);
                setFormData({
                  name: "",
                  email: "",
                  password: "",
                  phone: "",
                  is_vegetarian: "",
                });
              }}
            >
              Login
            </button>
          </div>
        </div>

        <div className={`form form--signup ${isSignup ? "active" : ""}`}>
          <div className="form--heading">
            {isLogin ? "Welcome Back! Login" : "Welcome! Sign Up"}
          </div>
          {errors.form && <div className="form-error">{errors.form}</div>}
          <form autoComplete="off" onSubmit={handleSignup}>
            {!isLogin && (
              <>
                <div className="input-group">
                  <input
                    type="text"
                    name="name"
                    placeholder="Name"
                    value={formData.name}
                    onChange={handleChange}
                    className={errors.name ? "error" : ""}
                  />
                  {errors.name && (
                    <span className="error-message">{errors.name}</span>
                  )}
                </div>
                <div className="input-group">
                  <input
                    type="tel"
                    name="phone"
                    placeholder="Phone (0781234567)"
                    value={formData.phone}
                    onChange={handleChange}
                    className={errors.phone ? "error" : ""}
                  />
                  {errors.phone && (
                    <span className="error-message">{errors.phone}</span>
                  )}
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
                className={errors.email ? "error" : ""}
              />
              {errors.email && (
                <span className="error-message">{errors.email}</span>
              )}
            </div>

            <div className="input-group">
              <input
                type="password"
                name="password"
                placeholder="Password (8+ chars with uppercase)"
                value={formData.password}
                onChange={handleChange}
                className={errors.password ? "error" : ""}
              />
              {errors.password && (
                <span className="error-message">{errors.password}</span>
              )}
            </div>

            <div className="input-group">
              <label htmlFor="dietSystem">Diet system:</label>
              <select
                id="dietSystem"
                value={is_vegetarian}
                onChange={handleDietChange}
              >
                <option value="" Selected>
                  Select Your diet System
                </option>
                <option value="0">Omnivore</option>
                <option value="1">Vegetarian</option>
              </select>
            </div>

            <button className="button" type="submit" disabled={isSubmitting}>
              {isSubmitting ? "Processing..." : isLogin ? "Login" : "Sign Up"}
            </button>
          </form>
        </div>

        {/*         --------------------------  login form  -------------------*/}

        <div className={`form form--signup ${isLogin ? "active" : ""}`}>
          <div className="form--heading">
            {isLogin ? "Welcome Back! Login" : "Welcome! Sign Up"}
          </div>
          {errors.form && <div className="form-error">{errors.form}</div>}
          <form autoComplete="off" onSubmit={handleLogin}>
            <div className="input-group">
              <input
                type="email"
                name="email"
                placeholder="Email"
                value={formData.email}
                onChange={handleChange}
                className={errors.email ? "error" : ""}
              />
              {errors.email && (
                <span className="error-message">{errors.email}</span>
              )}
            </div>

            <div className="input-group">
              <input
                type="password"
                name="password"
                placeholder="Password "
                value={formData.password}
                onChange={handleChange}
                className={errors.password ? "error" : ""}
              />
              {errors.password && (
                <span className="error-message">{errors.password}</span>
              )}
            </div>
            <button className="button" type="submit" disabled={isSubmitting}>
              {isSubmitting ? "Processing..." : isLogin ? "Login" : "Sign Up"}
            </button>
          </form>
        </div>
      </div>
      {alert.show && (
        <AlertModal
          key={Date.now()} // forces remount each time
          message={alert.message}
          type={alert.type}
          onClose={() => setAlert({ show: false, message: "", type: "" })}
        />
      )}
    </div>
  );
};

export default AuthForm;
