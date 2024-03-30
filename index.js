require('dotenv').config()
require('express-async-errors')

const {sq, connectDB} = require('./db/conn')

const express = require('express')
const app = express()

app.use(express.json())

const PORT = process.env.PORT || 5432

connectDB()

sq.sync()

app.listen(PORT, ()=>{
    console.log(`listening on ${PORT}`)
})