import React, { useEffect, useState } from "react";
import "./AdminDashboard.css";
import axios from "axios";
import ConfirmModal from "../Alerts/ConfirmModal";
import AlertModal from "../Alerts/AlertModal";
import { RiUser3Line } from "react-icons/ri";
import { useNavigate } from "react-router-dom";
import { FaBuildingCircleCheck, FaBuildingCircleXmark } from "react-icons/fa6";

const API_BASE = "https://3cfd-91-186-247-216.ngrok-free.app/api";

const AdminDashboard = () => {
  const [activeTab, setActiveTab] = useState("approved");
  const [approvedRestaurants, setApprovedRestaurants] = useState([]);
  const [unapprovedRestaurants, setUnapprovedRestaurants] = useState([]);
  const [restaurants, setRestaurants] = useState({
    unapproveRestaurant: [],
    approvedRestaurants: [],
  });
  const [clients, setClients] = useState([]);
  const [loading, setLoading] = useState(true);

  const [searchQuery, setSearchQuery] = useState("");

  const [modalData, setModalData] = useState(null); // for confirm modal
  const [alertData, setAlertData] = useState(null); // for alert modal
  const [profits, setProfits] = useState([]);

  const navigate = useNavigate();

  const axiosConfig = {
    headers: {
      "ngrok-skip-browser-warning": "true",
      authorization: `Bearer ${localStorage.getItem("authToken")}`,
    },
  };

  const handleSearch = (e) => {
    const query = e.target.value.toLowerCase();
    setSearchQuery(query);

    if (query.trim() === "") {
      fetchApprovedRestaurants();
      fetchUnapprovedRestaurants();
      fetchClients();
      return;
    }

    if (activeTab === "users") {
      const filtered = clients.filter((client) =>
        client.name.toLowerCase().includes(query)
      );
      setClients(filtered);
    } else {
      const filteredApproved = approvedRestaurants.filter((r) =>
        r.name.toLowerCase().includes(query)
      );
      const filteredUnapproved = unapprovedRestaurants.filter((r) =>
        r.name.toLowerCase().includes(query)
      );
      setApprovedRestaurants(filteredApproved);
      setUnapprovedRestaurants(filteredUnapproved);
    }
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
  const fetchProfits = async () => {
    try {
      const res = await axios.get(
        `${API_BASE}/RestaurantMonthlyProfit`,
        axiosConfig
      );
      setProfits(res.data.profits);
    } catch (err) {
      console.error("Failed to fetch profits", err);
    }
  };
  useEffect(() => {
    if (activeTab === "profit") {
      fetchProfits();
    }
  }, [activeTab]);

  const handleLogout = () => {
    confirmAction("Are you sure you want to logout?", async () => {
      localStorage.removeItem("authToken");
      navigate("/", { state: { refresh: true } });
    });
  };

  const fetchApprovedRestaurants = async () => {
    try {
      const res = await axios.get(
        `${API_BASE}/get-approved-restaurants`,
        axiosConfig
      );
      setApprovedRestaurants(res.data.approved_restaurant_licenses);
    } catch (err) {
      console.error(err);
    }
  };

  const fetchUnapprovedRestaurants = async () => {
    try {
      const res = await axios.get(
        `${API_BASE}/get-unapproved-restaurants`,
        axiosConfig
      );
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

  const confirmAction = (message, actionFn) => {
    setModalData({ message, actionFn });
  };

  const handleModalConfirm = async () => {
    if (modalData?.actionFn) {
      await modalData.actionFn();
      showAlertModal(modalData.message || "Action completed successfully");
    }
    setModalData(null);
  };

  const showAlertModal = (message, type = "success") => {
    setAlertData({ message, type });
  };

  const approveRestaurant = (id) => {
    const restaurant = unapprovedRestaurants.find((r) => r.id === id);
    confirmAction(`Approve ${restaurant.name}?`, async () => {
      await axios.post(
        `${API_BASE}/admin/approve-restaurant/${id}`,
        {},
        axiosConfig
      );
      await fetchApprovedRestaurants();
      await fetchUnapprovedRestaurants();
    });
  };

  const unapproveRestaurant = (id) => {
    const restaurant = approvedRestaurants.find((r) => r.id === id);
    confirmAction(`Unapprove ${restaurant.name}?`, async () => {
      await axios.post(
        `${API_BASE}/admin/unapprove-restaurant/${id}`,
        {},
        axiosConfig
      );
      await fetchApprovedRestaurants();
      await fetchUnapprovedRestaurants();
    });
  };

  const deleteRestaurant = (id) => {
    const list =
      activeTab === "approved" ? approvedRestaurants : unapprovedRestaurants;
    const restaurant = list.find((r) => r.id === id);
    confirmAction(`Delete ${restaurant.name}?`, async () => {
      await axios.post(`${API_BASE}/delete-restaurant/${id}`, {}, axiosConfig);
      await fetchApprovedRestaurants();
      await fetchUnapprovedRestaurants();
    });
  };

  const deleteClient = (id) => {
    const client = clients.find((c) => c.id === id);
    confirmAction(`Delete client ${client.name}?`, async () => {
      await axios.post(`${API_BASE}/delete-client/${id}`, {}, axiosConfig);
      await fetchClients();
    });
  };

  return (
    <div id="adminDashboardPage">
      <div id="searchBar">
        <label htmlFor="site-search">Search </label>
        <input
          type="text"
          placeholder={`Search ${activeTab}`}
          value={searchQuery}
          onChange={handleSearch}
          className="search-input"
        />

        <button id="logout" onClick={handleLogout}>
          logout
        </button>
      </div>

      <div id="tabContainer">
        <button
          className={activeTab === "users" ? "tab active" : "tab"}
          onClick={() => setActiveTab("users")}
        >
          <div className="iconContainer">
            <RiUser3Line />
          </div>
          Users
        </button>
        <button
          className={activeTab === "approved" ? "tab active" : "tab"}
          onClick={() => setActiveTab("approved")}
        >
          <div className="iconContainer">
            <FaBuildingCircleCheck />
          </div>
          Approved Restaurants
        </button>
        <button
          className={activeTab === "unapproved" ? "tab active" : "tab"}
          onClick={() => setActiveTab("unapproved")}
        >
          <div className="iconContainer">
            <FaBuildingCircleXmark />
          </div>
          Unapproved Restaurants
        </button>
        <button
          className={activeTab === "profit" ? "tab active" : "tab"}
          onClick={() => setActiveTab("profit")}
        >
          <div className="iconContainer">💰</div>
          Profit
        </button>
      </div>

      <div className="admin-tab-content">
        {activeTab === "users" && (
          <>
            <ul className="responsive-table" id="usersTable">
              <li className="table-header">
                <div className="col col-1">Name</div>
                <div className="col col-2">Email</div>
                <div className="col col-4">Diet system</div>
                <div className="col col-5">Actions</div>
              </li>
              {clients.map((client) => (
                <li key={client.id} className="table-row">
                  <div>{client.name}</div>
                  <div>{client.email}</div>
                  <div>
                    {client.is_vegetarian ? "vegetarian" : "non-vegetarian"}
                  </div>
                  <div className="actions">
                    <button onClick={() => deleteClient(client.id)} id="delete">
                      Delete
                    </button>
                    <button id="suspend">Suspend</button>
                  </div>
                </li>
              ))}
            </ul>
          </>
        )}

        {loading ? (
          <p>Loading...</p>
        ) : (
          activeTab === "approved" && (
            <>
              <ul className="responsive-table">
                <li className="table-header">
                  <div className="col col-1">License</div>
                  <div className="col col-2">ID</div>
                  <div className="col col-3">Name</div>
                  <div className="col col-4">Actions</div>
                </li>
                {approvedRestaurants.map((restaurant) => (
                  <li key={restaurant.id} className="table-row">
                    <div>
                      <img
                        src={restaurant.license}
                        alt="License"
                        id="rest_lic"
                      />
                    </div>
                    <div>{restaurant.id}</div>
                    <div>{restaurant.name}</div>
                    <div>
                      <button
                        onClick={() => deleteRestaurant(restaurant.id)}
                        id="delete"
                      >
                        Delete
                      </button>
                      <button
                        onClick={() => unapproveRestaurant(restaurant.id)}
                        id="unapprove"
                      >
                        Unapprove
                      </button>
                    </div>
                  </li>
                ))}
              </ul>
            </>
          )
        )}

        {activeTab === "unapproved" && (
          <>
            <ul className="responsive-table">
              <li className="table-header">
                <div className="col col-1">License</div>
                <div className="col col-2">ID</div>
                <div className="col col-3">Name</div>
                <div className="col col-4">Actions</div>
              </li>
              {unapprovedRestaurants.map((restaurant) => (
                <li key={restaurant.id} className="table-row">
                  <div>
                    <img src={restaurant.license} alt="License" id="rest_lic" />
                  </div>
                  <div>{restaurant.id}</div>
                  <div>{restaurant.name}</div>
                  <div>
                    <button
                      onClick={() => deleteRestaurant(restaurant.id)}
                      id="delete"
                    >
                      Delete
                    </button>
                    <button
                      onClick={() => approveRestaurant(restaurant.id)}
                      id="approve"
                    >
                      Approve
                    </button>
                  </div>
                </li>
              ))}
            </ul>
          </>
        )}
        {activeTab === "profit" && (
          <>
            <ul className="responsive-table">
              <li className="table-header">
                <div className="col col-1">Restaurant ID</div>
                <div className="col col-2">Restaurant Name</div>
                <div className="col col-3">Profit</div>
                <div className="col col-4">Total Sales</div>
              </li>
              {profits.map((item) => (
                <li key={item.restaurant_id} className="table-row">
                  <div>{item.restaurant_id}</div>
                  <div>{item.restaurant.name}</div>
                  <div>{item.profit}</div>
                  <div>{item.total_sales}</div>
                </li>
              ))}
            </ul>
          </>
        )}
      </div>
      {modalData && (
        <ConfirmModal
          message={modalData.message}
          onConfirm={handleModalConfirm}
          onCancel={() => setModalData(null)}
        />
      )}

      {alertData && (
        <AlertModal
          message={alertData.message}
          type={alertData.type}
          onClose={() => setAlertData(null)}
        />
      )}
    </div>
  );
};

export default AdminDashboard;
