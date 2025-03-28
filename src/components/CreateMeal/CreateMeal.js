import React from 'react'
import './CreateMeal.css'
function CreateMeal() {
  return (
    <div id='create-meal-container'>
<form id='create-meal-form' encType='multipart/formdata'> 
<div><label>Meal Name :</label> <input type='text' name='meal-name'/> </div>
<div><label>Meal category :</label><select  name='meal-category'>
<option> shawarma</option>
<option> burger</option>
<option> pasta</option>
<option> salad</option>
<option> pizza</option>
<option> chicken sandwich</option>
</select></div>
<div ><label>Available Quantity</label> <input type="number" name='available-quantity'/></div>
<div> Meal price : <input type="number" name='meal-price'/></div>
<div> Upload Meal Image : <input type="file" name='meal-image'/></div>

</form>



    </div>



  )
}

export default CreateMeal