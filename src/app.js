const path = require('path');
const express = require('express');
const hbs = require('hbs');
const geocode = require('./utils/geocode');
const forecast = require('./utils/forecast');

const app = express();
const port = process.env.PORT || 3000;

// Define paths for express config
const publicDirectoryPath = path.join(__dirname, '../public');
const viewPath = path.join(__dirname, '../templates/views');
const partialsPath = path.join(__dirname, '../templates/partials');

// Enable handlebars engine and views - hbs templating engine
app.set('view engine', 'hbs');
app.set('views', viewPath);
hbs.registerPartials(partialsPath);

// Setup static directory to serve
app.use(express.static(publicDirectoryPath));

app.get('', (req, res) => {
    res.render('index', {
        title: 'Weather App',
        name: 'David Deal'
    });
});

app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About Me',
        name: 'David Deal'
    });
});

app.get('/help', (req, res) => {
    res.render('help', {
        title: 'Help Page',
        name: 'David Deal',
        message: 'This is a help message'
    });
});

app.get('/weather', (req, res) => {
    if (!req.query.address) {
        return res.send({
            error: 'Missing address term'
        });
    }

    //geocode(address, (error, data) => {
    // With destructuring and setting a default empty structure
    geocode(
        req.query.address,
        (error, { latitude, longitude, location } = {}) => {
            if (error) {
                return res.send({
                    error // shorthand for => error: error
                });
            }

            //forecast(data.latitude, data.longitude, (error, forecastData) => {
            forecast(latitude, longitude, (error, forecastData) => {
                if (error) {
                    return res.send({
                        error // shorthand for => error: error
                    });
                }

                let theForecast =
                    'Forecast for ' +
                    location +
                    ' is ' +
                    forecastData.summary +
                    ' Current temperature is ' +
                    forecastData.current_temp +
                    ' degrees. There is a ' +
                    forecastData.precip_prop +
                    '% chance of rain.';
                res.send({
                    forecast: theForecast,
                    location, // shorthand for location: location
                    address: req.query.address
                });
            });
        }
    );
});

app.get('/products', (req, res) => {
    if (!req.query.search) {
        return res.send({
            error: 'Missing search term'
        });
    }

    console.log(req.query);
    res.send({
        products: []
    });
});

// Matches help page not found
app.get('/help/*', (req, res) => {
    res.render('404', {
        title: 'Help Page Not Found',
        name: 'David Deal',
        errorMessage: 'Help article not found'
    });
});

// Matches everything else
app.get('*', (req, res) => {
    res.render('404', {
        title: 'Page Not Found',
        name: 'David Deal',
        errorMessage: 'The page you were looking for was not found.'
    });
});

app.listen(port, () => {
    console.log('Server is up on port ' + port);
});
