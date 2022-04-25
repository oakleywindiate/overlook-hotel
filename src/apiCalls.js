
const fetchData = (address) => {
  return fetch(`http://localhost:3001/api/v1/${address}`)
  .then(response => response.json())
  .catch((error) => {
    apiErrorMessage.innerText = 'An error occured while loading data. Please try again later.';
  });
};

const addBooking = (newBooking) => {
  fetch("http://localhost:3001/api/v1/bookings", {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(newBooking)
  })
  .then(response => {
    if (!response.ok) {
      throw Error()
    } else {
      return response.json(response.statusText)
    }
  })
  // .then(response => refreshPantry(newIngredient.userID))
  .catch(error => {
    showError('There was an issue booking this room. Please try again later.')
  });
};
//
// const removeIngredients = (newIngredient) => {
//   fetch("http://localhost:3001/api/v1/users", {
//     method: 'POST',
//     headers: { 'Content-Type': 'application/json' },
//     body: JSON.stringify(newIngredient)
//   })
//   .then(response => {
//     if (!response.ok) {
//       throw Error(response.statusText)
//     } else {
//       return response.json()
//     }
//   })
//   .then(response => refreshPantry(newIngredient.userID))
//   .catch(error => {
//     showError('There was an issue adding this ingredient. Try again!')
//   });
// };
//
// const showError = (message) => {
//   errorMessage.innerText = message;
// };
//
export {fetchData, addBooking}
