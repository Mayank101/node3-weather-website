const request = require('request')

const geocode = (address,callback) =>{
    const url = 'https://api.mapbox.com/geocoding/v5/mapbox.places/'+  encodeURIComponent(address) +'.json?access_token=pk.eyJ1IjoibWF5YW5rOTYiLCJhIjoiY2p5djZvbnpwMGV6MDNjbXAxcmpwNWM4MCJ9.BlRF0uV-K63P4zq41-6pCg&limit=1'

    // request({url: url, json:true},(error, response) => {
    //     if(error){
    //         callback('Unable to connect to location services', undefined)
    //     }else if(response.body.features.length === 0){
    //         callback('Unable to find location. Try another search!', undefined)
    //     }else{
    //         callback(undefined,{
    //             location: response.body.features[0].place_name,
    //             longitude : response.body.features[0].center[0],
    //             latitude : response.body.features[0].center[1]
    //         })
    //     }
    // })


    //de-strcutured function

    request({url, json:true},(error, { body }) => {
        if(error){
            callback('Unable to connect to location services', undefined)
        }else if(body.features.length === 0){
            callback('Unable to find location. Try another search!', undefined)
        }else{
            callback(undefined,{
                location: body.features[0].place_name,
                longitude : body.features[0].center[0],
                latitude : body.features[0].center[1]
            })
        }
    })
}


module.exports = geocode