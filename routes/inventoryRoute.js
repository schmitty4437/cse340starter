// Needed Resources 
const express = require("express")
const router = new express.Router() 
const invController = require("../controllers/invController")
const utilities = require("../utilities/")
const classificationValidation = require("../utilities/classification-validation");
const inventoryValidation = require("../utilities/inventory-validation")

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

//add inventory view activity
router.get("/add-inventory", utilities.handleErrors(invController.buildAddInventoryView))

//add inventory activity
router.post(
    "/add-inventory",
    inventoryValidation.inventoryRules(),
    inventoryValidation.checkInventoryData,
    utilities.handleErrors(invController.addInventory)
)

// Get inventory for AJAX Route
router.get("/getInventory/:classification_id", utilities.handleErrors(invController.getInventoryJSON))

// Get modify route
router.get("/edit/:inv_id", utilities.handleErrors(invController.buildEditInventoryView))

// watch and direct incoming request
router.post(
  "/update",
  inventoryValidation.inventoryRules(),
  inventoryValidation.checkInventoryData,
  utilities.handleErrors(invController.updateInventory)
)

module.exports = router;