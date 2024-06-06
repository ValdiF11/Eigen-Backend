// index.js
require("dotenv").config();
const express = require("express");
const app = express();
const cors = require("cors");
const router = require("./api/route");
const errorHandler = require("./middlewares/errorHandler");
const swaggerSetup = require("../swagger");

app.use(cors());
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

// Register routes
app.use(router);

// Register swagger
swaggerSetup(app);

// Error handling middleware
router.use(errorHandler);

// const port = process.env.PORT || 3000;
// app.listen(port, () => console.log(`Server is running on port ${port}`));

module.exports = app;
