const FAQ = require('../model/FAQModel')
const redisClient = require('../redis/client')
const translate = require('@vitalets/google-translate-api')


async function translateFAQ(question, answer) {
    const translated = {}

    try {
        const questionTranslation = await translate(question, {to: 'hi'});
        const answerTranslation = await translate(answer, {to: 'hi'})

        translated.question_hi = questionTranslation.text
        translated.answer_hi = answerTranslation.text
        return translated;

    } catch (error) {
        console.error('Translation error:', error)
        return {};
    }
}


// Get faq with language support
const getFAQs = async (req,res) => {
     const lang = req.query.lang || 'en';
     const cacheKey = `faqs_${lang}`;

     redisClient.get(cacheKey, async (err, cachedFAQs) => {
        if(cachedFAQs){
            return res.json(JSON.parse(cachedFAQs));
        }

        try {
            const faqs = await FAQ.find();
            const translatedFAQs = faqs.map(faq => faq.getTranslatedText(lang))

            redisClient.setEx(cacheKey,3600, JSON.stringify(translateFAQs))
            res.json(translatedFAQs)
        } catch (error) {
            res.status(500).json({error: 'failed to fecth FAQs'})
        }
     })
}

const createFAQ = async (req,res) => {
    const {question, answer, translations} = req.body;
    try {
        const newFAQ = new FAQ({
            question,
            answer,
            ...translations
          });
      
          await newFAQ.save();
          res.status(201).json(newFAQ);
    } catch (error) {
        res.status(500).json({error: "Failed to created FAQs"})
    }
}


module.exports = {getFAQs, createFAQ}