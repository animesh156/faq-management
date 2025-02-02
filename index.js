const express = require("express");
const app = express();
const dotenv = require("dotenv").config();
const port = process.env.PORT;
const faqRoutes = require("./routes/faqRoute");
const connectDB = require("./config/db");


app.use(express.json())
app.use(express.static(path.join(__dirname, 'public')));

connectDB();

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

app.use("/api", faqRoutes);

app.listen(port, () => {
  console.log(`Sever started at ${port}`);
});
