const express = require('express')
const router = express.Router()
const {getFAQs, createFAQ} = require('../controllers/faqController')

router.get('/faqs', getFAQs)


router.post('/faqs', createFAQ)

module.exports = router
  