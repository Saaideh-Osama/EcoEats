// src/context/UserContext.js
import React, { createContext, useState, useEffect } from "react";
import axios from "axios";

export const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null); // user data
  const [loading, setLoading] = useState(true); // loading state


  
<UserContext.Provider value={{ user, setUser, loading}}></UserContext.Provider>

 
    const fetchUser = async () => {
      const token = localStorage.getItem("authToken"); // or wherever you store your token
      if (!token) {
        setLoading(false);
        return;
      }

      try {
        const response = await axios.get("https://ad67-91-186-251-160.ngrok-free.app/api/client/info", {
          headers: {
            'Accept': 'application/json',
            'ngrok-skip-browser-warning': 'true',
             "Authorization": `Bearer ${token}`
          },
        });

        setUser(response.data.client_info); // update user state\
        
      } catch (error) {
        console.error("Failed to fetch user info:", error);
        setUser(null);
      } finally {
        setLoading(false);
      }
    };

 

  return (
    <UserContext.Provider value={{ user, setUser, loading,fetchUser }}>
      {children}
    </UserContext.Provider>
   
  );
};
