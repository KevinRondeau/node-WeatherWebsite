/* --------------------------------- Modules -------------------------------- */
//#region 
const express = require('express')
const path = require('path')
const app = express()
const hbs = require('hbs')
const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')
const port = process.env.PORT || 3000
//#endregion

/* ---------------------------------- Paths --------------------------------- */
//#region 
// Define paths for express config
const publicDirectoryPath = path.join(__dirname, '../public')
const viewsPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')

// Setting up handlebars engine and views location
app.set('view engine', 'hbs')
app.set('views', viewsPath)
hbs.registerPartials(partialsPath)

// Setup static directory to serve
app.use(express.static(publicDirectoryPath))
//#endregion


//index Page
app.get('', (req, res) => {
    res.render('index', {
        title: 'Weather app',
        name: 'Kevin'

    })
})

//about Page
app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About',
        name: 'Kevin'

    })
})

//help Page
app.get('/help', (req, res) => {
    res.render('help', {
        title: 'Help',
        message: 'This is a message!',
        name: 'Kevin'

    })
})

//weather Page
app.get('/weather', (req, res) => {
    if (!req.query.adress) {
        return res.send({
            error: 'You must provide an adress'
        })
    }
    //={} means default object, if they are undefined i can then get the error message instead of server crash
    geocode(req.query.adress, (error, { latitude, longitude, location } = {}) => {
        if (error) {
            return res.send({ error })
        }

        forecast(latitude, longitude, (error, forecastData) => {
            if (error) {
                return res.send({ error })
            }
            res.send({
                forecast: forecastData,
                location,
                adress: req.query.adress
            })
        })
    })

})

// app.get('/products', (req, res) => {
//     if (!req.query.search) {
//         return res.send({
//             error: 'You must provide a search term'
//         })
//     }
//     console.log(req.query)
//     res.send({
//         products: []
//     })
// })

//404 error in help
app.get('/help/*', (req, res) => {
    res.render('error', {
        title: '404',
        name: 'Kevin',
        message: 'Help article not found!',
        source: './public/css/style.css'
    })
})
//404 error   ---> need to come last
app.get('*', (req, res) => {
    res.render('error', {
        title: '404',
        name: 'Kevin',
        message: 'Page not found!',
        source: './css/style.css'
    })
})

app.listen(port, () => {
    console.log('Server is Up on port' + port)
})