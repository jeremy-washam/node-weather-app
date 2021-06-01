// Core node imports
const path = require('path');

// Npm imports
const express = require('express');
const chalk = require('chalk');
const hbs = require('hbs');

// Util imports
const forecast = require('../utils/forecast');
const geocode = require('../utils/geocode');

// Fuck console.log
const print = console.log;

// Set up app
const app = express();

// Set up handlebars views engine
const viewsPath = path.join(__dirname, '../templates/views');
const partialsPath = path.join(__dirname, '../templates/partials');
app.set('view engine', 'hbs');
app.set('views', viewsPath);
hbs.registerPartials(partialsPath);

// Set up static directory
app.use(express.static(path.join(__dirname, '../public')));

// Me!
const author = 'Jeremy Washam';

app.get('', (req, res) => {
  res.render('index', {
    title: 'Weather app',
    name: author,
  });
});

app.get('/about', (req, res) => {
  res.render('about', {
    title: 'About',
    text: 'Simple weather app built using Node.js',
    name: author,
  });
});

app.get('/help', (req, res) => {
  res.render('help', {
    title: 'Help',
    text: 'Enter a location in the search bar to get the forecast for that area.',
    name: author,
  });
});

app.get('/weather', (req, res) => {
  if (!req.query.address) {
    return res.send({
      error: 'You must provide an address.',
    });
  }

  return geocode(req.query.address, (error, { latitude, longitude, location } = {}) => {
    if (error) {
      return res.send({
        error,
      });
    }

    return forecast(latitude, longitude, (e, d) => {
      if (e) {
        return res.send({
          error: e,
        });
      }
      return res.send({
        data: d,
        location,
        address: req.query.address,
      });
    });
  });
});

app.get('/help/*', (req, res) => {
  res.render('404', {
    title: 'Error!',
    message: 'Help page not found',
    name: author,
  });
});

app.get('*', (req, res) => {
  res.render('404', {
    title: 'Error!',
    message: '404 not found',
    name: author,
  });
});

app.listen(3000, () => {
  print(chalk.green('Server is up and running on port 3000.'));
});
