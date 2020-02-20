/* --------------------------- Darksky key + call --------------------------- */
//#region 
//1st Sign up to Darksky.net
//Key      fb52b2a9439aa60238ff44478f2f8aef
//call     https://api.darksky.net/forecast/fb52b2a9439aa60238ff44478f2f8aef/37.8267,-122.4233
//change 37.8267,-122.4233 to find other location (latitude, longitude)
//#endregion

/* -------------------------------- Forecast -------------------------------- */
//#region 
const request = require('request')

const forecast = (latitude, longitude, callback) => {

    const url = 'https://api.darksky.net/forecast/fb52b2a9439aa60238ff44478f2f8aef/' + latitude + ',' + longitude + '?units=si'

    //refactor url :url   ---> url      ,since name are identical
    //(error,response)--->(error,{body})  --->with callback send the callback to arguments
    request({ url: url, json: true }, (error, { body }) => {
        if (error) {
            callback('Unable to connect to forecast services!', undefined)
        }
        else if (body.error) {
            callback('Unable to find location , please try again!', undefined)
        }
        else {
            callback(undefined,
                body.daily.data[0].summary +
                ' It is currently ' + body.currently.temperature +
                ' degrees out. And there is a ' + body.currently.precipProbability +
                ' % chance of rain')
        }
    })
}
//#endregion
module.exports = forecast