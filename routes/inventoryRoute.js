// Needed Resources 
const express = require("express")
const router = new express.Router() 
const invController = require("../controllers/invController")
const utilities = require("../utilities/")
const classificationValidation = require("../utilities/classification-validation");

// Route to build inventory by classification view
router.get("/type/:classificationId", utilities.handleErrors(invController.buildByClassificationId));

// Route to get vehicle details
router.get("/detail/:invId", utilities.handleErrors(invController.buildByInvId));

// management view activity
router.get("/", utilities.handleErrors(invController.buildManagementView));

// classification view activity
router.get("/add-classification", utilities.handleErrors(invController.buildAddClassificationView));

// classification activity
router.post(
  "/add-classification",
  classificationValidation.classificationRules(), 
  classificationValidation.checkClassificationData,
  utilities.handleErrors(invController.addClassification)
);

module.exports = router;