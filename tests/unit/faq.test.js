const chai = require('chai');
const chaiHttp = require('chai-http');
const app = require('../../index'); // Import your main app
const { expect } = chai;

chai.use(chaiHttp); // Enable HTTP requests in Chai

describe('FAQ API', function () {
  
  // Test GET /api/faqs
  describe('GET /api/faqs', function () {
    it('should return all FAQs', function (done) {
      chai.request(app)
        .get('http://localhost:6124/api/faqs')
        .end(function (err, res) {
          expect(res).to.have.status(200);
          expect(res.body).to.be.an('array');
          expect(res.body.length).to.be.greaterThan(0); // Ensure at least one FAQ is present
          done();
        });
    });
  });

  // Test POST /api/faqs
  describe('POST /api/faqs', function () {
    it('should create a new FAQ', function (done) {
      const newFAQ = {
        question: "What is Node.js?",
        answer: "Node.js is a JavaScript runtime."
      };

      chai.request(app)
        .post('http://localhost:6124/api/faqs')
        .send(newFAQ)
        .set('Content-Type', 'application/json')
        .end(function (err, res) {
          expect(res).to.have.status(201); // Check if it was created successfully
          expect(res.body).to.have.property('question', newFAQ.question);
          expect(res.body).to.have.property('answer', newFAQ.answer);
          done();
        });
    });

    it('should return error if question is missing', function (done) {
      const invalidFAQ = {
        answer: "This is an answer without a question."
      };

      chai.request(app)
        .post('http://localhost:6124/api/faqs')
        .send(invalidFAQ)
        .set('Content-Type', 'application/json')
        .end(function (err, res) {
          expect(res).to.have.status(400); // Bad request due to missing question
          done();
        });
    });
  });

});
