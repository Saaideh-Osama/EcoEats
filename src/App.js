import { BrowserRouter, Routes, Route } from "react-router-dom";
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

// <Route  path="/createmeal" element={<CreateMeal/>}/>

function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route index path="/" element={<Home />} />
        <Route index path="res_home" element={<ResHome />} />

        <Route path="/meals" element={<Meals />} />
        <Route
          path="/createmeal"
          element={
            <RestaurantProtectedRoute>
              <CreateMeal />{" "}
            </RestaurantProtectedRoute>
          }
        />
        <Route path="/signup" element={<AuthForm />} />
        <Route path="/resignup" element={<RestaurantSignup />} />
        <Route path="/restaurantslist" element={<RestaurantsList />} />
        <Route path="/restaurant/:id" element={<SinglePageRestaurant />} />
        <Route path="/client" element={<Meals />} />
        <Route
          path="/editclient"
          element={
            <ClientProtectedRoute>
              {" "}
              <EditClientProfile />{" "}
            </ClientProtectedRoute>
          }
        />
        <Route
          path="/editrestaurant"
          element={
            <RestaurantProtectedRoute>
              <EditRestaurantProfile />
            </RestaurantProtectedRoute>
          }
        />
        <Route
          path="/restdash"
          element={
            <RestaurantProtectedRoute>
              <RestaurantDashboard />
            </RestaurantProtectedRoute>
          }
        />
        <Route path="/admin" element={<AdminDashboard />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
