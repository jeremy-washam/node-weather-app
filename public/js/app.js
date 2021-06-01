/* eslint-disable */

const weatherForm = document.querySelector('form');
const search = document.querySelector('input');
const messageOne = document.querySelector('#message1');
const messageTwo = document.querySelector('#message2');

weatherForm.addEventListener('submit', (e) => {
  e.preventDefault();

  const location = search.value;

  const url = `http://localhost:3000/weather?address=${location}`;

  messageOne.textContent = 'Loading';
  messageTwo.textContent = '';


  fetch(url).then((response) => {
  response.json().then((data) => {
    if(data.error) {
      messageOne.textContent = data.error;
      messageTwo.textContent = '';
    } else {
      messageOne.textContent = data.location;
      messageTwo.textContent = `It is currently ${data.data.weather_descriptions[0]} with a temperature of ${data.data.temperature} degrees Fahrenheit.`;
      console.log(data.data);
    }
  });
});
})
