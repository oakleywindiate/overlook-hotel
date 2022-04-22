import {expect} from 'chai';
import Customer from '../src/classes/Customer';
import {customerData, customer, rooms, bookingsData} from './mock-data'

describe('Customer', () => {
  let customerData, rooms, bookingsData, customer1, customer2;

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

// ---------------- VARIABLES ---------------- //

      customer1 = new Customer(customerData);
      customer2 = new Customer(customerData);
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
    expect(customer1.customerData[1].id).to.equal(2);
  });

  it('should have a name', () => {
    expect(customer1.customerData[0].name).to.equal('Leatha Ullrich');
    expect(customer1.customerData[1].name).to.equal('Rocio Schuster');
  });
});
