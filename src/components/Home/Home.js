import React from 'react'
import Bag from '../../assets/images/bag .jpg'
import Box from '../../assets/images/box-removebg-preview.png'
import home from '../../assets/images/home.png'
import "@fontsource/raleway"; // Defaults to weight 400
import "@fontsource/raleway/400.css"; // Specify weight
import "@fontsource/raleway/400-italic.css"; // Specify weight and style
import './Home.css'
function Home() {
  return (
    <div id='home-page'>
<img src={home} id='home-background' alt='background'/>
<div id='signup-links'> <a  href='/signup' id='client-button'>Sign up as a<br/> client </a>  <a href='/resignup' id='rest-button'>Sign up as a Restaurant </a></div>

<div id='ourmission'>
     <img src={Bag} alt='bag img' style={{width:'40vw' , height:'70vh'}} />  
    <div id='mission-typing'> <h3 > Our Mission </h3>
<p id='mission description'> At ecoEats, our mission is to make great food more 
    accessible by offering it at half the price or less,
     rescuing surplus food nearby, and reducing waste to
      help the environment. We also encourage discovering 
      new flavors from local cafes, bakeries, and restaurants
       while making a positive impact on the planet  </p>
    </div>
</div>
<div id='why-ecobites'>
    <div id='title'>WHY TO USE ecoEATS?</div>
    <div id='top-left'>Try something new from local cafes, bakeries or restaurants</div>
    <div id='mid-right'>Help the environment by reducing food waste    </div>
    <div id='bottom-left'>Enjoy good food at ½ price or less    </div>
    <div id='box-center'><img src={Box}/></div>


    </div>


    </div>
)
}

export default Home