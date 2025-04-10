import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './RestaurantsList.css'; 
import salmon from '../../assets/images/salmon.jpg';
import Restlogo1  from '../../assets/images/rest-logo1.jpg';
import Restlogo2  from '../../assets/images/rest-logo2.jpg';
import Restlogo3  from '../../assets/images/rest-logo3.jpg';
import Restlogo4  from '../../assets/images/rest-logo4.jpg';

// Import the CSS file for styling
import RestaurantCard from './RestaurantCard'; // Import the RestaurantCard component
const AllRestaurants = () => {
  const [restaurants, setRestaurants] = useState([]); // to store the fetched restaurant data
  const [loading, setLoading] = useState(true); // to track loading state
  const [error, setError] = useState(null); // to store any error messages
  
 
  // Fetch the data when the component mounts
 /* useEffect(() => {
    
    const fetchRestaurants = async () => {
      try {
        // Set the request headers to accept JSON
        const response = await axios.get('https://fe4d-91-186-249-228.ngrok-free.app/api/get/all-restaurants', {
          headers: {
            'Accept': 'application/json',
            'ngrok-skip-browser-warning': 'true', // Bypasses ngrok's warning page
          },
        
        });
        

        // Set the restaurants data to the state
        setRestaurants(response.data.restaurants); // Axios automatically parses the JSON response
        console.log('Response:', response); // Check the entire response object
        console.log('Data:', response.data); // Check the actual data received
        console.log('Data:', response.data.restaurants); // Check the actual data received
      } catch (err) {
         // Set dummy data in case of error
        // Set error message if any error occurs
        setError(err.message || 'Something went wrong!');
      } finally {
        setLoading(false); // Set loading to false when the fetch is complete
      }
    };

    // Call the fetch function
    fetchRestaurants();
  }, []); // Empty array means the effect runs only once when the component is mounted

  if (loading) {
    return <div>Loading...</div>; // Display loading message while data is being fetched
  }

  if (error) {
    return <div>Error: {error}</div>; // Display error message if something goes wrong
  }*/
  const dummyRestaurants =  [
        {
            "id": "1",
            "name": "Restaurant Name",
            "phone_number": "0598765432",
            "email": "restaurant@example.com",
            "password": "$2y$12$6rYOJrqHPch.sI3neOxl7Oz8JgylmXXVORIEJBUL/gAchnhTExuhS",
            "role_id": 3,
            "working_hours_from": "02:30:30",
            "working_hours_to": "00:00:00",
            "address": "123 Street Name, City, Country",
            "is_approved": 1,
            "restaurant_info": "This is a description of the restaurant",
            "license": salmon,
            "created_at": "2025-03-17T12:27:05.000000Z",
            "updated_at": "2025-03-17T12:27:05.000000Z"
        },
        {
            "id": 2,
            "name": "Restaurant Name",
            "phone_number": "0598765432",
            "email": "restauranwwt@example.com",
            "password": "$2y$12$3l//9.jn7igUVquu6rpEaOHifHSEIr8yYYJveZGwGRROpKheUypum",
            "role_id": 3,
            "working_hours_from": "00:00:00",
            "working_hours_to": "00:00:00",
            "address": "123 Street Name, City, Country",
            "is_approved": 1,
            "restaurant_info": "This is a description of the restaurant",
            "license": Restlogo1,
            "created_at": "2025-03-17T18:23:31.000000Z",
            "updated_at": "2025-03-17T18:23:31.000000Z"
        },
        {
            "id": 3,
            "name": "res1",
            "phone_number": "123",
            "email": "res1@gmail.com",
            "password": "$2y$12$mAxhcnxpuoIH7flYKKwDsOaJy06edfCK5jcJDvuJffIbfvPgJW4aG",
            "role_id": 3,
            "working_hours_from": "00:00:00",
            "working_hours_to": "00:00:00",
            "address": "res",
            "is_approved": 0,
            "restaurant_info": "res",
            "license":Restlogo2,
            "created_at": "2025-03-18T20:13:24.000000Z",
            "updated_at": "2025-03-18T20:13:24.000000Z"
        },
        {
            "id": 4,
            "name": "Restaurant Name",
            "phone_number": "0598765432",
            "email": "restauranwwzzt@example.com",
            "password": "$2y$12$4KwqnnbKhtmHID./5dF4iu8V/nWc3KZYDa/VnmzXlHVuGvopmSwp6",
            "role_id": 3,
            "working_hours_from": "00:00:00",
            "working_hours_to": "00:00:00",
            "address": "123 Street Name, City, Country",
            "is_approved": 1,
            "restaurant_info": "This is a description of the restaurant",
            "license": Restlogo3,
            "created_at": "2025-03-19T20:51:28.000000Z",
            "updated_at": "2025-03-19T20:51:28.000000Z"
        },
        {
            "id": 5,
            "name": "Best Restaurants",
            "phone_number": "1234567890",
            "email": "best@example.com",
            "password": "$2y$12$ZHU9XMn5Y9wq/KULOg.aYOSoF6lX6Ds.KE0IC6nn0QAnTB72OdQ2G",
            "role_id": 3,
            "working_hours_from": null,
            "working_hours_to": null,
            "address": "456 Avenue, City",
            "is_approved": 0,
            "restaurant_info": "A popular restaurant known for its amazing food.",
            "license": Restlogo4,
            "created_at": "2025-03-28T13:44:30.000000Z",
            "updated_at": "2025-03-28T13:44:30.000000Z"
        },
        {
            "id": 6,
            "name": "Best Restaurant",
            "phone_number": "1234567890",
            "email": "best2@example.com",
            "password": "$2y$12$jkSFaI8LvawRtbaL/RfcR.Sh./2rrGL1boEbL8A3D7WPOukkgrh7G",
            "role_id": 3,
            "working_hours_from": null,
            "working_hours_to": null,
            "address": "456 Avenue, City",
            "is_approved": 0,
            "restaurant_info": "A popular restaurant known for its amazing food.",
            "license": salmon,
            "created_at": "2025-03-28T13:46:03.000000Z",
            "updated_at": "2025-03-28T13:46:03.000000Z"
        },
        {
            "id": 7,
            "name": "Best Restaurant",
            "phone_number": "1234567890",
            "email": "best3@example.com",
            "password": "$2y$12$Q.MUcrP26LL1hIxHWP.9OuBzbevDfUGMTmgMqMyMm/6wM3gy/eXwW",
            "role_id": 3,
            "working_hours_from": "09:00",
            "working_hours_to": "22:00",
            "address": "456 Avenue, City",
            "is_approved": 0,
            "restaurant_info": "A popular restaurant known for its amazing food.",
            "license":Restlogo1,
            "created_at": "2025-03-28T13:47:19.000000Z",
            "updated_at": "2025-03-28T13:47:19.000000Z"
        },
        {
            "id": 8,
            "name": "Best Restaurant",
            "phone_number": "1234567890",
            "email": "best22@example.com",
            "password": "$2y$12$Fuqkgiq66NnR3wpm1MIlnuUBVyhuwRBOgLagXPesOiqEwkcJerCyG",
            "role_id": 3,
            "working_hours_from": "09:00",
            "working_hours_to": "22:00",
            "address": "456 Avenue, City",
            "is_approved": 0,
            "restaurant_info": "A popular restaurant known for its amazing food.",
            "license": Restlogo2,
            "created_at": "2025-03-28T13:57:17.000000Z",
            "updated_at": "2025-03-28T13:57:17.000000Z"
        },
        {
            "id": 9,
            "name": "Restaurant Name",
            "phone_number": "0123456789",
            "email": "restauran3t@example.com",
            "password": "$2y$12$5RjB1go9e6XxqtjTotuvDOP/QIwjS5xgXZua4inP2UPO9eerQJ3V.",
            "role_id": 3,
            "working_hours_from": "10:00 AM",
            "working_hours_to": "10:00 PM",
            "address": "123 Restaurant St, City, Country",
            "is_approved": 0,
            "restaurant_info": "This is a description of the restaurant",
            "license":Restlogo3,
            "created_at": "2025-03-28T21:28:50.000000Z",
            "updated_at": "2025-03-28T21:28:50.000000Z"
        },
        {
            "id": 10,
            "name": "rest",
            "phone_number": "0787481234",
            "email": "restggg@gmail.com",
            "password": "$2y$12$/QM7ga6UCi8qiLo6wOdEp.9Ccc8/mxo6IPJPit5wxWABs0ClvOdo6",
            "role_id": 3,
            "working_hours_from": "10",
            "working_hours_to": "11",
            "address": "as",
            "is_approved": 0,
            "restaurant_info": "12",
            "license": Restlogo4,
            "created_at": "2025-03-28T21:34:47.000000Z",
            "updated_at": "2025-03-28T21:34:47.000000Z"
        },
        {
            "id": 11,
            "name": "sdfas",
            "phone_number": "0798562256",
            "email": "talashwikie@gmail.com",
            "password": "$2y$12$rmjwrHqV6.9289xRr2OcdOfkvqePTJhWJerpEFXSMwfxCcw8qYRR6",
            "role_id": 3,
            "working_hours_from": "06:30",
            "working_hours_to": "13:00",
            "address": "wsadfgbdsaSQ",
            "is_approved": 0,
            "restaurant_info": "qadsfgthfdsa",
            "license": salmon,
            "created_at": "2025-03-28T21:37:32.000000Z",
            "updated_at": "2025-03-28T21:37:32.000000Z"
        },
        {
            "id": 12,
            "name": "Restauranttest",
            "phone_number": "0777777777",
            "email": "rest@gmail.com",
            "password": "$2y$12$vN9gLSKrUkmHZIWlLuE9Ne95AcHOhCcYis6UdVUrmZLpEQgpNhDxK",
            "role_id": 3,
            "working_hours_from": "12",
            "working_hours_to": "10",
            "address": "as",
            "is_approved": 1,
            "restaurant_info": "a",
            "license": salmon,
            "created_at": "2025-03-28T21:39:14.000000Z",
            "updated_at": "2025-03-28T21:39:14.000000Z"
        },
        {
            "id": 13,
            "name": "Restaurant Name",
            "phone_number": "28928982",
            "email": "restaurant@example.comd",
            "password": "$2y$12$tncksYpF1f1JHFI.EB7vm.aU4jm0DeTC58kZqmvjn9jSizZ.7ZClu",
            "role_id": 3,
            "working_hours_from": "10:00 AM",
            "working_hours_to": "10:00 PM",
            "address": "123 Restaurant St, City, Country",
            "is_approved": 0,
            "restaurant_info": "This is a description of the restaurant",
            "license": salmon,
            "created_at": "2025-03-29T13:04:25.000000Z",
            "updated_at": "2025-03-29T13:04:25.000000Z"
        },
        {
            "id": 14,
            "name": "Restaurant Name",
            "phone_number": "28928982",
            "email": "restau2rant@example.comd",
            "password": "$2y$12$XV8o.d.rcGvPjZ5zgyx0K.Ybk9J.9iJxjMY0.JOgb5Oa83pdSF/HG",
            "role_id": 3,
            "working_hours_from": "10:00 AM",
            "working_hours_to": "10:00 PM",
            "address": "123 Restaurant St, City, Country",
            "is_approved": 0,
            "restaurant_info": "This is a description of the restaurant",
            "license": salmon,
            "created_at": "2025-03-29T20:24:32.000000Z",
            "updated_at": "2025-03-29T20:24:32.000000Z"
        },
        {
            "id": 15,
            "name": "Restaurant Name",
            "phone_number": "28928982",
            "email": "restau2rant@example.comd12",
            "password": "$2y$12$UwyPQ9giQfPr7dSqelY9fOA/xgklpbFDtwhIDylBgWeDmJVrZxlQ2",
            "role_id": 3,
            "working_hours_from": "10:00 AM",
            "working_hours_to": "10:00 PM",
            "address": "123 Restaurant St, City, Country",
            "is_approved": 0,
            "restaurant_info": "This is a description of the restaurant",
            "license": salmon,
            "created_at": "2025-03-29T21:02:41.000000Z",
            "updated_at": "2025-03-29T21:02:41.000000Z"
        },
        {
            "id": 16,
            "name": "user",
            "phone_number": "0795956417",
            "email": "tasneem@gmail.com",
            "password": "$2y$12$v8yzee/YYDfePLrA0NK1FetMDemtYJh5eWAi.nHLDZ8ViTf7Zp71S",
            "role_id": 3,
            "working_hours_from": "04:30",
            "working_hours_to": "12:30",
            "address": "amman",
            "is_approved": 0,
            "restaurant_info": "market",
            "license": salmon,
            "created_at": "2025-03-29T21:07:31.000000Z",
            "updated_at": "2025-03-29T21:07:31.000000Z"
        },
        {
            "id": 17,
            "name": "Restaurant Name",
            "phone_number": "28928982",
            "email": "restau2raent@example.comd12",
            "password": "$2y$12$JHpKkZlHc3xPxIHdsoEbVuRleu4YzVmy.Co5n58xzWeNUDZa32gKy",
            "role_id": 3,
            "working_hours_from": "10:00 AM",
            "working_hours_to": "10:00 PM",
            "address": "123 Restaurant St, City, Country",
            "is_approved": 0,
            "restaurant_info": "This is a description of the restaurant",
            "license":salmon,
            "created_at": "2025-03-29T21:18:57.000000Z",
            "updated_at": "2025-03-29T21:18:57.000000Z"
        },
        {
            "id": "18",
            "name": "Restaurant Name",
            "phone_number": "28928982",
          "email": "restau2raent@example.comd122",
            "password": "$2y$12$33CEjaOhkmEoF9x407brGeTLo6aiHQA4/jmFlmFW.I38HjRhiu0bu",
            "role_id": 3,
            "working_hours_from": "10:00 AM",
            "working_hours_to": "10:00 PM",
            "address": "123 Restaurant St, City, Country",
            "is_approved": 0,
            "restaurant_info": "This is a description of the restaurant",
            "license": salmon,
            "created_at": "2025-03-29T21:43:22.000000Z",
            "updated_at": "2025-03-29T21:43:22.000000Z"
        },
        {
            "id": 19,
            "name": "Restaurant Name",
            "phone_number": "28928982",
            "email": "restau2raent@e22xample.comd12",
            "password": "$2y$12$Nc3RpIRVTGBXq/42sSXU4ec1j65o8WgyTpRUk0PCT9/WM9YldHYvq",
            "role_id": 3,
            "working_hours_from": "10:00 AM",
            "working_hours_to": "10:00 PM",
            "address": "123 Restaurant St, City, Country",
            "is_approved": 0,
            "restaurant_info": "This is a description of the restaurant",
            "license": salmon,
            "created_at": "2025-03-29T21:44:37.000000Z",
            "updated_at": "2025-03-29T21:44:37.000000Z"
        },
        {
            "id": 20,
            "name": "Restaurant Name",
            "phone_number": "28928982",
            "email": "restau2raent@e22xample.comd124444",
            "password": "$2y$12$39w8VNqEbkE6i.6tsrFMsuby6zfOEssTmUPjfM.gpluk2zlClJKB.",
            "role_id": 3,
            "working_hours_from": "10:00 AM",
            "working_hours_to": "10:00 PM",
            "address": "123 Restaurant St, City, Country",
            "is_approved": 0,
            "restaurant_info": "This is a description of the restaurant",
            "license":salmon,
            "created_at": "2025-03-29T21:46:19.000000Z",
            "updated_at": "2025-03-29T21:46:19.000000Z"
        },
        {
            "id": 21,
            "name": "star",
            "phone_number": "0789365214",
            "email": "star@gmail.com",
            "password": "$2y$12$gdLvpU53WqlTvUvyFhOFlespeaY17xZXp1twAMCyGMixhoqvOqfDa",
            "role_id": 3,
            "working_hours_from": "12",
            "working_hours_to": "3",
            "address": "asf",
            "is_approved": 1,
            "restaurant_info": "as",
            "license": salmon,
            "created_at": "2025-04-04T11:50:17.000000Z",
            "updated_at": "2025-04-04T11:50:17.000000Z"
        }
    ]

  
  return (
    <div>
      <h1>All Restaurants</h1>
  <div id='restaurant-card-container'>
      {dummyRestaurants.map((restaurant) => (
          <RestaurantCard
            key={restaurant.id}
            name={restaurant.name}
            address={restaurant.address}
            image={restaurant.license}
            phone_number={restaurant.phone_number}
            Working_hours_from={restaurant.working_hours_from}
            Working_hours_to={restaurant.working_hours_to}
            restaurant_info={restaurant.restaurant_info}
            
          />
        ))}
    </div>
    </div>
  );
};
  
export default AllRestaurants;