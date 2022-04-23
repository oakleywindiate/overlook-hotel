class Rooms {
  constructor(roomsData) {
    this.roomsData = roomsData;
  }
  findRoomNumber(id) {
    return this.roomsData.filter(rooms => rooms.number === id)
  }
};

export default Rooms;
