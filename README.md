
# FAQ Management System

This project allows you to manage FAQs (Frequently Asked Questions) with the ability to fetch and create new FAQs via a REST API.

## Features

- **GET** `/api/faqs` – Fetch all FAQs.
- **POST** `/api/faqs` – Create a new FAQ.
- **Caching** – FAQs are cached for 1 hour to optimize response times.

## Installation

### 1. Clone the Repository

```bash
git clone https://github.com/animesh156/faq-management.git
```

### 2. Install Dependencies

Navigate to the project directory and install the dependencies using npm:

```bash
cd faq-management
npm install
```

### 3. Setup Environment Variables

Make sure to configure any environment variables like the port or Redis connection if you're using it. For Redis, set the appropriate environment variables in your `.env` file (optional).

Example `.env`:

```
PORT=6123
REDIS_URI=redis://your-redis-uri
```

### 4. Start the Application

To run the application locally:

```bash
npm start
```

This will start the server on **http://localhost:6123**.

## API Endpoints

### **GET** `/api/faqs`

Fetch all the FAQs.

#### Example Response:

```json
[
  {
    "question": "What is Node.js?",
    "answer": "Node.js is a JavaScript runtime."
  },
  {
    "question": "How to use Express?",
    "answer": "Express is a web framework for Node.js."
  }
]
```

### **POST** `/api/faqs`

Create a new FAQ. You need to send a **JSON** request body with `question` and `answer` properties.

#### Example Request:

```json
{
  "question": "What is Node.js?",
  "answer": "Node.js is a JavaScript runtime."
}
```

#### Example Response:

```json
{
  "question": "What is Node.js?",
  "answer": "Node.js is a JavaScript runtime."
}
```

### Error Handling

- **400 Bad Request** – If `question` is missing when creating a new FAQ.

#### Example Error Response:

```json
{
  "error": "Question is required"
}
```

## Testing

### 1. Run Tests with Mocha and Chai

To run unit tests for the FAQ API:

```bash
npm test
```

Make sure your app is running before executing the tests.

### 2. Test Coverage

- **GET /api/faqs**: Ensure it returns all FAQs.
- **POST /api/faqs**: Check if a new FAQ is created and handle validation errors.


