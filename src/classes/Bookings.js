class Bookings {
  constructor(bookingsData) {
    this.bookingsData = bookingsData;
  }

  findUserId(id) {
  return Number(this.bookingsData.filter(booking => booking.userID === id).map(obj => obj.userID))
  }

  findBookingObject(id) {
    return this.bookingsData.filter(booking => booking.userID === id)
  }

  findRoomNumber(id) {
    return this.bookingsData.filter(booking => booking.userID === id).map(obj => obj.roomNumber)
  }

  findDate(date) {
    return this.bookingsData.filter(booking => booking.date === date).map(obj => obj.roomNumber)
  }

  findDateById(id) {
    return this.bookingsData.filter(booking => booking.userID === id).map(obj => obj.date)
  }
};

export default Bookings;
