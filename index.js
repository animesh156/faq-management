const express = require('express')
const app = express()
const dotenv = require('dotenv').config()
const port = process.env.PORT
const faqRoutes = require('./routes/faqRoute')

const connectDB = require('./config/db')


connectDB()





app.use('/api', faqRoutes)




app.listen(port, () => {
    console.log(`Sever started at ${port}`)
})
