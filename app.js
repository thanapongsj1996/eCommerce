const express = require('express')
const mongoose = require('mongoose')
require('dotenv').config()

// app
const app = express()

// database
mongoose.connect(process.env.DATABASE, {
    useNewUrlParser: true,
    useCreateIndex: true
}).then(() => console.log('Database connected'))

// routes
app.get('/', (req, res) => {
    res.send('hello form NodeJS')
})

const port = process.env.PORT

app.listen(port, () => {
    console.log(`Server is running on port ${port}`)
})