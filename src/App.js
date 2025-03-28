import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./components/Login/Login";
import ClientSignup from "./components/Signup/ClientSignup";
import './App.css';
import RestaurantSignup from "./components/Signup/RestaurantSignup";
import Home from "./components/Home/Home";
import Navbar from "./components/Navbar/Navbar";
import CreateMeal from "./components/CreateMeal/CreateMeal";

function App() {
  return (

<BrowserRouter>
<Navbar/>

      <Routes>
          <Route index path="/" element={<Home />} />
          <Route  path="/login" element={<Login />} />
          <Route  path="/signup" element={<ClientSignup />} />
          <Route  path="/resignup" element={<RestaurantSignup />} />
          <Route path="/createmeal" element={<CreateMeal/>}/>
        </Routes>
        
    </BrowserRouter>
    
  );
}

export default App;
