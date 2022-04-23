import {expect} from 'chai';
import Bookings from '../src/classes/Bookings';
import Customer from '../src/classes/Customer';
import {customerData, customer, roomsData, bookingsData} from './mock-data'

describe('Bookings', () => {
  let customerData, roomsData, bookingsData, customer1, customer2, booking1, booking2;

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
        "roomNumber": 15
      },
      {
        "id": "5fwrgu4i7k55hl6t5",
        "userID": 2,
        "date": "2022/01/24",
        "roomNumber": 24
      },
      {
        "id": "5fwrgu4i7k55hl6t6",
        "userID": 3,
        "date": "2022/01/10",
        "roomNumber": 12
      },
      {
        "id": "5fwrgu4i7k55hl6t7",
        "userID": 4,
        "date": "2022/02/16",
        "roomNumber": 7
      },
    ];

// ---------------- VARIABLES ---------------- //

      customer1 = new Customer(customerData);
      customer2 = new Customer(customerData);

      booking1 = new Bookings(bookingsData);
      booking2 = new Bookings(bookingsData);

  });

// ---------------- TESTING ---------------- //

  it('should be a function', () => {
    expect(Bookings).to.be.a('function');
  });

  it('should be an instance of a Customer', () => {
    expect(booking1).to.be.an.instanceof(Bookings);
  });

  it('should have an id', () => {
    expect(booking1.bookingsData[0].id).to.equal("5fwrgu4i7k55hl6sz");
    expect(booking2.bookingsData[1].id).to.equal("5fwrgu4i7k55hl6t5");
  });

  it('should have a userID', () => {
    expect(booking1.bookingsData[0].userID).to.equal(1);
    expect(booking2.bookingsData[1].userID).to.equal(2);
  });

  it('should have a data', () => {
    expect(booking1.bookingsData[0].date).to.equal("2022/04/22");
    expect(booking2.bookingsData[1].date).to.equal("2022/01/24");
  });

  it('should have a room number', () => {
    expect(booking1.bookingsData[0].roomNumber).to.equal(15);
    expect(booking2.bookingsData[1].roomNumber).to.equal(24);
  });

  it('should be able to find a userID', () => {
    expect(booking1.findUserId(1)).to.deep.equal([
      {
        "id": '5fwrgu4i7k55hl6sz',
        "userID": 1,
        "date": '2022/04/22',
        "roomNumber": 15
      }
    ]);
    expect(booking2.findUserId(2)).to.deep.equal([
      {
        "id": '5fwrgu4i7k55hl6t5',
        "userID": 2,
        "date": '2022/01/24',
        "roomNumber": 24
      }
    ]);
  });
});
