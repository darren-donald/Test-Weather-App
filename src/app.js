const path = require('path')
const express = require('express')
const hbs = require('hbs')
const cors = require('cors')

const geocode = require('./utils/geocode.js')
const forecast = require('./utils/forecast.js')

//console.log(__dirname)
//console.log(path.join(__dirname,'../public'))

const app = express()
const port = process.env.PORT || 3000


//Define paths for Express settings
const publicDirectoryPath = path.join(__dirname,'../public')
const viewsPath = path.join(__dirname, '../templates/views')
const partials = path.join(__dirname, "../templates/partials")

// Setup handlebars engine and views location
app.set('view engine', 'hbs')
app.set('views', viewsPath)
hbs.registerPartials(partials)

// setup the static folder to serve with web server
app.use(express.static(publicDirectoryPath))

// app.get('', (req, res) => {
//     res.send('This shit work66s')
// })

app.get('', cors(),  (req, res) => {
    res.render('index',
        {
            title: 'Weather App Test',
            name: 'DD'
        }
    )
})

app.get('/about', (req, res) => {
    res.render('about', {
            title: 'About',
            name: 'DARREN KKK'
        }
    )
})

app.get('/help', (req, res) => {
    res.render('help', {
            title: 'Help Me2',
            name: 'Darren Donald'
        }
    )
})

// app.get('/about', (req, res) => {
//     res.send('<h1>About</h1>')
// })



app.get('/weather', (req, res) => {
    if (!req.query.address) {
        return res.send({
            error: 'No address provided.'
        })
    }

    geocode(req.query.address, (error, { latitude, longitude, location } = {}) => {
        if (error) {
            return res.send({ error})
        }

        forecast(latitude, longitude,(error, forecastData)  => {
            if (error) {
                return res.send( {error})
            }

            res.send({
                forecast: forecastData,
                location,
                address: req.query.address
            })

        })

    })
    
    // res.send({
    //     location: 'Crownthorpe',
    //     forecast: 'Cloudy and rainy',
    //     address: req.query.address
    // })
})


app.get('/help/*', (req, res) => {
    res.render('404', {
        title: '404',
        errorMessage: 'No help article found'
    })
})

app.get('*', (req, res) => {
    res.render('404', {
        title: '404',
        errorMessage: 'Page not found'
    })
})

app.listen(port, () => {
    console.log('Server is up on ' + port)
})
