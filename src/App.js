import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import "./App.css";
import GuestProtectedRoute from "./components/protectedRoute/GuestProtectedRoute";
import ClientProtectedRoute from "./components/protectedRoute/ClientProtectedRoute";
import RestaurantProtectedRoute from "./components/protectedRoute/RestaurantProtectedRoute";
import RestaurantSignup from "./components/Restaurant/Signup/RestaurantSignup";
import Meals from "./components/Client/MealListings/Meals";
import AuthForm from "./components/Login/AuthForm";
import Navbar from "./components/Navbar/Navbar";
import Home from "./components/Home/Home";
import CreateMeal from "./components/Restaurant/CreateMeal/CreateMeal";
import RestaurantsList from "./components/Client/RestaurantsList/RestaurantsList";
import SinglePageRestaurant from "./components/Client/RestaurantsList/SinglePageRestaurant";
import EditClientProfile from "./components/Client/EditProfile/EditClientProfile";
import EditRestaurantProfile from "./components/Restaurant/EditRestaurantProfile/EditRestaurantProfile";
import RestaurantDashboard from "./components/Restaurant/RestaurantDashboard/RestaurantDashboard";
import AdminDashboard from "./components/Admin/AdminDashboard";
import ResHome from "./components/Home/ResHome";
import OrdersList from "./components/Client/Orders/OrdersList";
import AlertModal from "./components/Alerts/AlertModal";
import ClientDashboard from "./components/Client/ClientDashboard";

// Wrapper to use useLocation hook
const AppWrapper = () => {
  const location = useLocation();

  return (
    <>
      {/* Conditionally render Navbar based on the current route */}
      {location.pathname !== "/admin" && <Navbar />}
      <Routes>
        <Route index path="/" element={<Home />} />
        <Route index path="res_home" element={<ResHome />} />
        <Route path="/meals" element={<Meals />} />
        <Route path="/createmeal" element={<CreateMeal />} />
        <Route path="/alertsuccess" type='success' element={<AlertModal />} />
        <Route path="/signup" element={<AuthForm />} />
        <Route path="/resignup" element={<RestaurantSignup />} />
        <Route path="/restaurantslist" element={<RestaurantsList />} />
        <Route path="/restaurant/:id" element={<SinglePageRestaurant />} />
        <Route path="/client" element={<Meals />} />
        <Route path="/orderslist" element={<OrdersList />} />
        <Route path="/editclient" element={<EditClientProfile />} />
        <Route path="/clientmain" element={<ClientDashboard />} />
        <Route path="/editrestaurant" element={<EditRestaurantProfile />} />
        <Route path="/restdash" element={<RestaurantDashboard />} />
        <Route path="/admin" element={<AdminDashboard />} />
      </Routes>
    </>
  );
};

function App() {
  return (
    <BrowserRouter>
      <AppWrapper />
    </BrowserRouter>
  );
}

export default App;
