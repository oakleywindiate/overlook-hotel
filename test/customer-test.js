import {expect} from 'chai';
import Customer from '../src/classes/Customer';
import Bookings from '../src/classes/Bookings';
import {customerData, customer, roomsData, bookingsData, booking1, booking2} from './mock-data'

describe('Customer', () => {
  let customerData, roomsData, bookingsData, customer1, customer2;

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

  it('should find the id for a specific customer', () => {

    expect(customer1.findCustomerId(1)).to.deep.equal([
      { id: 1, name: 'Leatha Ullrich' }
    ]);
    expect(customer2.findCustomerId(3)).to.deep.equal([
      { id: 3, name: 'Kelvin Schiller' }
    ]);
  });

  it('should find all room bookings for a specific customer', () => {

    expect(customer1.displayAllRoomBookings(1, booking1)).to.deep.equal([{
        "id": "5fwrgu4i7k55hl6sz",
        "userID": 1,
        "date": "2022/04/22",
        "roomNumber": 15
      }
    ]);
    expect(customer2.displayAllRoomBookings(3, booking2)).to.deep.equal([{
        "id": "5fwrgu4i7k55hl6t6",
        "userID": 3,
        "date": "2022/01/10",
        "roomNumber": 12
      }
    ]);
    expect(customer1.displayAllRoomBookings(9, booking1)).to.deep.equal([]);
  });
});
