// src/pages/EditRestaurantProfile.jsx
import React, { useContext, useEffect, useState } from 'react';
import { UserContext } from '../../context/UserContext';
import './EditRestaurantProfile.css'; // Add your CSS file for styling
import axios from 'axios';

const EditRestaurantProfile = () => {
  const { user, loading } = useContext(UserContext);
  const [formData, setFormData] = useState({
    name: '',
    phone_number: '',
    email: '',
    working_hours_from: '',
    working_hours_to: '',
    address: '',
    restaurant_info: '',
    password: ''
  });

  useEffect(() => {
    if (user) {
      setFormData({
        name: user.name || '',
        phone_number: user.phone_number || '',
        email: user.email || '',
        working_hours_from: user.working_hours_from || '',
        working_hours_to: user.working_hours_to || '',
        address: user.address || '',
        restaurant_info: user.restaurant_info || '',
        password: ''
      });
    }
  }, [user]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem('authToken');

    try {
      const response = await axios.put(
        'https://your-api.com/api/restaurant/update', // update to your actual endpoint
        formData,
        {
          headers: {
            'Authorization': `Bearer ${token}`,
            'Accept': 'application/json',
          },
        }
      );
      alert('Profile updated successfully');
    } catch (error) {
      console.error('Update failed:', error);
      alert('Something went wrong while updating');
    }
  };

  if (loading) return <p>Loading...</p>;

  return (
    <div className="edit-profile">
      <h2>Edit Restaurant Profile</h2>
      <form onSubmit={handleSubmit}>
        <input name="name" value={formData.name} onChange={handleChange} placeholder="Restaurant Name" required />
        <input name="phone_number" value={formData.phone_number} onChange={handleChange} placeholder="Phone Number" required />
        <input type="email" name="email" value={formData.email} onChange={handleChange} placeholder="Email" required />
        <input name="working_hours_from" value={formData.working_hours_from} onChange={handleChange} placeholder="Working Hours From" required />
        <input name="working_hours_to" value={formData.working_hours_to} onChange={handleChange} placeholder="Working Hours To" required />
        <input name="address" value={formData.address} onChange={handleChange} placeholder="Address" required />
        <textarea name="restaurant_info" value={formData.restaurant_info} onChange={handleChange} placeholder="Restaurant Info" required />
        <input type="password" name="password" value={formData.password} onChange={handleChange} placeholder="New Password (leave empty if unchanged)" />

        <button type="submit">Save Changes</button>
      </form>
    </div>
  );
};

export default EditRestaurantProfile;
