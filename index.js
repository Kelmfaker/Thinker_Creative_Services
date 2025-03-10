const express = require("express");
const path = require("path");




const app = express();

// Middleware
app.use(express.json());

// static files from public directory
app.use("/frontend", express.static(path.join(__dirname, "frontend")));
app.use(express.static('frontend')); // Ensure "frontend" folder is accessible


// Default route to test server status
app.get("/", (request, response) => {
  response.sendFile(path.join(__dirname, "/frontend", "index.html"));
});

// Error handling middleware
app.use((error, request, response, next) => {
  console.error("Error:", error.message);
  response.status(500).json({ error: "Internal Server Error" });
});

app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "/frontend"));
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

module.exports = app;