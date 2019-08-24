const path = require('path')
const express = require('express')
const hbs = require('hbs')
const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')


const app = express()

const port = process.env.PORT || 3000

//Define Path for express config
const publicDirectoryPath = path.join(__dirname,'../public')
const viewsPath = path.join(__dirname, '../templates/views') 
const partialPath = path.join(__dirname, '../templates/partials') 

//Setup handlebars engine and views location
app.set('view engine', 'hbs')
app.set('views', viewsPath)
hbs.registerPartials(partialPath)

//Setup static directory to serve
app.use(express.static(publicDirectoryPath))


//passing HTML as response

// app.get('',(req, res) => {
//     res.send('<h1>Hello Express!</h1>')
// })

app.get('',(req, res) => {
    res.render('index',{
        title: 'Weather App',
        name: 'Mayank'
    })
})


// app.get('/help',(req,res) =>{
//     res.send('Help Page')
// })

app.get('/help',(req,res) =>{
    res.render('help',{
        message: 'This is some helpful text for you',
        title: 'Help Page',
        name: 'Mayank'
    })
})

//passing JSON as response

app.get('/aboutUs',(req,res) =>{
    res.send({
        name: 'Mayank',
        age: 23
    })
})

// app.get('/about', (req,res) =>{
//     res.send('<h1>About</h1>')
// })

app.get('/about', (req,res) =>{
    res.render('about',{
        title: 'About Me',
        name: 'Mayank'
    })
})


// app.get('/weather', (req,res) =>{
//     res.send({
//         forecast: 'It is snowy',
//         location: 'New Delhi'
//     })
// })

// app.get('/weather', (req,res) =>{
//     if(!req.query.address){
//         return res.send({
//             error:'You must provide the address!'
//         })
//     }
//     console.log(req.query.address)
//     res.send({
//         location: req.query.address
//     })
// })


//normal code
// app.get('/weather', (req,res) =>{
//     if(!req.query.address){
//         return res.send({
//             error:'You must provide the address!'
//         })
//     }
//     geocode(req.query.address,(error,data) =>{
//         if(error){
//             return res.send({
//                 error: error
//             })
//         }
//         forecast(data.latitude, data.longitude, (error, forecastData) => {
//             if(error){
//                 return res.send({
//                     error: error
//                 })
//             }
//             res.send({
//                 forecast:forecastData,
//                 location: data.location,
//                 address:req.query.address
//             })
//             // console.log(data.location)
//             // console.log(forecastData)
//           })
//     })
//     // res.send({
//     //     location: req.query.address
//     // })
// })

//de-structured code
app.get('/weather', (req,res) =>{
    if(!req.query.address){
        return res.send({
            error:'You must provide the address!'
        })
    }
    geocode(req.query.address,(error,{latitude,longitude,location} = {}) =>{
        if(error){
            return res.send({
                error: error
            })
        }
        forecast(latitude, longitude, (error, forecastData) => {
            if(error){
                return res.send({
                    error: error
                })
            }
            res.send({
                forecast:forecastData,
                location,
                address:req.query.address
            })
            // console.log(data.location)
            // console.log(forecastData)
          })
    })
    // res.send({
    //     location: req.query.address
    // })
})


app.get('/products', (req,res) =>{
    if(!req.query.search){
        return res.send({
            error:'You must provide the search term'
        })
    }
    console.log(req.query.search)
    res.send({
        products:[]
    })
})

// app.get('*', (req,res)=>{
//     res.send('My 404 Page')
// })

app.get('/help/*', (req,res)=>{
    res.render('404',{
        title: '404 Help',
        name: 'Mayank',
        errorMessage: 'Help article not Found'
    })
})


app.get('*', (req,res)=>{
    res.render('404',{
        title: '404',
        name: 'Mayank',
        errorMessage: 'Page not Found'
    })
})

//app.com
//app.com/help
//app.com/about


app.listen(port, ()=>{
    console.log('Server is running at at port '+3000)
})