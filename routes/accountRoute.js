/* ***********************
 * Account routes
 * Unit 4, deliver login view activity
 *************************/
const express = require("express")
const router = new express.Router() 
const accountController = require("../controllers/accountController")
const utilities = require("../utilities/")

/* ***********************
 * Account routes
 * Unit 4, deliver login view activity
 *************************/
router.get("/login", utilities.handleErrors(accountController.buildLogin));

/* ***********************
 * Account routes
 * Register view activity
 *************************/
router.get("/register", utilities.handleErrors(accountController.buildRegister));

module.exports = router;