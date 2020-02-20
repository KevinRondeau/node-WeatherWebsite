/* ----------------------------- Mapbox Key+call ---------------------------- */
//#region 
//geocoding change a location to long,lat (adress->lat/long)
///geocoding/v5/{endpoint}/{search_text}.json
//search_text->location
//exemple of a url for the location response
//'https://api.mapbox.com/geocoding/v5/mapbox.places/Los%20Angeles.json?access_token=pk.eyJ1Ijoia3JvbmRlYXUiLCJhIjoiY2s2bnoxaWliMTYwczNkcHVqamc2c3BycSJ9.QsR3M5rMbOSiEEYbWK6SIg'
//change Los%20Angeles to find other location
//#endregion

/* --------------------------------- Geocode -------------------------------- */
//#region 
const request = require('request')

const geocode = (adress, callback) => {
    const url = 'https://api.mapbox.com/geocoding/v5/mapbox.places/' + encodeURIComponent(adress) + '.json?access_token=pk.eyJ1Ijoia3JvbmRlYXUiLCJhIjoiY2s2bnoxaWliMTYwczNkcHVqamc2c3BycSJ9.QsR3M5rMbOSiEEYbWK6SIg&limit=1'
    request({ url, json: true }, (error, { body }) => {
        if (error) {
            callback('Unable to connect to location services', undefined)
        }
        else if (body.features.length === 0) {
            callback('Unable to find location, try again with a new location!', undefined)
        }
        else {
            callback(undefined, {
                location: body.features[0].place_name,
                latitude: body.features[0].center[1],
                longitude: body.features[0].center[0]

            })
        }

    })
}
//#endregion
module.exports = geocode