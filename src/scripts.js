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
  dateFormat: "Y/m/d",
})

// ---------------- QUERY SELECTORS ---------------- //

let injectBookings = document.querySelector('.display-bookings');
let injectTotalSpent = document.querySelector('.display-customer-amount-spent');
let calendarForm = document.querySelector('#calendarForm');
let injectDateSearch = document.querySelector('.display-date-search')

// ---------------- GLOBAL VARIABLES ---------------- //

let customerRepo;
let roomsRepo;
let bookingsRepo;
let customer;
let returnDate;
let availableRooms = [];

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
      <li class="bidet">bidet: ${room.bidet}</li>
      <li class="cost-per-night">cost per night: $${room.costPerNight}</li>
      <li class="num-beds">number of beds: ${room.numBeds}</li>
      <li class="room-type">room type: ${room.roomType}</li>
      <li class="booking-date">booking date: ${booking.date}</li>
      <li class="room-number">room number: ${booking.roomNumber}</li>`
    })
  })
};

const displayTotalAmountSpent = (id, roomsRepo, bookingsRepo) => {
  injectTotalSpent.innerHTML += `<li class="amount-spent">Amount Spent: $${customerRepo.totalAmountSpent(id, roomsRepo, bookingsRepo)}`
};


const findAvailableRooms = (date) => {
  return roomsRepo.roomsData.forEach(room => {
    if (!bookingsRepo.findDate(date).includes(room.number)) {
      roomsRepo.findRoomObject(room.number).forEach(obj => {
        availableRooms.push(obj)
        searchRoomTypes()
        injectDateSearch.innerHTML += `
        <li class="bed-size">bed size: ${obj.bedSize}</li>
        <li class="bidet">bidet: ${obj.bidet}</li>
        <li class="cost-per-night">cost per night: $${obj.costPerNight}</li>
        <li class="num-beds">number of beds: ${obj.numBeds}</li>
        <li class="room-type">room type: ${obj.roomType}</li>`
      })
    }
  })
};

const searchRoomTypes = () => {
  availableRooms.forEach(room => {
    console.log("room", room.roomType)
  })
};

// ---------------- DYNAMIC FUNCTIONS ---------------- //

const clearHtml = (value) => {
  value.innerHTML = '';
}

const showElement = (element) => {
  element.classList.remove('hidden');
};

const hideElement = (element) => {
  element.classList.add('hidden');
};

//push rooms into a new array
//make global variable

// ---------------- FORMS ---------------- //

calendarForm.addEventListener('submit', (e) => {
  e.preventDefault();
  const formData = new FormData(e.target);
  returnDate = formData.get('checkInCalendar')
  clearHtml(injectBookings)
  clearHtml(injectTotalSpent)
  clearHtml(injectDateSearch)
  findAvailableRooms(returnDate)
})

// input.addEventListener('change', updateValue);

// const formData = new FormData(e.target);
//   searchDate = formData.get('dateToBook').split("-").join("/")
// data comes back with 0


// ---------------- FUNCTIONS ---------------- //

window.addEventListener('load', fetchApiData);
