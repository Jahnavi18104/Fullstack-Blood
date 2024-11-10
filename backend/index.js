const express = require("express");
const path = require("path");
const mongoose = require("mongoose");
const cors = require("cors");
const dbConfig = require("./db");

const app = express();
app.use(cors());
app.use(express.static(path.join(__dirname, "public")));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Import routes
const authRoutes = require("./routes/authRoutes");
const donorRoutes = require("./routes/donorRoutes");
const recipientRoutes = require("./routes/recipientRoutes");
const availabilityRoutes = require("./routes/availabilityRoutes");

// Use routes
app.use("/", authRoutes);
app.use("/", donorRoutes);
app.use("/", recipientRoutes);
app.use("/", availabilityRoutes);

// Start the server
app.listen(5000, () => {
    console.log("Server started on http://localhost:3020");
});
