import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./components/Login/Login";
import ClientSignup from "./components/Signup/ClientSignup";
import './App.css';
import RestaurantSignup from "./components/Signup/RestaurantSignup";
import Home from "./components/Home/Home";
import Meals from "./components/Client/Meals";
import AuthForm from "./components/AuthForm";

function App() {
  return (
  <BrowserRouter>
      <Routes>
          <Route index path="/" element={<Home/>}/>
          <Route  path="/login" element={<Login/>}/>
          <Route  path="/signup" element={<AuthForm/>} />
          <Route  path="/resignup" element={<RestaurantSignup />} />
          <Route  path="/client" element={<Meals/>}/>

        </Routes>
    </BrowserRouter>
    
  );
}

export default App;
