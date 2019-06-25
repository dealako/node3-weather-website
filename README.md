# Weather Nodejs App

This nodejs app is my playground for the Udemy "The Complete Node.js Developer
Course (3rd Edition)" course.

## Running Locally

```bash
# if nodemon installed globally
nodemon src/app.js -e js,hbs

# or simply (defined in `package.json`)
yarn run dev
```

Then navigate to: http://localhost:3000

To specify a different HTTP port, set the `PORT` environment variable.

## Darksky

This service is [Powered by Dark Sky](https://darksky.net/poweredby/) for
weather forecasts.

## Mapbox

This services leverages geocoding by [mapbox](https://www.mapbox.com/).
