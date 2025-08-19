require("dotenv").config();
const express = require("express");
const { testConnection } = require("./utils/db");
const schoolRoutes = require("./routes/school.routes");

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware to parse JSON bodies
app.use(express.json());

// Test the database connection on startup
testConnection();

// Main route
app.get("/", (req, res) => {
	res.send("School Management API is running!");
});

// Use the school routes for any request starting with /api
app.use("/api", schoolRoutes);

// Start the server
app.listen(PORT, () => {
	console.log(`Server is listening on http://localhost:${PORT}`);
});
