require('dotenv').config()
require('express-async-errors')

const {sq, connectDB} = require('./db/conn')
const auth_R = require('./routes/Auth_R')

const express = require('express')
const app = express()

app.use(express.json())

app.get('/', (req, res) =>{
    res.json('GTC Api Clone')
})

app.use('/api/v1/auth', auth_R)

const PORT = process.env.PORT || 3001

connectDB()

sq.sync()

app.listen(PORT, ()=>{
    console.log(`listening on ${PORT}`)
})