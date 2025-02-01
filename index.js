const express = require('express')
const app = express()
const dotenv = require('dotenv').config()
const port = process.env.PORT


app.get('/', (req,res) => {
    res.send('FAQ system')
})


app.listen(port, () => {
    console.log(`Sever started at ${port}`)
})
