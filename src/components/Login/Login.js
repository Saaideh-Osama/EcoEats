import React, { useState } from "react";
import {  MDBBtn,  MDBContainer,  MDBRow,  MDBCol,  MDBInput}
from 'mdb-react-ui-kit';
import axios from "axios";
import logo from '../../assets/images/loginlogo.png';
import "./Login.css";

function Login() {

 //Context-object

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
 

 const handleSubmit = async (e) => {

    e.preventDefault();
  try{
    const response = await axios.post(
      "https://your-ngrok-url.ngrok.io/api/login",
      {
        email,
        password,
      },
      {
        headers: {
          "Content-Type": "application/json",
        }
      }
    );
    console.log("Login Successful", response.data);
  }
  catch(err){
    console.error("Login Error", err);
    setError(err.response?.data?.message || "Login failed");
}
  }


  return (
    <MDBContainer className="mt-3 gradient-form  vh-90" style={{maxHeight: '90vh',maxWidth:'70vw',borderRadius: '0px',backgroundColor:'#d0c6bd'}}/*the biggest container*/ > 

    <MDBRow  className="h-100" >

      <MDBCol col='6' className="mb-5  "  style={{maxHeight: '90vh',maxWidth:'35vw'}}>
        <form className="d-flex flex-column ms-5" onSubmit={handleSubmit}>

          <div className="text-center">
            <img src={logo}
              style={{width: '185px'}} alt="logo" />

          </div>

          <p>Please login to your account</p>


          <MDBInput wrapperClass='mb-4' label='Email address' id='form1' type='email'  onChange={(e) => setEmail(e.target.value)} />
          <MDBInput wrapperClass='mb-4' label='Password' id='form2' type='password' onChange={(e) => setPassword(e.target.value)}/>


          <div className="text-center pt-1 mb-5 pb-1">
            <MDBBtn className="mb-4 w-100 gradient-custom-2 text-white" style={{maxHeight: '6vh',maxWidth:'10vw', backgroundColor:'#54473F',borderWidth:'0px' }} >Sign in</MDBBtn>
            
          </div>

          <div className="d-flex flex-row align-items-center justify-content-center pb-4 mb-4">
            <p className="mb-0 mt-0 pt-0 text-black">Don't have an account?</p>
            <MDBBtn outline className='mx-2' color=''  style={{maxHeight: '6vh',maxWidth: '8vw',backgroundColor:'#54473F',borderWidth:'0px'}} >
              <a href="/signup" className="text-white" style={{textDecoration: 'none',fontColor: '#41644A'}} >Register</a>
            </MDBBtn>
          </div>

        </form>

      </MDBCol>

      <MDBCol col='6' className="mb-5" style={{ paddingRight: '0px'}} >
        <div className="d-flex flex-column  justify-content-center gradient-custom-2 h-95 mb-4 h-100 " style={{borderRadius: '0px' , paddingRight: '0px' ,fontColor: '#3A4F7A'}}>
          <div className=" px-0 py-4 p-md-5 mx-md-4 h-100  "  style={{borderRadius: '0px' , paddingRight: '0px' ,fontColor: '#332c28'}}>
            <h4 class="mb-4" >We are more than just a company</h4>
            <p class="small mb-0">Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod
              tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud
              exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
            </p>
          </div>

        </div>

      </MDBCol>

    </MDBRow>

  </MDBContainer>
  );}

export default Login;
