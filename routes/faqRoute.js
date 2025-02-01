const express = require('express')
const router = express.Router()


router.get('/faqs', (req,res) => (
    res.json('faq')
))


router.post('/faqs', (req,res) => (
    res.json('faq created')
))

module.exports = router
