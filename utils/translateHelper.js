const translate = require("google-translate-api-x");

async function translateFAQ(question, answer) {
    const translated = {};
    const languages = ["hi", "bn", "ta", "te", "mr", "gu", "ml", "kn", "pa", "or"]; // Top 10 Indian languages

    try {
        for (const lang of languages) {
            const questionTranslation = await translate(question, { to: lang });
            const answerTranslation = await translate(answer, { to: lang });

            translated[`question_${lang}`] = questionTranslation.text;
            translated[`answer_${lang}`] = answerTranslation.text;
        }
        return translated;
    } catch (error) {
        console.error("❌ Translation error:", error);
        return {};
    }
}

module.exports = { translateFAQ };
