const request = require('postman-request');

const forecast = (lat, long, callback) => {
  const url = `http://api.weatherstack.com/current?access_key=1044df570f3db7fd48104623431a2a6e&query=${lat},${long}&units=f`;
  request({ url, json: true }, (error, response) => {
    if (error) {
      callback('Unable to connect to weather services!');
    } else if (response.body.error) {
      callback('Unable to find location. Try another search.');
    } else {
      callback(undefined, {
        weather_descriptions: response.body.current.weather_descriptions,
        temperature: response.body.current.temperature,
        location: response.body.location.name,
      });
    }
  });
};

module.exports = forecast;
