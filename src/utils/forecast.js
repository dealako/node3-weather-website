const request = require('request');

const forecast = (lat, lon, callback) => {
    // Darksky Access Token and URL
    const DARKSKY_ACCESS_TOKEN = '0dd3d6c3884cd3632a97d2e2224a0754';
    const url =
        'https://api.darksky.net/forecast/' +
        DARKSKY_ACCESS_TOKEN +
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
                current_temp: body.currently.temperature,
                precip_prop: body.currently.precipProbability
            });
        }
    });
};

module.exports = forecast;
