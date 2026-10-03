const express = require("express");
const router = express.Router();

const feeController = require("../controllers/feeController");

router.get("/", feeController.getFees);

module.exports = router;