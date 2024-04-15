require('dotenv').config()
require('express-async-errors')

const {connectDB, sequelizeInstance}= require('./db/conn')
const {purgeTB} = require('./models/TBlacklist_M')

const auth_R = require('./routes/Auth_R')

const {errorHandler, notFound} = require('./services')

const cron = require('node-cron')
const express = require('express')
const app = express()

app.use(express.json())

app.get('/', (req, res) =>{
    res.json('GTC Api Clone')
})

app.use('/api/v1/auth', auth_R)

app.use(errorHandler)
app.use(notFound)


const PORT = process.env.PORT || 3001

connectDB()

sequelizeInstance.sync()

cron.schedule('50 9 * * *',()=>{
    purgeTB()
})

app.listen(PORT, ()=>{
    console.log(`listening on ${PORT}`)
})