import Bookings from './Bookings';
import Rooms from './Rooms';

class Customer {
  constructor(customerData) {
    this.customerData = customerData;
    this.rooms = [];
  }

  findCustomerId(id) {
    return this.customerData.filter(customer => customer.id === id)
  }

  displayAllRoomBookings(id, bookingsData) {
    return (this.findCustomerId(id).id === bookingsData.findUserId(id).userID) ? this.rooms.push(bookingsData.findUserId(id)) : null;
  }

  amountSpent(id, roomsData) {
    // compare room number from bookings with room number from roomData
    // reduce
  }
};

export default Customer;
