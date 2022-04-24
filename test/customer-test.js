import {expect} from 'chai';
import Customer from '../src/classes/Customer';
import Bookings from '../src/classes/Bookings';
import Rooms from '../src/classes/Rooms';
import {customerData, customer, bookingsData, booking1, booking2} from './mock-data'

describe('Customer', () => {
  let customerData,
  roomsData,
  bookingsData,
  customer1,
  customer2,
  roomData1;

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
        "userID": 1,
        "date": "2022/04/22",
        "roomNumber": 1
      },
      {
        "id": "5fwrgu4i7k55hl6t5",
        "userID": 2,
        "date": "2022/01/24",
        "roomNumber": 2
      },
      {
        "id": "5fwrgu4i7k55hl6t6",
        "userID": 3,
        "date": "2022/01/10",
        "roomNumber": 3
      },
      {
        "id": "5fwrgu4i7k55hl6t7",
        "userID": 4,
        "date": "2022/02/16",
        "roomNumber": 4
      },
      {
        "id": "5fwrgu4i7k55hl6t7",
        "userID": 1,
        "date": "2022/02/16",
        "roomNumber": 4
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

      roomData1 = new Rooms(roomsData)
  });

// ---------------- TESTING ---------------- //

  it('should be a function', () => {
    expect(Customer).to.be.a('function');
  });

  it('should be an instance of a Customer', () => {
    expect(customer1).to.be.an.instanceof(Customer);
  });

  it('should have an id', () => {
    expect(customer1.customerData[0].id).to.equal(1);
    expect(customer2.customerData[1].id).to.equal(2);
  });

  it('should have a name', () => {
    expect(customer1.customerData[0].name).to.equal('Leatha Ullrich');
    expect(customer2.customerData[1].name).to.equal('Rocio Schuster');
  });

  it('should find a customer object based on an id', () => {

    expect(customer1.findCustomerObject(1)).to.deep.equal(
      [ { id: 1, name: 'Leatha Ullrich' } ]
    );
    expect(customer2.findCustomerObject(3)).to.deep.equal(
      [ { id: 3, name: 'Kelvin Schiller' } ]
    );
  });

  it('should find all room bookings for a specific customer', () => {

    customer1.displayAllRoomBookings(1, booking1)

    expect(customer1.rooms).to.deep.equal([[
      {
        "id": "5fwrgu4i7k55hl6sz",
        "userID": 1,
        "date": "2022/04/22",
        "roomNumber": 1
      },
      {
        "id": "5fwrgu4i7k55hl6t7",
        "userID": 1,
        "date": "2022/02/16",
        "roomNumber": 4
      }
    ]]);

    customer2.displayAllRoomBookings(3, booking1)

    expect(customer2.rooms).to.deep.equal([[{
        "id": "5fwrgu4i7k55hl6t6",
        "userID": 3,
        "date": "2022/01/10",
        "roomNumber": 3
      }
    ]]);

    customer1.displayAllRoomBookings(9, booking1)

    expect(customer1.rooms).to.deep.equal([
      [
        {
          "id": "5fwrgu4i7k55hl6sz",
          "userID": 1,
          "date": "2022/04/22",
          "roomNumber": 1
        },
        {
          "id": "5fwrgu4i7k55hl6t7",
          "userID": 1,
          "date": "2022/02/16",
          "roomNumber": 4
        }
      ],
      []
    ]
    );
  });

  it('should know the total cost for all customers', () => {
    expect(customer1.totalAmountSpent(1, roomData1, booking1)).to.equal(787.84);
    expect(customer2.totalAmountSpent(2, roomData1, booking1)).to.equal(477.38);
    });

});
