// Imports
const express = require('express')
const cors = require('cors')
const mongoose = require('mongoose')
const dotenv = require('dotenv')

// Routes
const routes = require('./routes')

// Environment
dotenv.config()

// App
const app = express()

// Database connection
mongoose.connect(process.env.DB_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
});

// App config
app.use(
  cors({
    origin: '',
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    preflightContinue: false,
    optionsSuccessStatus: 204
  })
)

app.use(express.json())
app.use(routes)

// PORT
app.listen(process.env.PORT || 3333)

//
console.log(`> ${process.env.APP_NAME} server running on PORT ${process.env.PORT || 3333}`)