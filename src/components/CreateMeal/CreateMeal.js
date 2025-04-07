import React, { useState } from "react";
import axios from "axios";
import "./CreateMeal.css";

function CreateMeal() {
  const [name, setName] = useState("");
  const [category, setCategory] = useState("");
  const [available_count, setAvailable_count] = useState("");
  const [price, setPrice] = useState("");
  const [description, setDescription] = useState("");
  const [image, setImage] = useState(null);
  const [contains_meat, setContains_meat] = useState(1);
  const [contains_chicken, setContains_chicken] = useState(1);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const ngrokURL = "https://87e9-92-241-35-12.ngrok-free.app/api/create/meals";

  const handleChange = (event) => {
    setCategory(event.target.value);
  };

  const handleFileChange = (event) => {
    setImage(event.target.files[0]); 
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setLoading(true);
    setError(null);
    const token = localStorage.getItem("authToken"); // Ensure key matches what you used when storing the token

    if (!token) {
      setError("You must be logged in to submit a meal.");
      setLoading(false);
      return;
    }
      
   
    try {
      const response = await axios.post(ngrokURL, {name , available_count, category   ,price, description,contains_chicken, contains_meat,image}, 
        {
        headers: {
          "Content-Type": "multipart/form-data",
           "Authorization": `Bearer ${token}`
        },
      });

      alert("Meal submitted successfully!");
      
     
      
      setName("");
      setCategory("");
      setAvailable_count("");
      setPrice("");
      setImage(null);
    } catch (err) {
      setError(err.response?.data?.message || "Failed to submit meal");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div id="create-meal-container">
      <form id="create-meal-form" encType="multipart/form-data" onSubmit={handleSubmit}>
        <div>
          <label>Meal Name:</label>
          <input type="text" name="meal-name" className="create-meal-input" value={name} onChange={(e) => setName(e.target.value)} required />
        </div>
        <div>
          <label>Meal Category:</label>
          <select name="meal-category" className="create-meal-input" value={category} onChange={handleChange} required>
            <option value="">Select Category</option>
            <option value="shawarma">Shawarma</option>
            <option value="burger">Burger</option>
            <option value="pasta">Pasta</option>
            <option value="salad">Salad</option>
            <option value="pizza">Pizza</option>
            <option value="chicken-sandwich">Chicken Sandwich</option>
          </select>
        </div>
        <div>
          <label>Available Quantity:</label>
          <input type="number"  className="create-meal-input" name="available-quantity" value={available_count} onChange={(e) => setAvailable_count(e.target.value)} required />
        </div>
        <div >
          <label>Meal Price:</label>
          <input type="number" className="create-meal-input" name="meal-price" value={price} onChange={(e) => setPrice(e.target.value)} required />
        </div>
        <div>
          <label>Upload Meal Image:</label>
          <input type="file" className=" create-meal-input" name="meal-image" onChange={handleFileChange} required />
        </div>
        <button type="submit" className="btn" disabled={loading}>{loading ? "Submitting..." : "Submit Meal"}</button>
        {error && <p style={{ color: "red" }}>{error}</p>}
      </form>
    </div>
  );}

export default CreateMeal;
