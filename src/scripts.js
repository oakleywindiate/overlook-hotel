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

// ---------------- GLOBAL VARIABLES ---------------- //

let customerRepo;
let roomsRepo;
let bookingsRepo;
let customer;
let returnDate;
let availableRooms = [];
let date;

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
  injectTotalSpent.innerHTML += `
  <li class="amount-spent">Amount Spent: $${customerRepo.totalAmountSpent(id, roomsRepo, bookingsRepo)}</li>`
};

const displaySelectedRoom = (id) => {
  injectNoEvents(modalContent, (roomsRepo.findRoomObject(id)[0]))
}


const findAvailableRooms = (date) => {
  return roomsRepo.roomsData.forEach(room => {
    if (!bookingsRepo.findDate(date).includes(room.number)) {
      roomsRepo.findRoomObject(room.number).forEach(obj => {
        availableRooms.push(obj)
        injectSearch(injectDateSearch, obj)
      })
    }
  })
};

const searchRoomTypes = () => {
  return availableRooms.filter(room => {
    if (searchRoomValue.value === room.roomType) {
        injectSearch(searchRoomType, room)
    } else if (searchRoomValue.value === 'all rooms') {
        injectSearch(injectDateSearch, room)
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
    <button class="book-room" id="${obj.number}">BOOK ROOM</button>
  </section>`
}



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
  // let targetId = Number(e.target.parentElement.getAttribute('id'))
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
});
