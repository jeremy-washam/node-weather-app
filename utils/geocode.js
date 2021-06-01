const request = require('postman-request');

const geocode = (address, callback) => {
  const url = `https://api.mapbox.com/geocoding/v5/mapbox.places/${encodeURIComponent(address)}.json?access_token=pk.eyJ1IjoiamVyZW15d2FzaGFtIiwiYSI6ImNrcGJkNGNubDBwNjAyeHA5a3hoM3BibHQifQ.OUfPOr2EFr8dpGVFmyb9mw&limit=1`;
  request({ url, json: true }, (error, response) => {
    if (error) {
      callback('Unable to connect to location services!');
    } else if (response.body.features.length === 0) {
      callback('Unable to find location. Try another search.');
    } else {
      callback(undefined, {
        longitude: response.body.features[0].center[0],
        latitude: response.body.features[0].center[1],
        location: response.body.features[0].place_name,
      });
    }
  });
};

module.exports = geocode;
