const express = require("express");
const router = express.Router();

router.use("/register", require("./register"));
router.use("/login", require("./login"));
router.use("/member", require("./member"));
router.use("/booklend", require("./borrowedBook"));
router.use("/book", require("./book"));

module.exports = router;
