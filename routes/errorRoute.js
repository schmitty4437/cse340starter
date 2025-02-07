const express = require("express");
const router = new express.Router();
const errorController = require("../controllers/errorController");

// Route that will be used to trigger the intentional 505 error
router.get("/error-test", errorController.errorTest);

module.exports = router;