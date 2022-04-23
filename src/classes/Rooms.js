class Rooms {
  constructor(roomsData) {
    this.roomsData = roomsData;
  }
  findNumber(id) {
    return this.roomsData.filter(rooms => rooms.number === id)
  }
};

export default Rooms;
