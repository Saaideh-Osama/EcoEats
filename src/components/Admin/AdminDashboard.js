import React, { useEffect, useState } from 'react';
import './AdminDashboard.css';
import axios from 'axios';
import ConfirmModal from '../Alerts/ConfirmModal';
import AlertModal from '../Alerts/AlertModal';
import { RiUser3Line } from "react-icons/ri";
import { FaBuildingCircleCheck } from "react-icons/fa6";
import { FaBuildingCircleXmark } from "react-icons/fa6";

const API_BASE = 'https://4399-91-186-255-241.ngrok-free.app/api';

const AdminDashboard = () => {
  const [activeTab, setActiveTab] = useState("approved");
  const [approvedRestaurants, setApprovedRestaurants] = useState([]);
  const [unapprovedRestaurants, setUnapprovedRestaurants] = useState([]);
  const [clients, setClients] = useState([]);
  const [loading, setLoading] = useState(true);
  const [modalData, setModalData] = useState(null);
  const [alertMessage, setAlertMessage] = useState(null);

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
      await fetchClients();
      setLoading(false);
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

  const fetchClients = async () => {
    try {
      const res = await axios.get(`${API_BASE}/get/clients`, axiosConfig);
      setClients(res.data.clients);
    } catch (err) {
      console.error("Failed to fetch clients", err);
    }
  };

  const confirmAction = (actionFn, itemType, item) => {
    setModalData({ actionFn, itemType, item });
  };

  const approveRestaurant = async (id) => {
    const restaurant = unapprovedRestaurants.find(r => r.id === id);
    confirmAction(async () => {
      await axios.post(`${API_BASE}/admin/approve-restaurant/${id}`, {}, axiosConfig);
      await fetchApprovedRestaurants();
      await fetchUnapprovedRestaurants();
      setAlertMessage("Restaurant approved Successfully.")
    }, "restaurant", restaurant);
  };

  const unapproveRestaurant = async (id) => {
    const restaurant = approvedRestaurants.find(r => r.id === id);
    confirmAction(async () => {
      await axios.post(`${API_BASE}/admin/unapprove-restaurant/${id}`, {}, axiosConfig);
      await fetchApprovedRestaurants();
      await fetchUnapprovedRestaurants();
      setAlertMessage("Restaurant Unapproved Successfully.")
    }, "restaurant", restaurant);
  };

  const deleteRestaurant = async (id) => {
    const list = activeTab === "approved" ? approvedRestaurants : unapprovedRestaurants;
    const restaurant = list.find(r => r.id === id);
    confirmAction(async () => {
      await axios.post(`${API_BASE}/delete-restaurant/${id}`, {}, axiosConfig);
      await fetchApprovedRestaurants();
      await fetchUnapprovedRestaurants();
      setAlertMessage("Restaurant deleted Successfully.")
    }, "restaurant", restaurant);
  };

  const deleteClient = async (id) => {
    const client = clients.find(c => c.id === id);
    confirmAction(async () => {
      await axios.post(`${API_BASE}/delete-client/${id}`, {}, axiosConfig);
      await fetchClients();
      setAlertMessage("Client deleted Successfully.")
    }, "client", client);
  };

  const handleModalConfirm = async () => {
    await modalData.actionFn(); // Run the confirmed action
    setModalData(null);         // Close the modal afterward
  };
  
  const handleModalCancel = () => {
    setModalData(null);         // Just close the modal
  };
  

  return (
    <div id='adminDashboardPage'>
      <div id='searchBar'>
        <label htmlFor="site-search">Search </label>
        <input type="search" id="site-search" name="q" />
        <button>Search</button>
      </div>
      <div id='tabContainer'>
        <button className={activeTab === "users" ? "tab active" : "tab"} onClick={() => setActiveTab("users")}>
          <div className='iconContainer'><RiUser3Line /></div>Users
        </button>
        <button className={activeTab === "approved" ? "tab active" : "tab"} onClick={() => setActiveTab("approved")}>
          <div className='iconContainer'><FaBuildingCircleCheck /></div>Approved Restaurants
        </button>
        <button className={activeTab === "unapproved" ? "tab active" : "tab"} onClick={() => setActiveTab("unapproved")}>
          <div className='iconContainer'><FaBuildingCircleXmark /></div>Unapproved Restaurants
        </button>
      </div>

      <div className="tab-content">
        {activeTab === "users" && (
          <><h2>All Users</h2>
            <div className='mappingContainer'>
              <ul className='responsive-table' id='usersTable'>
                <li className="table-header">
                  <div className="col col-1">Name</div>
                  <div className="col col-2">Email </div>
                
                  <div className="col col-4">Diet system</div>
                  <div className="col col-5">Actions</div>
                </li>
                {clients.map((client) => (
                  <li key={client.id} className="table-row">
                    <div>{client.name}</div>
                    <div>{client.email}</div>
                    
                    <div>{client.is_vegetarian ? "vegetarian" : "non-vegetarian"}</div>
                    <div className="actions">
                      <button onClick={() => deleteClient(client.id)} id='delete'>Delete</button>
                      <button id='suspend'>Suspend</button>
                    </div>
                  </li>
                ))}
              </ul>
            </div></>)
        }

        {loading ? <p>Loading...</p> : activeTab === "approved" && (
          <><h2>Approved Restaurants</h2>
            <div className='mappingContainer'>
              <ul className='responsive-table'>
                <li className="table-header">
                  <div className="col col-1">License</div>
                  <div className="col col-2">ID</div>
                  <div className="col col-3">Name</div>
                  <div className="col col-4">Actions</div>
                </li>
                {approvedRestaurants.map((restaurant) => (
                  <li key={restaurant.id} className="table-row">
                    <div><img src={restaurant.license} alt="License" id='rest_lic' /></div>
                    <div>{restaurant.id}</div>
                    <div>{restaurant.name}</div>
                    <div>
                      <button onClick={() => deleteRestaurant(restaurant.id)} id='delete'>Delete</button>
                      <button onClick={() => unapproveRestaurant(restaurant.id)} id='unapprove'>Unapprove</button>
                    </div>
                  </li>
                ))}
              </ul>
            </div></>)
        }

        {activeTab === "unapproved" && (
          <><h2>Unapproved Restaurants</h2>
            <div className='mappingContainer'>
              <ul className='responsive-table'>
                <li className="table-header">
                  <div className="col col-1">License</div>
                  <div className="col col-2">ID</div>
                  <div className="col col-3">Name</div>
                  <div className="col col-4">Actions</div>
                </li>
                {unapprovedRestaurants.map((restaurant) => (
                  <li key={restaurant.id} className="table-row">
                    <div><img src={restaurant.license} alt="License" id='rest_lic' /></div>
                    <div>{restaurant.id}</div>
                    <div>{restaurant.name}</div>
                    <div>
                      <button onClick={() => deleteRestaurant(restaurant.id)} id='delete'>Delete</button>
                      <button onClick={() => approveRestaurant(restaurant.id)} id='approve'>Approve</button>
                    </div>
                  </li>
                ))}
              </ul>
            </div></>)
        }
      </div>

      {/* Confirmation Modal */}
      {modalData && (
  <ConfirmModal
    message={`Are you sure you want to ${
      modalData.itemType === "restaurant" ? "approve" : "perform this action on"
    } "${modalData.item.name}" (ID: ${modalData.item.id})?`}
    onConfirm={handleModalConfirm}
    onCancel={handleModalCancel}
  /> 
)}

{alertMessage && (
  <AlertModal
    message={alertMessage}
    onClose={() => setAlertMessage(null)}
  />
)}

    </div>
  );
};

export default AdminDashboard;
