const FAQ = require("../model/FAQModel");
const redisClient = require("../redis/cache");
const { translateFAQ } = require("../utils/translateHelper");


const getFAQs = async (req, res) => {
    const lang = req.query.lang || "en"; // Default to 'en' if no language is specified
    const cacheKey = `faqs_${lang}`; // Cache key is based on language

    try {
        // First, try to get the cached FAQs from Redis
        const cachedFAQs = await redisClient.get(cacheKey);

        if (cachedFAQs) {
            // If found in cache, return the cached data
            console.log("Cache hit: Returning FAQs from Redis...");
            return res.json(JSON.parse(cachedFAQs));
        }

        // If cache miss, fetch FAQs from the database
        console.log("Cache miss: Fetching FAQs from DB...");

        // Fetch all FAQs from the database
        const faqs = await FAQ.find(); // Get FAQs from DB



        console.log("Fetched FAQs from DB:", faqs); // Log the fetched FAQs

        // Translate FAQs if necessary
        const translatedFAQs = faqs.map(faq => faq.getTranslatedText(lang));

        // Log the translated FAQs to check
        console.log("Translated FAQs:", translatedFAQs);

        // Cache the fetched FAQs in Redis for 1 hour (3600 seconds)
        await redisClient.setEx(cacheKey, 3600, JSON.stringify(translatedFAQs));

        // Return the translated FAQs
        res.json(translatedFAQs);

    } catch (error) {
        console.error("❌ Failed to fetch FAQs:", error);
        res.status(500).json({ error: "Failed to fetch FAQs" });
    }
};


// Create FAQ
const createFAQ = async (req, res) => {
    const { question, answer } = req.body;

    try {
        const translations = await translateFAQ(question, answer);

        const newFAQ = new FAQ({
            question,
            answer,
            translations
        });

        // Save the new FAQ to the database
        await newFAQ.save();

        // Cache the newly created FAQ in Redis
        const lang = "en"; // Or specify the language based on your application needs
        const cacheKey = `faqs_${lang}`;
        
        // Fetch current cache, add the new FAQ, and save it back
        const cachedFAQs = await redisClient.get(cacheKey);
        const faqList = cachedFAQs ? JSON.parse(cachedFAQs) : [];
        faqList.push(newFAQ.getTranslatedText(lang)); // Add the new FAQ to the cache

        // Save the updated FAQ list to Redis cache (for 1 hour)
        await redisClient.setEx(cacheKey, 3600, JSON.stringify(faqList));

        // Return the new FAQ as response
        res.status(201).json(newFAQ);
    } catch (error) {
        console.error("❌ Failed to create FAQ:", error);
        res.status(500).json({ error: "Failed to create FAQ" });
    }
};


module.exports = { getFAQs, createFAQ };
