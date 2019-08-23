const request = require('request')

const forecast = (lat,long,callback) => {
    const url = 'https://api.darksky.net/forecast/462e748de9f796069d03f283c9e9b5ae/' + lat +',' + long+ '?units=si'

    // request({url:url, json:true},(error,response) => {
    //     if(error){
    //         callback('Unable to connect weather service!', undefined)
    //     }else if(response.body.error){
    //         callback('Unable to find the location',undefined)
    //     }else{
    //         callback(undefined, response.body.daily.data[0].summary + ' It is currently ' + response.body.currently.temperature + ' degrees out. There is a ' + response.body.currently.precipProbability +'% chances of rain.')
    //     }
    // })

    //De-structured function

    request({url, json:true},(error,{ body }) => {
        if(error){
            callback('Unable to connect weather service!', undefined)
        }else if(body.error){
            callback('Unable to find the location',undefined)
        }else{
            callback(undefined, body.daily.data[0].summary + ' It is currently ' + body.currently.temperature + ' degrees out. There is a ' + body.currently.precipProbability +'% chances of rain.')
        }
    })
}

module.exports = forecast