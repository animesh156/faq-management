const express = require("express");
const app = express();
const dotenv = require("dotenv").config();
const port = process.env.PORT;
const faqRoutes = require("./routes/faqRoute");

const connectDB = require("./config/db");
const bodyParser = require("body-parser");

app.use(bodyParser.json())
app.use(express.static('public'))

connectDB();

app.use("/api", faqRoutes);

app.listen(port, () => {
  console.log(`Sever started at ${port}`);
});
