import Bookings from './Bookings';
import Rooms from './Rooms';

class Customer {
  constructor(customerData) {
    this.customerData = customerData;
    this.rooms = [];
  }

  findCustomerId(id) {
    return Number(this.customerData.filter(customer => customer.id === id).map(obj => obj.id))
  }

  findCustomerObject(id) {
    return this.customerData.filter(customer => customer.id === id)
  }

  displayAllRoomBookings(id, bookingData) {
    this.rooms.push(bookingData.findUserObject(id))
  }

  totalAmountSpent(id, roomData, bookingData) {
    const findNumber = bookingData.findUserObject(id).map(obj => obj.roomNumber).reduce((acc, number) => {
      if (number === roomData.findNumber(number)) {
        acc += (roomData.findRoomCostPerNight(number))
      }
      return acc
    }, 0)
    return +findNumber.toFixed(2)
  }
};

export default Customer;
