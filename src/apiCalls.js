
const fetchData = (address) => {
  return fetch(`http://localhost:3001/api/v1/${address}`)
  .then(response => response.json())
  .catch((error) => {
    apiErrorMessage.innerText = 'An error occured while loading data. Please try again later.';
  });
};

export {fetchData}
