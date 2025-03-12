const express = require("express");
const path = require("path");
const dotenv = require("dotenv");
const connectDB = require("./config/database");
const authRouter = require("./routes/auth");
const authMiddlewareRouters = require("./routes/authMiddlewareRoute");

dotenv.config();
connectDB();

const app = express();

// Middleware
app.use(express.json());

// static files from public directory
app.use("/docs", express.static(path.join(__dirname, "docs")));
app.use(express.static('docs')); // Ensure "docs" folder is accessible




// Routes


// Authentication Routes signup and login
app.use("/auth", authRouter);

// memberboard or neederboard routes after login
app.use("/board", authMiddlewareRouters);

// Default route to test server status
app.get("/", (request, response) => {
  response.sendFile(path.join(__dirname, "/docs", "index.html"));
});

// Error handling middleware
app.use((error, request, response, next) => {
  console.error("Error:", error.message);
  response.status(500).json({ error: "Internal Server Error" });
});

app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "/docs"));
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

module.exports = app;