# The Overlook Hotel & Spa

## Overview

Are you in need of a vacation? Well, look no further than The Overlook Hotel & Spa. Easily pick a date and select a room type to get started. When you find the room you're looking for, just booking it! It's that easy! You can also manage your room history and check your total spent so far. So, what's holding you back from booking the room of your dreams? Check out The Overlook hotel today!

## Project Motivation

The Overlook project teaches developers how to create interactive and functional web pages using JavaScript, CSS, and HTML.

***
## Project Information

#### Technologies Used
* JavaScript
* Mocha
* Chai
* HTML
* CSS
* Chart.js
* flatpickr

### Installation
1. To run this project, use the Webpack Starter Kit repo found [here](https://github.com/turingschool-examples/webpack-starter-kit)
2. Install the appropriate technologies (Mocha/Chai)
3. `cd` into project
4. Run `npm install` to install project dependencies
5. Run `npm start` in the terminal and on your local server
6. To view your webpage, use the local host address provided
7. Next, clone the API's [here](https://github.com/turingschool-examples/overlook-api)
8. `cd` into API
9. Run `npm install` to install API dependencies
10. Run `npm start` in the terminal
11. To stop the local server from running in your terminal use `command` + `c`

### Features

* Display customer profile
* Display total amount spent
* Display rooms available for specified dates
* Display rooms by type


### Code Sample
The following is one example of code in this project:
```javascript

const sendApiData = (date, roomNumber) => {
    const newBooking = {
      userID: parseInt(customer.id),
      date: (date),
      roomNumber: parseInt(roomNumber)
    };
  addBooking(newBooking)
  displaySuccessfulBooking()
};
```
***

### Development Team

* [Oakley Windiate](https://github.com/oakleywindiate)

### Credits

This project was created by Turing School of Software and Design, a Colorado Non-Profit Organization.

Interested in learning more about Turing? [click here](https://turing.edu/)
