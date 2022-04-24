class Bookings {
  constructor(bookingsData) {
    this.bookingsData = bookingsData;
  }

  findUserId(id) {
  return Number(this.bookingsData.filter(booking => booking.userID === id).map(obj => obj.userID))
  }

  findUserObject(id) {
    return this.bookingsData.filter(booking => booking.userID === id)
  }

  findRoomNumber(id) {
    return Number(this.bookingsData.filter(booking => booking.roomNumber === id).map(obj => obj.roomNumber))
  }
};

export default Bookings;
