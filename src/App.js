import { BrowserRouter, Routes, Route } from "react-router-dom";
import './App.css';
import RestaurantSignup from "./components/Signup/RestaurantSignup";
import Home from "./components/Home/Home";
import NavBar from "./components/Navbar/Navbar"
import Meals from "./components/Client/Meals";
import AuthForm from "./components/AuthForm";
import Navbar from "./components/Navbar/Navbar";
import CreateMeal from "./components/CreateMeal/CreateMeal";
import RestaurantsList from "./components/RestaurantsList/RestaurantsList";

function App() {
  return (

<BrowserRouter>
    <Navbar></Navbar>

      <Routes>
          <Route index path="/" element={<Meals/>}/>
          
          <Route  path="/signup" element={<AuthForm/>} />
          <Route  path="/resignup" element={<RestaurantSignup />} />
          <Route  path="/client" element={<Meals/>}/>
          <Route  path="/createmeal" element={<CreateMeal/>}/>
          <Route  path="/restaurants" element={<RestaurantsList/>}/>

        </Routes>
        
    </BrowserRouter>
    
  );
}

export default App;
