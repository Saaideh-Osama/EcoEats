import React, { useState } from 'react'
import logo from '../../assets/images/loginlogo.png';
import axios from 'axios';
import { MDBInput,
    MDBDropdown,
    MDBDropdownToggle,
    MDBDropdownMenu,
    MDBDropdownItem,
    MDBBtn,
    MDBCol,
    MDBContainer, 
    MDBRow
} from "mdb-react-ui-kit"; 



  

function Signup() {

    const [email, setEmail] = useState("");
    const [name, setName] = useState("");
    const [number, setNumber] = useState("");
    const [password, setPassword] = useState("");
    const [selectedValue, setSelectedValue] = useState("Select Diet");
    const [error, setError] = useState("");
    const [successMessage, setSuccessMessage] = useState("");

        const handleSelect = (value) => { setSelectedValue(value);};
        
        const handleSubmit = async (e) => {
            e.preventDefault();
            setError("");
            setSuccessMessage("");
    
            try {
                const response = await axios.post("https://your-ngrok-url.ngrok.io/api/signup", {
                    email,
                    name,
                    phone_number: number,
                    password,
                    diet_preference: selectedValue
                }, {
                    headers: { "Content-Type": "application/json" }
                });
    
                console.log("Signup Successful", response.data);
                setSuccessMessage("Signup successful! You can now log in.");
            } catch (err) {
                console.error("Signup Error", err);
                setError(err.response?.data?.message || "Signup failed. Please try again.");
            }
        };


  return (
<MDBContainer className='  d-flex justify-content-center align-content-center my-3'  style={{maxWidth:'70vw',borderRadius: '0px',backgroundColor:'#d0c6bd'}}/*the biggest container*/ >
            <form  className='d-flex flex-column' onSubmit={handleSubmit}>

    <MDBRow className='' >
            
        <MDBCol className='d-flex flex-column align-content-center justify-content-evenly px-5 ' col='6' >
        <h2>Sign up</h2>
        <MDBInput wrapperClass='mb-2' label='Email address' type='email'  onChange={(e) => setEmail(e.target.value)} />
        <MDBInput wrapperClass='mb-2' label='name' type='text' onChange={(e) => setName(e.target.value)}/>
        <MDBInput wrapperClass='mb-2' label='phone-Number' type='number' onChange={(e) => setNumber(e.target.value)}/>
        <MDBInput wrapperClass='mb-2' label='Password' type='password' onChange={(e) => setPassword(e.target.value)}/>
       
        <MDBDropdown>
        <MDBDropdownToggle tag='a' className='btn btn-warning text-black'  onChange={(e) => handleSelect(e.target.value)}>
        {selectedValue}
        </MDBDropdownToggle>
        <MDBDropdownMenu>
        <MDBDropdownItem  link onClick={() => handleSelect("Vegetarian")}>Vegetarian</MDBDropdownItem>
        <MDBDropdownItem link onClick={() => handleSelect("Vegan")}>vegan</MDBDropdownItem>
        <MDBDropdownItem link  onClick={() => handleSelect("Omnivore")}>omnivore</MDBDropdownItem>
        <MDBDropdownItem  link onClick={() => handleSelect("lactose intolerant")}>lactose intolerant</MDBDropdownItem>
        <MDBDropdownItem  link onClick={() => handleSelect("gluten free")}>gluten free</MDBDropdownItem>
        <MDBDropdownItem  link onClick={() => handleSelect("diabetic")}>diabetic</MDBDropdownItem>
        </MDBDropdownMenu>
        </MDBDropdown>
            <div className="text-center pt-2 mb-3 pb-1">
                <MDBBtn className="mb-4 w-100 gradient-custom-2 text-white" style={{maxHeight: '6vh',maxWidth:'10vw', backgroundColor:'#54473F',borderWidth:'0px' }} >Sign up</MDBBtn>
            </div>
    <div className='text-center pt-1 mb-3 pb-1'>Already have an account? <a href='/'>Login</a></div>
        </MDBCol>
        <MDBCol col='6' className="mb-5 gradient-custom-2  d-flex flex-column justify-content-center align-content-centers" style={{ paddingRight: '0px'}} >
            <img src={logo} style={{width:'150px',height:'150px'}}/>
            <div className="d-flex flex-column  justify-content-center  h-95 mb-4 h-100 " style={{fontColor: '#3A4F7A'}}>
                    <div className=" px-0 py-4 p-md-5 mx-md-4 h-100  "  style={{borderRadius: '0px' , paddingRight: '0px' ,fontColor: '#332c28'}}>
                    <h4 className="mb-4" >We are more than just a company</h4>
                    <p className="small mb-0">Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod
                    tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud
                    exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
                    </p>
                </div>
            </div>
    
        </MDBCol>
    </MDBRow>
    </form>
</MDBContainer>


    )
}

export default Signup