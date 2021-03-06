var express = require('express')
var cors = require('cors')
var path = require('path')
var bodyParser = require('body-parser')
var fs = require('fs')
var dbConst = require('./app/constants/db-constants')
var app = express()
// const assert = require('assert')
// const MongoClient = require('mongodb').MongoClient
app.use(cors())


const mongoose = require('mongoose')


mongoose.Promise = global.Promise

// Connecting to the database
mongoose.connect(dbConst.DB_URL, {
    useNewUrlParser: true
}).then(() => {
    console.log("[Successfully connected to the database]")    
}).catch(err => {
    console.log('Could not connect to the database. Exiting now...')
    process.exit()
})
function config () {
          // Import configuration
        // setMiddelWares(app)
        app.use(bodyParser.urlencoded({
            extended: true
          }))
            // parse application/json
          app.use(bodyParser.json({
            limit: '4MB'
          }))
          setRoutes(app)
       
       

      return app
     
  }


function setRoutes (app) {
    var routesFolder = './app/routes/'
    fs.readdir(routesFolder, function (err, routes) {
      routes.forEach(function (route) {
        require(routesFolder + route)(app)
      })
    })
  }

// var listener = config().listen(
//     dbConst.PORT, () => {
//         console.log(`[Connected to server on port : ${dbConst.PORT}]`)
//     }

var listener = config().set('port', (process.env.PORT || 5000))

listener.listen(listener.get('port'), function() {
    console.log('Node app is running on port', listener.get('port'))
  })


  