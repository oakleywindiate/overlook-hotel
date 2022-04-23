class Bookings {
  constructor(bookingsData) {
    this.bookingsData = bookingsData;
  }

  findUserId(id) {
    const filterCustomerId = this.bookingsData.filter(booking => booking.userID === id)
    return filterCustomerId
  }
};

export default Bookings;
