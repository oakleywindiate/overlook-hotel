// ---------------- IMPORTS ---------------- //
import './css/styles.css';
import Customer from './classes/Customer';
import Bookings from './classes/Bookings';
import Rooms from './classes/Rooms';
import apiCalls from './apiCalls';
import flatpickr from "flatpickr";
import {fetchData, addBooking} from './apiCalls.js';
import 'flatpickr/dist/flatpickr.css';
require("flatpickr/dist/themes/dark.css");

import { Chart, registerables } from 'chart.js';
Chart.register(...registerables);

var ctx = document.getElementById('myChart');
var ctx = document.getElementById('myChart').getContext('2d');

import {amountSpent} from './charts.js';

flatpickr("input[type=date]", {
  altInput: true,
  altFormat: "F j, Y",
  dateFormat: "Y/m/d",
})

// ---------------- QUERY SELECTORS ---------------- //

let injectBookings = document.querySelector('.display-bookings');
let injectTotalSpent = document.querySelector('.display-customer-amount-spent');
let calendarForm = document.querySelector('#calendarForm');
let injectDateSearch = document.querySelector('.display-date-search');
let searchRooms = document.querySelector('.room-type-selector');
let searchRoomValue = document.querySelector('#roomType');
let searchRoomType = document.querySelector('.display-room-type-search');
let modal = document.querySelector('.modal');
let close = document.querySelector('.close');
let modalContent = document.querySelector('.modal-content');
let bookRoom = document.querySelector('.book-room');
let successModal = document.querySelector('.success-modal');
let successClose = document.querySelector('.success-close');
let successModalContent = document.querySelector('.success-modal-content');
let loginForm = document.querySelector('.login-form');
let customerUsername = document.getElementById('username');
let customerPassword = document.getElementById('password');
let submitLogin = document.getElementById('login-form-submit');
let loginError = document.getElementById('login-error-tag');
let apiError = document.getElementById('api-error');
let loginWrapper = document.querySelector('.login-wrapper');
let mainPageWrapper = document.querySelector('.main-page-wrapper');

// ---------------- GLOBAL VARIABLES ---------------- //

let customerRepo;
let roomsRepo;
let bookingsRepo;
let customer;
let returnDate;
let availableRooms = [];
let date;
let data;

// ---------------- FUNCTIONS ---------------- //

const fetchApiData = () => {
  Promise.all([
    fetchData('customers'),
    fetchData('rooms'),
    fetchData('bookings'),
  ]).then(data => {
    createInstances(data)
  });
};

const updateCustomerApi = () => {
  Promise.all([
    fetchData('customers'),
    fetchData('rooms'),
    fetchData('bookings'),
    fetchData(`customers/${customer.id}`),
  ]).then(data => {
    updateDataInstances(data)
    clearHtml(injectBookings)
    displayCustomerInfomation(customer.id, bookingsRepo, roomsRepo)
    displayTotalAmountSpent(customer.id, roomsRepo, bookingsRepo)
  });
};

const createInstances = (data) => {
  customerRepo = new Customer(data[0].customers);
  roomsRepo = new Rooms(data[1].rooms);
  bookingsRepo = new Bookings(data[2].bookings);
};

const updateDataInstances = (data) => {
  customerRepo = new Customer(data[0].customers);
  roomsRepo = new Rooms(data[1].rooms);
  bookingsRepo = new Bookings(data[2].bookings);
}

const displayCustomerInfomation = (id, bookingRepo, roomsRepo) => {
  return bookingRepo.findBookingObject(id).forEach(booking => {
    roomsRepo.findRoomObject(booking.roomNumber).map(room => {
      injectBookings.innerHTML += `
      <section class="injected-customer-info">
        <li class="bed-size">bed size: ${room.bedSize}</li>
        <li class="bidet">bidet: ${room.bidet}</li>
        <li class="cost-per-night">cost per night: $${room.costPerNight}</li>
        <li class="num-beds">number of beds: ${room.numBeds}</li>
        <li class="room-type">room type: ${room.roomType}</li>
        <li class="booking-date">booking date: ${booking.date}</li>
        <li class="room-number">room number: ${booking.roomNumber}</li>
      </section>`
    })
  })
};

const displayTotalAmountSpent = (id, roomsRepo, bookingsRepo) => {
  const amount = injectTotalSpent.innerHTML += `
  <p class="amount-spent">Amount Spent: $${customerRepo.totalAmountSpent(id, roomsRepo, bookingsRepo)}</p>`
  amountSpent(ctx, customerRepo.totalAmountSpent(id, roomsRepo, bookingsRepo), 3000)
};

const displaySelectedRoom = (id) => {
  injectNoEvents(modalContent, (roomsRepo.findRoomObject(id)[0]))
};

const findAvailableRooms = (date) => {
  availableRooms = [];
  return roomsRepo.roomsData.forEach(room => {
    if (bookingsRepo.findDate(date).length === 0) {
        roomsRepo.findRoomObject(room.number).forEach(obj => {
          availableRooms.push(obj)
          injectSearch(injectDateSearch, obj)
        })
    } else if (!bookingsRepo.findDate(date).includes(room.number)) {
      roomsRepo.findRoomObject(room.number).forEach(obj => {
        availableRooms.push(obj)
        injectSearch(injectDateSearch, obj)
      })
    } else if (bookingsRepo.findDate(date).length > 0 && (!bookingsRepo.findDate(date).includes(room.number))) {
        runNoResultsModal()
    }
  })
};


const searchRoomTypes = () => {
  return availableRooms.filter(room => {
    if (searchRoomValue.value === room.roomType) {
        injectSearch(searchRoomType, room)
    } else if (searchRoomValue.value === 'all rooms') {
        injectSearch(injectDateSearch, room)
      // } else if
      //   runNoResultsModal()
      }
    })
  };

const injectSearch = (element, obj) => {
  element.innerHTML += `
  <section class="injected-room-date" id="${obj.number}">
    <li class="bed-size">bed size: ${obj.bedSize}</li>
    <li class="bidet">bidet: ${obj.bidet}</li>
    <li class="cost-per-night">cost per night: $${obj.costPerNight}</li>
    <li class="num-beds">number of beds: ${obj.numBeds}</li>
    <li class="room-type">room type: ${obj.roomType}</li>
  </section>`
}

const injectNoEvents = (element, obj) => {
  element.innerHTML += `
  <section class="injected-room-date" id="${obj.number}">
    <p class="bed-size">bed size: ${obj.bedSize}</p>
    <p class="bidet">bidet: ${obj.bidet}</p>
    <p class="cost-per-night">cost per night: $${obj.costPerNight}</p>
    <p class="num-beds">number of beds: ${obj.numBeds}</p>
    <p class="room-type">room type: ${obj.roomType}</p>
    <button aria-label="Book your selected room" class="book-room" id="${obj.number}">BOOK ROOM</button>
  </section>`
}

const displaySuccessfulBooking = () => {
  modal.style.display = 'none';
  clearHtml(modalContent)
  clearHtml(successModalContent)
  successModal.style.display = 'block';
  successModalContent.innerHTML += `
  <h2 class="success-message">Congratulations, ${customerRepo.findCustomerName(customer.id)[0]}!
  <p>You have successfully booked this room.`
};

const runNoResultsModal = () => {
  modal.style.display = 'block';
  modalContent.innerHTML += `
  <p>Oh no! Looks like there are no available rooms for this date. Please try again!</p>`
};

const checkLogin = (username, password) => {
  // if (password === 'overlook2021') {
    customer = customerRepo.findCustomerObject(Number(username.replace(/\D/g, "")))[0]
    runDisplay(customer)
    hideElement(loginWrapper)
    showElement(mainPageWrapper)
  // }
};

const runDisplay = (customer) => {
  console.log(customer)
  displayCustomerInfomation(customer.id, bookingsRepo, roomsRepo)
  displayTotalAmountSpent(customer.id, roomsRepo, bookingsRepo)
};


// ---------------- DYNAMIC FUNCTIONS ---------------- //

const clearPage = () => {
  clearHtml(injectBookings)
  clearHtml(injectTotalSpent)
  clearHtml(injectDateSearch)
  clearHtml(searchRoomType)
}

const clearHtml = (value) => {
  value.innerHTML = '';
}

const showElement = (element) => {
  element.classList.remove('hidden');
};

const hideElement = (element) => {
  element.classList.add('hidden');
};


// ---------------- FORMS ---------------- //

const findPostInformaton = (targetId) => {
  const findInfo = bookingsRepo.findBookingObject(customer.id).map(obj => {
    if (obj.roomNumber === targetId) {
      sendApiData(obj.date, obj.roomNumber)
    }
  })
};

const sendApiData = (date, roomNumber) => {
    const newBooking = {
      userID: parseInt(customer.id),
      date: (date),
      roomNumber: parseInt(roomNumber)
    };
  addBooking(newBooking)
  displaySuccessfulBooking()
};

calendarForm.addEventListener('submit', (e) => {
  e.preventDefault();
  clearPage()
  findAvailableRooms(new FormData(e.target).get('checkInCalendar'))
})

searchRooms.addEventListener('change', (e) => {
  clearPage()
  searchRoomTypes()
});



// ---------------- EVENT LISTENERS ---------------- //

window.addEventListener('load', fetchApiData);

// window.addEventListener('click', fetchApiData);

injectDateSearch.addEventListener('click', (e) => {
  displaySelectedRoom(Number(e.target.parentElement.getAttribute('id')))
  modal.style.display = 'block';
});

searchRoomType.addEventListener('click', (e) => {
  displaySelectedRoom(Number(e.target.parentElement.getAttribute('id')))
  modal.style.display = 'block';
});

close.addEventListener('click', (e) => {
  modal.style.display = 'none';
  clearHtml(modalContent)
});

modalContent.addEventListener('click', (e) => {
  e.preventDefault();
  findPostInformaton(Number(e.target.getAttribute('id')))
  displaySuccessfulBooking()
});

successClose.addEventListener('click', (e) => {
  successModal.style.display = 'none';
  clearPage()
  updateCustomerApi()
});

submitLogin.addEventListener('click', (e) => {
  e.preventDefault();
  checkLogin(customerUsername.value, customerPassword.value)
});
