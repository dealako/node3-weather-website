const request = require('request');

const geocode = (address, callback) => {
    // Geocoding Access Token and URL
    if (!process.env.GEOCODING_ACCESS_TOKEN) {
        return callback(
            'Unable to connect to the location service. GEOCODING_ACCESS_TOKEN is not defined.',
            undefined
        );
    }
    const url =
        'https://api.mapbox.com/geocoding/v5/mapbox.places/' +
        encodeURIComponent(address) +
        '.json?access_token=' +
        process.env.GEOCODING_ACCESS_TOKEN +
        '&limit';

    request({ url, json: true }, (error, { body }) => {
        if (error) {
            callback('Unable to connect to the location service.', undefined);
        } else if (body.features.length === 0) {
            callback('Unable to find location: ' + address, undefined);
        } else {
            callback(undefined, {
                latitude: body.features[0].center[1],
                longitude: body.features[0].center[0],
                location: body.features[0].place_name
            });
        }
    });
};

module.exports = geocode;
