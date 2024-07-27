const request = require('postman-request')

const geocode = (address, callback) => {
    url = 'https://api.mapbox.com/search/geocode/v6/forward?q=' + encodeURIComponent(address) + '&access_token=pk.eyJ1IjoiZGFycmVuZG9uYWxkIiwiYSI6ImNsdzFhMm5xODAzdGgya28wbnR5bGQ2amgifQ.RBMG1WqaKiioIXJnNtdmIA&limit=1'
  
    request({url: url, json:true}, (error, response) => {
      if (error) {
        callback('Unable to connect to service', undefined)
      } else if (response.body.features.length === 0) {
        callback('Unable to find location. Try again ' + error, undefined)
      } else {
        callback (undefined, {
          latitude: response.body.features[0].properties.coordinates.latitude, 
          longitude: response.body.features[0].properties.coordinates.longitude,
          location: response.body.features[0].properties.full_address
        })
      }
    }
  )}


  module.exports = geocode