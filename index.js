const express = require("express");
const path = require("path");




const app = express();

// Middleware
app.use(express.json());

// static files from public directory
app.use("/docs", express.static(path.join(__dirname, "docs")));
app.use(express.static('docs')); // Ensure "frontend" folder is accessible


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