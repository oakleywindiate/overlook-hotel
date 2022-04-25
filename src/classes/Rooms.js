class Rooms {
  constructor(roomsData) {
    this.roomsData = roomsData;
  }

  findRoomObject(id) {
    return (Object.values(this.roomsData).filter(rooms => rooms.number === id))
  }

  findNumber(id) {
    return Number(Object.values(this.roomsData).filter(rooms => rooms.number === id).map(obj => obj.number))
  }

  findRoomCostPerNight(id) {
    return Number(Object.values(this.roomsData).filter(rooms => rooms.number === id).map(obj => obj.costPerNight))
  }
};

export default Rooms;
