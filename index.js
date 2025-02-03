const express = require("express");
const dotenv = require("dotenv").config();
const cors = require("cors");
const path = require("path");
const connectDB = require("./config/db");
const faqRoutes = require("./routes/faqRoute");

const app = express();
const port = process.env.PORT || 3000; // Ensure a default port is set

// Connect to Database (Ensure connection before starting server)
connectDB()
  .then(() => {
    console.log("Database Connected Successfully");

    // Middleware
    app.use(cors()); 
    app.use(express.json());
    app.use(express.static(path.join(__dirname, "public")));

    // Routes
    app.get("/", (req, res) => {
      res.sendFile(path.join(__dirname, "public", "index.html"));
    });

    app.use("/api", faqRoutes);

    // Start Server after DB Connection
    app.listen(port, () => {
      console.log(`Server started at http://localhost:${port}`);
    });

  })
  .catch((error) => {
    console.error("Database Connection Failed", error);
    process.exit(1); // Exit if DB connection fails
  });
