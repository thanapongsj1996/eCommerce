const express = require('express')
const mongoose = require('mongoose')
const morgan = require('morgan')
const bodyParser = require('body-parser')
const cookieParser = require('cookie-parser')
const expressValidator = require('express-validator')
require('dotenv').config()

// import routes
const authRoutes = require('./routes/auth')

// app
const app = express()

// database
mongoose.connect(process.env.DATABASE, {
    useNewUrlParser: true,
    useCreateIndex: true
}).then(() => console.log('Database connected'))

// middlewares
app.use(morgan('dev'))
app.use(bodyParser.json())
app.use(cookieParser())
app.use(expressValidator())

// routes middleware
app.use('/api', authRoutes)

const port = process.env.PORT

app.listen(port, () => {
    console.log(`Server is running on port ${port}`)
})