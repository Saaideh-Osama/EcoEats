import { BrowserRouter, Routes, Route } from "react-router-dom";
import './App.css';
import RestaurantSignup from "./components/Restaurant/Signup/RestaurantSignup";
import Meals from "./components/Client/MealListings/Meals";
import AuthForm from "./components/Login/AuthForm";
import Navbar from "./components/Navbar/Navbar";
import Home from "./components/Home/Home";
import CreateMeal from "./components/Restaurant/CreateMeal/CreateMeal";
import RestaurantsList from "./components/Client/RestaurantsList/RestaurantsList";
import SinglePageRestaurant from "./components/Client/RestaurantsList/SinglePageRestaurant";
import EditUserProfile from "./components/Client/EditProfile/EditUserProfile";
import EditRestaurantProfile from "./components/Restaurant/EditRestaurantProfile/EditRestaurantProfile";
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
          <Route  path="/editclient" element={<EditUserProfile/>}/>
          <Route  path="/editrestaurant" element={<EditRestaurantProfile/>}/>
          
          
        </Routes>
        
    </BrowserRouter>
    
  );
}

export default App;
