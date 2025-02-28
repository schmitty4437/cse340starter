const invModel = require("../models/inventory-model")
const utilities = require("../utilities/")

const invCont = {}

/* ***************************
 *  Build inventory by classification view
 * ************************** */
invCont.buildByClassificationId = async function (req, res, next) {
  const classification_id = req.params.classificationId
  const data = await invModel.getInventoryByClassificationId(classification_id)
  const grid = await utilities.buildClassificationGrid(data)
  let nav = await utilities.getNav()
  const className = data[0].classification_name
  res.render("./inventory/classification", {
    title: className + " vehicles",
    nav,
    grid,
    errors: null,
  })
}

/* ***************************
 *  Build inventory item detail view
 * ************************** */
invCont.buildByInvId = async function(req, res, next) {
  // Used for testing error
  // throw new Error("Test error")

  const inv_id = req.params.invId
  const data = await invModel.getInventoryById(inv_id)
  const vehicleDetails = await utilities.buildDetailView(data)
  let nav = await utilities.getNav()
  const vehicleName = data.inv_year + " " + data.inv_make + " " + data.inv_model
  res.render("./inventory/inventory-details", {
    title: vehicleName,
    nav,
    vehicleDetails
  })
}


/* ***************************
 *  Render Management View
 * ************************** */
invCont.buildManagementView = async function (req, res, next) {
  let nav = await utilities.getNav();
  res.render("inventory/management", {
    title: "Vehicle Management",
    nav,
    errors: null,
  });
};

/* ****************************
 * Build add classification view
 **************************** */
invCont.buildAddClassificationView = async function (req, res) {
  let nav = await utilities.getNav();
  res.render("inventory/add-classification", {
    title: "Add New Classification",
    nav,
    errors: null,
  });
};

/* ****************************
* Process classification submission
**************************** */
invCont.addClassification = async function (req, res) {
  let nav = await utilities.getNav();
  const { classification_name } = req.body;

  const regResult = await invModel.createClassification(classification_name);

  if (regResult) {
    req.flash("notice", `The classification '${classification_name}' was successfully added.`);
    res.status(201).render("inventory/management", {
      title: "Inventory Management",
      nav,
      errors: null,
    });
  } else {
    req.flash("notice", "Sorry, the classification could not be added.");
    res.status(501).render("inventory/add-classification", {
      title: "Add New Classification",
      nav,
    });
  }
};


/* ****************************
 * Build add inventory view
 **************************** */
invCont.buildAddInventoryView = async (req, res, next) => {
  let classificationList = await utilities.buildClassificationList()
  let nav = await utilities.getNav()
  res.render("inventory/add-inventory", {
      title: "Add Inventory",
      nav,
      classificationList,
      errors: null
  })
}

/* ****************************
 * Process add inventory view
 **************************** */
invCont.addInventory = async (req, res) => {
  const result = await invModel.createInventory(req.body)
  if (result) {
      req.flash("success", "Inventory item added successfully!")
      res.redirect("/inv")
  } else {
      req.flash("error", "Error adding inventory item.")
      res.redirect("/inv/add-inventory")
  }
}


module.exports = invCont