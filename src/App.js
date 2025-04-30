import { BrowserRouter, Routes, Route } from "react-router-dom";
import './App.css';
import RestaurantSignup from "./components/Signup/RestaurantSignup";

import Meals from "./components/Client/Meals";
import AuthForm from "./components/AuthForm";
import Navbar from "./components/Navbar/Navbar";
import Home from "./components/Home/Home";
import CreateMeal from "./components/CreateMeal/CreateMeal";
import RestaurantsList from "./components/RestaurantsList/RestaurantsList";
import SinglePageRestaurant from "./components/RestaurantsList/SinglePageRestaurant";

// <Route  path="/createmeal" element={<CreateMeal/>}/>

function App() {
  return (

<BrowserRouter>
    <Navbar></Navbar>

      <Routes>
          <Route index path="/" element={<Home/>}/>
          <Route  path="/meals" element={<Meals/>}/>
          <Route path ="/createmeal" element={<CreateMeal/>}/>
          <Route  path="/signup" element={<AuthForm/>} />
          <Route  path="/resignup" element={<RestaurantSignup />} />
          <Route  path="/restaurantslist" element={<RestaurantsList />} />
          <Route path="/restaurant/:id" element={<SinglePageRestaurant />} />

          <Route  path="/client" element={<Meals/>}/>
          
          
        </Routes>
        
    </BrowserRouter>
    
  );
}

export default App;
