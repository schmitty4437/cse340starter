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
    utilities.handleErrors(accountController.accountLogin));

/* ***********************
 * Account routes
 * Management view activity
 *************************/
router.get("/", utilities.checkLogin, utilities.handleErrors(accountController.buildAccountManagement));

/* ***********************
 * Account routes
 * Update account view (W11 Task 3)
 *************************/
router.get("/update/:account_id", utilities.checkLogin, utilities.handleErrors(accountController.buildUpdateAccount));

/* ***********************
 * Account routes
 * Process account update (W11 Task 5)
 *************************/
router.post("/update",
    utilities.checkLogin,
    regValidate.accountUpdateRules(),
    regValidate.checkAccountUpdateData,
    utilities.handleErrors(accountController.updateAccount)
);

/* ***********************
 * Account routes
 * Process password change (W11 Task 5)
 *************************/
router.post("/change-password",
    utilities.checkLogin,
    regValidate.passwordChangeRules(),
    regValidate.checkPasswordChangeData,
    utilities.handleErrors(accountController.changePassword)
);

/* ***********************
 * Account routes
 * Logout process (W11 Task 6)
 *************************/
router.get("/logout", utilities.handleErrors(accountController.logoutAccount));

module.exports = router;