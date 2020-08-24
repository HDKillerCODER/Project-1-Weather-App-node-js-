const request = require('request')


const geocode = (address, callback)=>{
    const geocodeurl = "https://api.mapbox.com/geocoding/v5/mapbox.places/"+ address + ".json?access_token=pk.eyJ1IjoiaGFyc2gtMWRoaW1hbiIsImEiOiJja2M2OTVqM3owOTZ2MzJueDhqNm1hOG9lIn0.5ta_ZfkaGVtALUtO46VBtw&limit=1";
    request({url: geocodeurl, json: true}, (error, {body})=>{
        if(error)
        {
            callback('Unable to connect to the server ');
        }
        
        else
        if(body.features.length == 0)
        callback('Unable to find location. Try another search', undefined);
        else
        callback(undefined, {
            latitude: body.features[0].center[1],
            longitude: body.features[0].center[0],
            location: body.features[0].place_name
        })
    })
}

//geocode('Agra', (e))

module.exports = geocode