const request = require('request');

const forecast = (lat, lon, callback) => {
    // Darksky Access Token and URL
    if (!process.env.DARKSKY_ACCESS_TOKEN) {
        return callback(
            'Unable to connect to the weather service. DARKSKY_ACCESS_TOKEN is not defined.',
            undefined
        );
    }

    const url =
        'https://api.darksky.net/forecast/' +
        process.env.DARKSKY_ACCESS_TOKEN +
        '/' +
        lat +
        ',' +
        lon +
        '?lang=en';

    //request({ url: url, json: true }, (error, response) => {
    // with destructuring
    request({ url, json: true }, (error, { body }) => {
        if (error) {
            callback('Unable to connect to the weather service.', undefined);
        } else if (body.error) {
            callback('Unable to find location.', undefined);
        } else {
            callback(undefined, {
                summary: body.daily.data[0].summary,
                tempHigh: body.daily.data[0].temperatureHigh,
                tempLow: body.daily.data[0].temperatureLow,
                sunriseTime: body.daily.data[0].sunriseTime,
                sunsetTime: body.daily.data[0].sunsetTime,
                current_temp: body.currently.temperature,
                precip_prop: body.currently.precipProbability
            });
        }
    });
};

module.exports = forecast;
