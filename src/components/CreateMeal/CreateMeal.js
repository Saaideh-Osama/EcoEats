import React, { useState } from "react";
import axios from "axios";
import "./CreateMeal.css";

function CreateMeal({ onMealCreated }) {
  const [name, setName] = useState("");
  const [category, setCategory] = useState("");
  const [available_count, setAvailable_count] = useState("");
  const [price, setPrice] = useState("");
  const [description, setDescription] = useState("");
  const [contains_meat, setContains_meat] = useState(0);
  const [contains_chicken, setContains_chicken] = useState(0);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [image, setImage] = useState(null);

  const ngrokURL = "https://ad67-91-186-251-160.ngrok-free.app/api/create/meals";

  const handleChange = (event) => {
    setCategory(event.target.value);
    
  };

  const handleFileChange = (event) => {
    setImage(event.target.files[0]);
  console.log("Selected file:", event.target.files[0]);
  console.log("Image state:", image);
  };

  const handleSubmit = async (event) => {

    event.preventDefault();
    
    setLoading(true);
    setError(null);

    const token = localStorage.getItem("authToken");
    if (!token) {
      setError("You must be logged in to submit a meal.");
      setLoading(false);
      return;
    }

    const formData = new FormData();
    formData.append("name", name);
    formData.append("category", category);
    formData.append("available_count", available_count);
    formData.append("price", price);
    formData.append("description", description);
    formData.append("contains_meat", contains_meat);
    formData.append("contains_chicken", contains_chicken);
    formData.append("image", image);
    
    console.log("Form submitted with values:", formData);
    console.log("Image file:", image);
    try {
      const response = await axios.post(ngrokURL, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${token}`,
        },
      });

      alert("Meal submitted successfully!");
      // Reset fields
      setName("");
      setCategory("");
      setAvailable_count("");
      setPrice("");
      setDescription("");
      setContains_meat(1);
      setContains_chicken(1);
      setImage(null);
      if (onMealCreated) onMealCreated(); // Optional callback
    } catch (err) {
      setError(err.response?.data?.message || "Failed to submit meal");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div id="create-meal-container">
      <form id="create-meal-form" encType="multipart/form-data" onSubmit={handleSubmit}>
        <div className="input-group">
          <label>Meal Name:</label>
          <input
            type="text"
            className="create-meal-input"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </div>

        <div className="input-group">
          <label>Meal Category:</label>
          <select
            className="create-meal-input"
            value={category}
            onChange={handleChange}
            required
          >
            <option value="">Select Category</option>
            <option value="shawarma">Shawarma</option>
            <option value="burger">Burger</option>
            <option value="pasta">Pasta</option>
            <option value="salad">Salad</option>
            <option value="pizza">Pizza</option>
            <option value="chicken-sandwich">Chicken Sandwich</option>
          </select>
        </div>

        <div className="input-group">
          <label>Available Quantity:</label>
          <input
            type="number"
            className="create-meal-input"
            value={available_count}
            onChange={(e) => setAvailable_count(e.target.value)}
            required
          />
        </div>

        <div className="input-group">
          <label>Meal Price:</label>
          <input
            type="number"
            className="create-meal-input"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            required
          />
        </div>

        <div className="input-group">
          <label>Meal Description:</label>
          <textarea
            className="create-meal-input"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            required
          ></textarea>
        </div>

        <div className="input-group" style={{ display: "flex", flexDirection: "column", rowGap: "10px" }}>
          <div className="checkbox-wrapper-33">
            <label className="checkbox">
              <p className="checkbox__textwrapper">Contains Meat</p>
              <input
                className="checkbox__trigger visuallyhidden"
                type="checkbox"
                
                onChange={(e) => setContains_meat(e.target.checked ? 1 : 0)}
              />
              <span className="checkbox__symbol">
                <svg aria-hidden="true" className="icon-checkbox" width="28" height="28" viewBox="0 0 28 28">
                  <path d="M4 14l8 7L24 7"></path>
                </svg>
              </span>
            </label>
          </div>

          <div className="checkbox-wrapper-33">
            <label className="checkbox">
              <p className="checkbox__textwrapper">Contains Chicken</p>
              <input
                className="checkbox__trigger visuallyhidden"
                type="checkbox"
                
                onChange={(e) => setContains_chicken(e.target.checked ? 1 : 0)
                  
                }
              />
              <span className="checkbox__symbol">
                <svg aria-hidden="true" className="icon-checkbox" width="28" height="28" viewBox="0 0 28 28">
                  <path d="M4 14l8 7L24 7"></path>
                </svg>
              </span>
            </label>
          </div>
        </div>

        <div className="input-group">
          <label>Meal Image</label>
          <input type="file" accept="image/*" onChange={handleFileChange} />
        </div>

        {image && (
          <div style={{ marginTop: "10px" }}>
            <img
              src={URL.createObjectURL(image)}
              alt="Preview"
              style={{ maxWidth: "100%", maxHeight: "200px", borderRadius: "8px" }}
            />
          </div>
        )}

        <button type="submit" className="create-meal-btn" disabled={loading}>
          {loading ? "Submitting..." : "Submit Meal"}
        </button>
        {error && <p style={{ color: "red" }}>{error}</p>}
      </form>
    </div>
  );
}

export default CreateMeal;
