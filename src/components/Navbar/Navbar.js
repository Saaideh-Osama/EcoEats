import React from 'react'
import '../Navbar/Navbar.css'
import { useNavigate } from "react-router-dom";
function Navbar() {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("authToken");
    window.location.href = "/login"; // Redirect to login page
  };
  return (
    
    <div id='navbar'>
      
      <nav>
<ul>

<li><a href='/'>Home </a></li>
<li> <a onClick={() => navigate("/signup", { state: { isSignup: true } })} >Client Signup </a></li>
<li> <a href='/resignup' >Restaurant Signup </a> </li>
<li> <a onClick={() => navigate("/signup", { state: { isLogin: true } })} >Login  </a> </li>
<li> <a href='/createmeal' >createmeal  </a> </li>
<li> <a onClick={handleLogout}>Logout </a>   </li>


</ul>
</nav>

</div>


  )
}

export default Navbar