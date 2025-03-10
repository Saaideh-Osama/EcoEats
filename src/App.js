import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./components/Login/Login";
import Signup from "./components/Signup/Signup";
import './App.css';

function App() {
  return (
  <BrowserRouter>
      <Routes>
          <Route index path="/" element={<Login />} />
          <Route  path="/signup" element={<Signup />} />
        </Routes>
    </BrowserRouter>
    
  );
}

export default App;
