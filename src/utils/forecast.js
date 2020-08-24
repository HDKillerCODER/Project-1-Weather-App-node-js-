const request = require('request')

const forecast = (latitude, longitude, callback) => {
    const url = 'http://api.weatherstack.com/current?access_key=1254e8adcadaa34fb5218bd053f0c97f&query=' + latitude + ',' + longitude;

    request({ url, json: true }, (error, {body}) => {
        if (error) {
            callback('Unable to connect to weather service!', undefined)
        } else if (body.error == 0) {
            callback('Unable to find location', undefined)
        
        } else {
            callback(undefined, "It is currently " + body.current.temperature + " degrees out. " + body.current.weather_descriptions);
        }
    })
}

module.exports = forecast