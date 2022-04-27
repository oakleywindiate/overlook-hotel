
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
  .catch(error => {
    showError('There was an issue booking this room. Please try again later.')
  });
};

export {fetchData, addBooking}
