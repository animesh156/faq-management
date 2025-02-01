const mongoose = require('mongoose')

const faqSchema = new mongoose.Schema({
    question: {
        type: String, 
        required: true
    },
    answer: {
        type: String, 
        required: true
    },
    question_hi: String,  // Hindi translation of the question
    answer_hi: String,    // Hindi translation of the answer
    question_bn: String,  // Bengali translation of the question
    answer_bn: String,    // Bengali translation of the answer
    question_te: String,  // Telugu translation of the question
    answer_te: String,    // Telugu translation of the answer
    question_mr: String,  // Marathi translation of the question
    answer_mr: String,    // Marathi translation of the answer
    question_ta: String,  // Tamil translation of the question
    answer_ta: String,    // Tamil translation of the answer
    question_ur: String,  // Urdu translation of the question
    answer_ur: String,    // Urdu translation of the answer
    question_gu: String,  // Gujarati translation of the question
    answer_gu: String,    // Gujarati translation of the answer
    question_ml: String,  // Malayalam translation of the question
    answer_ml: String,    // Malayalam translation of the answer
    question_kn: String,  // Kannada translation of the question
    answer_kn: String,    // Kannada translation of the answer
    question_or: String,  // Odia (Oriya) translation of the question
    answer_or: String,    // Odia (Oriya) translation of the answer
}, {
    timestamps: true
});


faqSchema.methods.getTranslatedtext = (lang) => {
    return {
        question: this[`question_${lang}`] || this.question,
        answer: this[`answer_${lang}`] || this.answer
    };
}

module.exports = mongoose.model('FAQ', faqSchema)
