import { useState } from "react";
import axios from 'axios';
import logo from "../../assets/images/logo.png";
import "./RestaurantSignup.css";

function RestaurantSignup() {
    const [formData, setFormData] = useState({
        email: "",
        name: "",
        phone_number: "",
        password: "",
        address: "",
        working_hours: { from: "09:00", to: "17:00" },
        restaurant_info: "",
        role_id: 3,
        license_file: null
    });
    
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [errors, setErrors] = useState({});

    // Validation patterns
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const phoneRegex = /^(078|077|079)\d{7}$/;
    const passwordRegex = /^(?=.*[A-Z]).{8,}$/;

    // Generate time options for the dropdown
    const generateTimeOptions = () => {
        const times = [];
        for (let hour = 0; hour < 24; hour++) {
            for (let minute = 0; minute < 60; minute += 30) {
                const timeString = `${hour.toString().padStart(2, '0')}:${minute.toString().padStart(2, '0')}`;
                times.push(timeString);
            }
        }
        return times;
    };

    const timeOptions = generateTimeOptions();

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
        
        // Clear error when user types
        if (errors[name]) {
            setErrors(prev => ({ ...prev, [name]: '' }));
        }
    };

    const handleWorkingHoursChange = (type, value) => {
        setFormData(prev => ({
            ...prev,
            working_hours: {
                ...prev.working_hours,
                [type]: value
            }
        }));
    };

    const handleFileChange = (e) => {
        setFormData(prev => ({
            ...prev,
            license_file: e.target.files[0]
        }));
    };

    const validateForm = () => {
        const newErrors = {};
        
        // Check all required fields
        if (!formData.name.trim()) newErrors.name = 'Restaurant name is required';
        if (!formData.email.trim()) newErrors.email = 'Email is required';
        if (!formData.phone_number.trim()) newErrors.phone_number = 'Phone number is required';
        if (!formData.password.trim()) newErrors.password = 'Password is required';
        if (!formData.address.trim()) newErrors.address = 'Address is required';
        if (!formData.license_file) newErrors.license_file = 'License file is required';
        
        // Validate working hours
        if (!formData.working_hours.from) newErrors.working_hours = 'Opening time is required';
        if (!formData.working_hours.to) newErrors.working_hours = 'Closing time is required';
        if (formData.working_hours.from && formData.working_hours.to && 
            formData.working_hours.from >= formData.working_hours.to) {
            newErrors.working_hours = 'Closing time must be after opening time';
        }
        
        // Validate formats
        if (formData.email && !emailRegex.test(formData.email)) {
            newErrors.email = 'Please enter a valid email address';
        }
        
        if (formData.phone_number && !phoneRegex.test(formData.phone_number)) {
            newErrors.phone_number = 'Phone must start with 078, 077 or 079 and be 10 digits';
        }
        
        if (formData.password && !passwordRegex.test(formData.password)) {
            newErrors.password = 'Password must be at least 8 characters with 1 uppercase letter';
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
            const formDataToSend = new FormData();
            formDataToSend.append('email', formData.email);
            formDataToSend.append('name', formData.name);
            formDataToSend.append('phone_number', formData.phone_number);
            formDataToSend.append('password', formData.password);
            formDataToSend.append('address', formData.address);
            formDataToSend.append('working_hours_from', formData.working_hours.from);
            formDataToSend.append('working_hours_to', formData.working_hours.to);
            formDataToSend.append('restaurant_info', formData.restaurant_info);
            formDataToSend.append('role_id', formData.role_id);
            formDataToSend.append('license', formData.license_file);

            const response = await axios.post(
                "https://87e9-92-241-35-12.ngrok-free.app/api/restaurants/register",
                formDataToSend,
                {
                    headers: {
                        "Content-Type": "multipart/form-data"
                    }
                }
            );

            console.log("Signup Successful", response.data);
            alert("Signup successful! You can now log in.");
        } catch (err) {
            console.error("Signup Error", err.response?.data || err.message);
            setErrors(prev => ({ 
                ...prev, 
                form: err.response?.data?.message || "Signup failed. Please try again.",
                ...(err.response?.data?.errors || {})
            }));
        } finally {
            setIsSubmitting(false);
        }
    };
    
    return (
        <div id="signup-page">
            <div id="signup-box">
                <div id="intro"> 
                    <div><p>Sign Up your Business</p></div>
                    <div id="logo-container"><img src={logo} alt="logo" id="logo"/></div>
                </div>
                
                {errors.form && <div className="error-message">{errors.form}</div>}
                
                <form onSubmit={handleSubmit} id="form" noValidate>
                    <div className="input-group">
                        <label className="label">Restaurant Name *</label>
                        <input 
                            autoComplete="off" 
                            name="name" 
                            className={`input ${errors.name ? 'input-error' : ''}`}
                            type="text" 
                            value={formData.name}
                            onChange={handleChange}
                        />
                        {errors.name && <span className="error-text">{errors.name}</span>}
                    </div>
                    
                    <div className="input-group">
                        <label className="label">Email address *</label>
                        <input 
                            autoComplete="off" 
                            name="email" 
                            className={`input ${errors.email ? 'input-error' : ''}`}
                            type="email" 
                            value={formData.email}
                            onChange={handleChange}
                        />
                        {errors.email && <span className="error-text">{errors.email}</span>}
                    </div>
                    
                    <div className="input-group">
                        <label className="label">Password *</label>
                        <input 
                            autoComplete="off" 
                            name="password" 
                            className={`input ${errors.password ? 'input-error' : ''}`}
                            type="password" 
                            value={formData.password}
                            onChange={handleChange}
                        />
                        {errors.password && <span className="error-text">{errors.password}</span>}
                    </div>

                    <div className="input-group">
                        <label className="label">Restaurant address *</label>
                        <input 
                            autoComplete="off" 
                            name="address" 
                            className={`input ${errors.address ? 'input-error' : ''}`}
                            type="text" 
                            value={formData.address}
                            onChange={handleChange}
                        />
                        {errors.address && <span className="error-text">{errors.address}</span>}
                    </div>
                    
                    <div className="input-group">
                        <label className="label">Phone Number *</label>
                        <input 
                            autoComplete="off" 
                            name="phone_number" 
                            className={`input ${errors.phone_number ? 'input-error' : ''}`}
                            type="tel" 
                            value={formData.phone_number}
                            onChange={handleChange}
                            placeholder="0781234567"
                        />
                        {errors.phone_number && <span className="error-text">{errors.phone_number}</span>}
                    </div>
                    
                    <div className="input-group">
                        <label className="label">Working Hours *</label>
                        <div className="working-hours-container">
                            <select 
                                value={formData.working_hours.from} 
                                onChange={(e) => handleWorkingHoursChange('from', e.target.value)}
                                className="time-select"
                            >
                                {timeOptions.map(time => (
                                    <option key={`from-${time}`} value={time}>{time}</option>
                                ))}
                            </select>
                            <span> to </span>
                            <select 
                                value={formData.working_hours.to} 
                                onChange={(e) => handleWorkingHoursChange('to', e.target.value)}
                                className="time-select"
                            >
                                {timeOptions.map(time => (
                                    <option key={`to-${time}`} value={time}>{time}</option>
                                ))}
                            </select>
                        </div>
                        {errors.working_hours && <span className="error-text">{errors.working_hours}</span>}
                    </div>
                    
                    <div className="input-group">
                        <label className="label">Restaurant Info</label>
                        <textarea 
                            name="restaurant_info" 
                            className="input"
                            value={formData.restaurant_info}
                            onChange={handleChange}
                            rows="3"
                        />
                    </div>
                    
                    <div className="input-group file-upload">
                        <label className="label">Upload license (PDF or Image) *</label>
                        <input 
                            autoComplete="off" 
                            name="license" 
                            className={`input ${errors.license_file ? 'input-error' : ''}`}
                            type="file" 
                            onChange={handleFileChange}
                            accept=".pdf,.jpg,.jpeg,.png"
                        />
                        {errors.license_file && <span className="error-text">{errors.license_file}</span>}
                        {formData.license_file && (
                            <div className="file-info">
                                Selected: {formData.license_file.name}
                            </div>
                        )}
                    </div>
                    
                    <div className="button-container">
                        <button 
                            className="btn" 
                            type="submit"
                            disabled={isSubmitting}
                        >
                            {isSubmitting ? 'Processing...' : 'Sign Up'}
                        </button>
                        <p className="login-link">
                            Already have an account? <a href="/login" id="login-page-link">Log in</a>
                        </p>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default RestaurantSignup;