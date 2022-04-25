// ---------------- IMPORTS ---------------- //
import './css/styles.css';
import Customer from './classes/Customer';
import Bookings from './classes/Bookings';
import Rooms from './classes/Rooms';
import apiCalls from './apiCalls';
import flatpickr from "flatpickr";
import {fetchData} from './apiCalls.js';
import 'flatpickr/dist/flatpickr.css';
require("flatpickr/dist/themes/dark.css");

flatpickr("input[type=date]", {
  altInput: true,
  altFormat: "F j, Y",
  dateFormat: "Y-m-d",
})

// ---------------- QUERY SELECTORS ---------------- //

let injectBookings = document.querySelector('.display-bookings');
let injectTotalSpent = document.querySelector('.display-customer-amount-spent');

// ---------------- GLOBAL VARIABLES ---------------- //

let customerRepo;
let roomsRepo;
let bookingsRepo;
let customer;

// ---------------- FUNCTIONS ---------------- //

const retrieveRandomCustomer = (value) => {
  const customer = value[Math.floor(Math.random() * value.length)];
  return customer;
};

const fetchApiData = () => {
  Promise.all([
    fetchData('customers'),
    fetchData('rooms'),
    fetchData('bookings')
  ]).then(data => {
    createInstances(data)
    displayCustomerInfomation(customer.id, bookingsRepo, roomsRepo)
    displayTotalAmountSpent(customer.id, roomsRepo, bookingsRepo)
  });
};

const createInstances = (data) => {
  customerRepo = new Customer(data[0].customers);
  roomsRepo = new Rooms(data[1].rooms);
  bookingsRepo = new Bookings(data[2].bookings);
  customer = retrieveRandomCustomer(customerRepo.customerData);
  console.log(customer)
};

const displayCustomerInfomation = (id, bookingRepo, roomsRepo) => {
  return bookingRepo.findUserObject(id).forEach(booking => {
    roomsRepo.findRoomObject(booking.roomNumber).map(room => {
      injectBookings.innerHTML +=
      `<li class="bed-size">bed size: ${room.bedSize}</li>
      <li class="bed-size">bidet: ${room.bidet}</li>
      <li class="bed-size">cost per night: $${room.costPerNight}</li>
      <li class="bed-size">number of beds: ${room.numBeds}</li>
      <li class="bed-size">room type: ${room.roomType}</li>
      <li class="bed-size">booking date: ${booking.date}</li>
      <li class="bed-size">room number: ${booking.roomNumber}</li>`
    })
  })
};

const displayTotalAmountSpent = (id, roomsRepo, bookingsRepo) => {
  injectTotalSpent.innerHTML += `<li class="amount-spent">Amount Spent: $${customerRepo.totalAmountSpent(id, roomsRepo, bookingsRepo)}`
};


// ---------------- FUNCTIONS ---------------- //

window.addEventListener('load', fetchApiData);
