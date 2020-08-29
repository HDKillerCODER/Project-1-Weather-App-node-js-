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

const port = process.env.PORT || 3000;
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
app.listen(port, () => {
    console.log('Server is up on port '+ port);
})

// when you run nodemon src/app.js then it is searching views folder in /web-sever directory
// but when you run nodemon app.js from the src folder then code is looking for the views
// folder in src folder.


// SSH keys for secure transmission
// ls - list directories of the current folder
// !!   ls -a -->  list all the hidden files
// !!   ls -a -l --> list all the files in the column manner
// ls -a -l ~/.ssh --> to check the ssh folder in the user directory

// ssh-keygen  ===== allows to generate ssh key
// ssh-keygen -t rsa -b 4096 -C "harshdhiman9484@gmail.com"

// then rerun the first command

// after that run the ssh agent::::    eval "$(ssh-agent -s)"

// then add the identity::::    ssh-add -K ~/.ssh/id_rsa
//then finally our identitiy will be added


//cat ~/.ssh/id_rsa.pub
//ssh -T git@github.com  ===== going to test connection between us and github
//========================over for pushing the code to github================================


// setting up the heroku
//1. heroku keys:add ======= simply to add the key
//2. we set up the command to initialise our application heroku create hd-weather-app