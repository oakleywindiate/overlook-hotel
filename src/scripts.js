// This is the JavaScript entry file - your code begins here
// Do not delete or rename this file ********

// An example of how you tell webpack to use a CSS (SCSS) file
import './css/styles.css';

// An example of how you tell webpack to use an image (also need to link to it in the index.html)
// import './images/turing-logo.png'

import Customer from './classes/Customer';
// import Bookings from '.classes/Bookings';
// import Rooms from '.classes/Rooms';
import apiCalls from './apiCalls';
import flatpickr from "flatpickr";
// import {fetchData}
import 'flatpickr/dist/flatpickr.css';
require("flatpickr/dist/themes/dark.css");

flatpickr("input[type=date]", {
  altInput: true,
  altFormat: "F j, Y",
  dateFormat: "Y-m-d",
})
