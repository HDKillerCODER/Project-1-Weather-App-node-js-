// const request = require("request");
// const express = require("express");
// const path    = require("path");
// const hbs     = require("hbs");
// const geocode = require("./utils/geocode");
// const forecast = require("./utils/forecast");
// const app = express();

// //const publicDirectoryPath = path.join(__dirname, "..public");
// const viewspath = path.join(__dirname, "../templates/views");
// const partialsPath = path.join(__dirname, '../templates/partials')

// app.set("view engine", "hbs")
// app.set("views", viewspath);
// hbs.registerPartials(partialsPath)

// //app.use(express.static(publicDirectoryPath));


// // ==================================================//
// // ROUTES SECTION //
// // index page route //  
// app.get('/', (req, res) =>{
//     res.render("index.hbs", {
//         title: "Weather",
//         name: "Harsh Kumar"
//     });
// })

// // About page route
// app.get("/about", (req, res) =>
// {
//     res.render('about.hbs', {
//         title: "About Me",
//         name: "Harsh Kumar"
//     })
// })

// // Help page route
// app.get("/help", (req, res) =>
// {
//     res.render('help.hbs', {
//         helpText: "This might help you",
//         title: "Help",
//         name: "Harsh kumar"
//     })
// })

// app.get("/weather", (req, res) =>{
//     if(!req.query.address)
//     {
//         return res.send({
//             error: 'You must provide an address'
//         })
//     }

//     geocode(req.query.address, (error, { latitude, longitude, location } = {}) =>{
//         if(error)
//         return res.send({error})

//         forecast(latitude, longitude, (error, forecastData)=> {
//             if(error)
//             return res.send({error});

//             res.send({
//                 forecast: forecastData,
//                 address: req.query.address
//             })
//         })
//     })
// })

// // Products search page route
// app.get("/products", (req, res) => {
//     if(!req.query.search)
//     return res.send({
//         error: "You must provide a search query"
//     })
//     res.send({
//         products: [req.query.search]
//     })
// })

// // Others page route
// app.get("/help/*", (req, res) =>
// {
//     res.render('404.hbs', {
//         title: "404",
//         name: "Harsh Kumar",
//         errorMessage: "Help article not found go back!"
//     })
// })

// app.get("*", (req, res) => {
//     res.render("404", {
//         title: "404",
//         name: "Harsh Kumar",
//         errorMessage: "Page not found, do it again"
//     })
// })
// app.listen(3000, function()
// {
//     console.log("The server has started");
// })


// IMPORTANT NEW ONE TO UNDERSTAND PATHS REFER TO NODE JS PATHS

const path = require('path')
const express = require('express')
const hbs = require('hbs'); // for the partials use
const geocode = require('./utils/geocode.js') // requiring the geocode function
const forecast = require('./utils/forecast.js')


const app = express()

// Defining paths (express config)
const publicDirectoryPath = path.join(__dirname, '../public')
const viewspath = path.join(__dirname, '../templates/views');
const partialspath = path.join(__dirname, '../templates/partials'); // for the partials directory

// Setting handlebars and changing views path to templates
app.set('views', viewspath);
app.set('view engine', 'hbs')
hbs.registerPartials(partialspath);

// Setting up the public directory path 
app.use(express.static(publicDirectoryPath))

app.get('', (req, res) => {
    res.render('index', {
        title: 'Weather',
        name: 'Harsh kumar'
    })
})

app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About Me',
        name: 'Harsh Kumar'
    })
})

app.get('/help', (req, res) => {
    res.render('help', {
        helpText: 'This is some helpful text.',
        title: 'Help Page',
        name: 'Harsh Kumar'
    })
})

app.get('/weather', (req, res) => {
    if(!req.query.address)
    {
        return res.send({'error': 'Please provide the address'})
    }

    geocode(req.query.address, (error, {latitude, longitude, location} = {})=>{
        if(error)
        return res.send({'error': error})

    forecast(latitude, longitude, (error, forecastdata) => {
        if(error)
        return res.send({'error': error})
        res.send({
            forecast: forecastdata,
            location: location,
            address: req.query.address
        })
    })
    
    })
})

app.get('/help/*', (req, res) => {
    res.render('404', {
        title: '404 page',
        name: 'Harsh',
        helpText: 'HELP ARTICLE NOT FOUND'
    })
})

app.get('*', (req, res) => {
    res.render('404', {
        title: '404 PAGE',
        name: 'HARSH',
        helpText: 'Page not found'
    })
})
app.listen(3000, () => {
    console.log('Server is up on port 3000.')
})

// when you run nodemon src/app.js then it is searching views folder in /web-sever directory
// but when you run nodemon app.js from the src folder then code is looking for the views
// folder in src folder.