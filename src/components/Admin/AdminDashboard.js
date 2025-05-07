import React, { useEffect, useState } from 'react';
import axios from 'axios';

const API_BASE = 'https://4399-91-186-255-241.ngrok-free.app/api';

const AdminDashboard = () => {
  const [approvedRestaurants, setApprovedRestaurants] = useState([]);
  const [unapprovedRestaurants, setUnapprovedRestaurants] = useState([]);
  const [clients, setClients] = useState([]);
  const [loading, setLoading] = useState(true);

  const axiosConfig = {
    headers: {
      "ngrok-skip-browser-warning": "true",
      authorization: `Bearer ${localStorage.getItem("authToken")}`,
    },
  };
  useEffect(() => {
    const loadData = async () => {
      await fetchApprovedRestaurants();
      await fetchUnapprovedRestaurants();
      await fetchClients(); // fetch clients too
      setLoading(false); // ✅ Stop loading once both are done
    };
  
    loadData();
  }, []);
  const fetchApprovedRestaurants = async () => {
    try {
      const res = await axios.get(`${API_BASE}/get-approved-restaurants`, axiosConfig);
      setApprovedRestaurants(res.data.approved_restaurant_licenses);
    } catch (err) {
      console.error(err);
    }
  };
  
  const fetchUnapprovedRestaurants = async () => {
    try {
      const res = await axios.get(`${API_BASE}/get-unapproved-restaurants`, axiosConfig);
      setUnapprovedRestaurants(res.data.unapproved_restaurant_licenses);
    } catch (err) {
      console.error(err);
    }
  };
  
  const approveRestaurant = async (id) => {
    try {
      await axios.post(`${API_BASE}/admin/approve-restaurant/${id}`, {}, axiosConfig);
      await fetchApprovedRestaurants();
      await fetchUnapprovedRestaurants();
    } catch (err) {
      console.error(err);
    }
  };
  
  const unapproveRestaurant = async (id) => {
    try {
      await axios.post(`${API_BASE}/admin/unapprove-restaurant/${id}`, {}, axiosConfig);
      await fetchApprovedRestaurants();
      await fetchUnapprovedRestaurants();
    } catch (err) {
      console.error(err);
    }
  };
  
  const deleteRestaurant = async (id) => {
    try {
      await axios.post(`${API_BASE}/delete-restaurant/${id}`,{}, axiosConfig);
      await fetchApprovedRestaurants();
      await fetchUnapprovedRestaurants();
    } catch (err) {
      console.error(err);
    }
  };
  const fetchClients = async () => {
    try {
      const res = await axios.get(`${API_BASE}/get/clients`, axiosConfig);
      setClients(res.data.clients); // Adjust key based on actual backend response
    } catch (err) {
      console.error("Failed to fetch clients", err);
    }
  };
  
  const deleteClient = async (id) => {
    try {
      await axios.post(`${API_BASE}/delete-client/${id}`,{}, axiosConfig);
      alert("Client deleted.");
    } catch (err) {
      console.error(err);
    }
  };
  

  return (
    <div >
      <h1 >Admin Dashboard</h1>

      {loading ? <p>Loading...</p> : (
        <>
          <section>
            <h2 >Approved Restaurants</h2>
            <div >
              {approvedRestaurants.map((restaurant, index) => (
                <div key={restaurant.id} >
                  <h3 >{restaurant.name}</h3>
                  <img src={restaurant.license} alt="License" />
                  <button  onClick={() => unapproveRestaurant(restaurant.id)}>Unapprove</button>
                  <button  onClick={() => deleteRestaurant(restaurant.id)}>Delete</button>
                </div>
              ))}
            </div>
          </section>

          <section >
            <h2 >Unapproved Restaurants</h2>
            <div >
              {unapprovedRestaurants.map((restaurant, index) => (
                <div key={index} >
                  <h3 >{restaurant.name}</h3>
                  <img src={restaurant.license} alt="License"  />
                  <button  onClick={() => approveRestaurant(restaurant.id)}>Approve</button>
                  <button  onClick={() => deleteRestaurant(restaurant.id)}>Delete</button>
                </div>
              ))}
            </div>
          </section>
          <section>
  <h2>Clients</h2>
  <div>
    {clients.map((client) => (
      <div key={client.id}>
        <h3>{client.name}</h3>
        <p>Email: {client.email}</p>
        <button onClick={() => deleteClient(client.id)}>Delete Client</button>
      </div>
    ))}
  </div>
</section>
        </>
      )}
    </div>
  );
};

export default AdminDashboard;
