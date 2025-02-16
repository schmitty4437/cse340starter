/* ***********************
 * Account routes
 * Unit 4, deliver login view activity
 *************************/
const express = require("express")
const router = new express.Router() 
const accountController = require("../controllers/accountController")
const utilities = require("../utilities/")
const regValidate = require('../utilities/account-validation')

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

/* ***********************
 * Process Registration
 * Register activity
 *************************/
router.post("/register", 
    regValidate.registationRules(),
    regValidate.checkRegData,
    utilities.handleErrors(accountController.registerAccount));

// Process the login attempt
router.post("/login",
    regValidate.loginRules(),
    regValidate.checkLoginData,
    utilities.handleErrors(accountController.loginAccount));


module.exports = router;