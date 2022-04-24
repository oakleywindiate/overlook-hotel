import {expect} from 'chai';
import Bookings from '../src/classes/Bookings';
import Customer from '../src/classes/Customer';
import Rooms from '../src/classes/Rooms';
import {customerData, customer, roomsData, bookingsData} from './mock-data'

describe('Rooms', () => {
  let customerData,
  roomsData,
  bookingsData,
  customer1,
  customer2,
  booking1,
  booking2,
  roomsData1,
  roomsData2;

  beforeEach(() => {

    customerData = [
      {
        "id": 1,
        "name": "Leatha Ullrich"
      },
      {
        "id": 2,
        "name": "Rocio Schuster"
      },
      {
        "id": 3,
        "name": "Kelvin Schiller"
      },
      {
        "id": 4,
        "name": "Kennedi Emard"
      },
    ];

    bookingsData = [
      {
        "id": "5fwrgu4i7k55hl6sz",
        "userID": 9,
        "date": "2022/04/22",
        "roomNumber": 1
      },
      {
        "id": "5fwrgu4i7k55hl6t5",
        "userID": 43,
        "date": "2022/01/24",
        "roomNumber": 2
      },
      {
        "id": "5fwrgu4i7k55hl6t6",
        "userID": 13,
        "date": "2022/01/10",
        "roomNumber": 3
      },
      {
        "id": "5fwrgu4i7k55hl6t7",
        "userID": 20,
        "date": "2022/02/16",
        "roomNumber": 1
      },
    ];

    roomsData = [
      {
        "number": 1,
        "roomType": "residential suite",
        "bidet": true,
        "bedSize": "queen",
        "numBeds": 1,
        "costPerNight": 358.4
      },
      {
        "number": 2,
        "roomType": "suite",
        "bidet": false,
        "bedSize": "full",
        "numBeds": 2,
        "costPerNight": 477.38
      },
      {
        "number": 3,
        "roomType": "single room",
        "bidet": false,
        "bedSize": "king",
        "numBeds": 1,
        "costPerNight": 491.14
      },
      {
        "number": 4,
        "roomType": "single room",
        "bidet": false,
        "bedSize": "queen",
        "numBeds": 1,
        "costPerNight": 429.44
      },
    ];


// ---------------- VARIABLES ---------------- //

      customer1 = new Customer(customerData);
      customer2 = new Customer(customerData);

      booking1 = new Bookings(bookingsData);

      roomsData1 = new Rooms(roomsData);
      roomsData2 = new Rooms(roomsData);

  });

// ---------------- TESTING ---------------- //

  it('should be a function', () => {
    expect(Rooms).to.be.a('function');
  });

  it('should be an instance of a Customer', () => {
    expect(roomsData1).to.be.an.instanceof(Rooms);
  });

  it('should have a number', () => {
    expect(roomsData1.roomsData[0].number).to.equal(1);
    expect(roomsData2.roomsData[1].number).to.equal(2);
  });

  it('should have a room type', () => {
    expect(roomsData1.roomsData[0].roomType).to.equal("residential suite");
    expect(roomsData2.roomsData[1].roomType).to.equal("suite");
  });

  it('should know if it has a bidet or not', () => {
    expect(roomsData1.roomsData[0].bidet).to.equal(true);
    expect(roomsData2.roomsData[1].bidet).to.equal(false);
  });

  it('should have a bed size', () => {
    expect(roomsData1.roomsData[0].bedSize).to.equal("queen");
    expect(roomsData2.roomsData[1].bedSize).to.equal("full");
  });

  it('should know the number of beds', () => {
    expect(roomsData1.roomsData[0].numBeds).to.equal(1);
    expect(roomsData2.roomsData[1].numBeds).to.equal(2);
  });

  it('should know the cost per night', () => {
    expect(roomsData1.roomsData[0].costPerNight).to.equal(358.4);
    expect(roomsData2.roomsData[1].costPerNight).to.equal(477.38);
  });

  it('should know the cost per night', () => {
    expect(roomsData1.roomsData[0].costPerNight).to.equal(358.4);
    expect(roomsData2.roomsData[1].costPerNight).to.equal(477.38);
  });

  it('should find a specific room number', () => {
    expect(roomsData1.findNumber(1)).to.deep.equal([
        {
          "number": 1,
          "roomType": "residential suite",
          "bidet": true,
          "bedSize": "queen",
          "numBeds": 1,
          "costPerNight": 358.4
        }
    ]);
    expect(roomsData2.findNumber(3)).to.deep.equal([
        {
          "number": 3,
          "roomType": "single room",
          "bidet": false,
          "bedSize": "king",
          "numBeds": 1,
          "costPerNight": 491.14
        }
      ]);
    });

  it('should know the total cost for all customers', () => {
    expect(roomsData1.amountSpent(1, booking1)).to.equal(358.4);
    expect(roomsData2.amountSpent(8, booking1)).to.equal(477.38);
    });

  it('should return the room number', () => {
    expect(roomsData1.findNumber(1)).to.equal(1);
    expect(roomsData2.findNumber(2)).to.equal(2);
    });

});
