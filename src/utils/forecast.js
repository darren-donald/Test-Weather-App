const request = require('postman-request')

const forecast = (latitude, longitude, callback) => {

const url = 'http://api.weatherstack.com/current?access_key=e9fb906b7873e585e5d64037315a6a6e&query=' + longitude + ',' + latitude +'&units=m'

 request({url: url, json: true}, (error, response) => {
     if (error) {
       callback('Unable to connect to service', undefined)
     } else if (response.body.error) {
        callback('Unable to find location. Try again ' + error, undefined)
     } else {
       const forecast = response.body.current.weather_descriptions[0] +'. It is currently ' + response.body.current.temperature + ' degrees. It feels like '+response.body.current.feelslike+' degrees.'
       callback(undefined, {
        forecast: response.body.current.weather_descriptions[0],
        temperature: response.body.current.temperature,
        Feels_like: response.body.current.feelslike
       })
       
    }
 })

}

module.exports = forecast