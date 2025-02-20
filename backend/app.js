require("dotenv").config();
const http = require("http");
const express = require('express');
const cors = require("cors");
const { PORT } = process.env;

const app = express();

// Middleware
app.use(express.json());


app.use(cors());
app.use((req, res, next) => {
    res.header("Cross-Origin-Resource-Policy", "cross-origin");
    next();
  });
// Routes
app.get('/', (req, res) => {
    res.send('Welcome to the College Management System');
});

app.get("*", (req, res) => {
    res.status(404).json({
      message: "Url Does not exit",
    });
  });

const server = http.createServer(app);
// Start server
server.listen(PORT, () => {
    console.log(`Server is running on ${PORT}`);
});