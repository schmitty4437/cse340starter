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
  const classificationSelect = await utilities.buildClassificationList()
  res.render("inventory/management", {
    title: "Vehicle Management",
    nav,
    errors: null,
    classificationSelect,
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
  
  const { classification_name } = req.body;

  const regResult = await invModel.createClassification(classification_name);

  if (regResult) {
    let nav = await utilities.getNav();
    const classificationSelect = await utilities.buildClassificationList();
    req.flash("notice", `The classification '${classification_name}' was successfully added.`);
    res.status(201).render("inventory/management", {
      title: "Inventory Management",
      nav,
      classificationSelect,
      errors: null,
    });
  } else {
    let nav = await utilities.getNav();
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

/* ***************************
 *  Return Inventory by Classification As JSON
 * ************************** */
invCont.getInventoryJSON = async (req, res, next) => {
  const classification_id = parseInt(req.params.classification_id)
  const invData = await invModel.getInventoryByClassificationId(classification_id)
  if (invData[0].inv_id) {
    return res.json(invData)
  } else {
    next(new Error("No data returned"))
  }
}

/* ***************************
 *  Build edit inventory view
 * ************************** */
invCont.buildEditInventoryView = async function (req, res, next) {
  const inv_id = parseInt(req.params.inv_id)
  let nav = await utilities.getNav()
  const itemData = await invModel.getInventoryById(inv_id)
  const classificationSelect = await utilities.buildClassificationList(itemData.classification_id)
  const itemName = `${itemData.inv_make} ${itemData.inv_model}`
  res.render("./inventory/edit-inventory", {
    title: "Edit " + itemName,
    nav,
    classificationSelect: classificationSelect,
    errors: null,
    inv_id: itemData.inv_id,
    inv_make: itemData.inv_make,
    inv_model: itemData.inv_model,
    inv_year: itemData.inv_year,
    inv_description: itemData.inv_description,
    inv_image: itemData.inv_image,
    inv_thumbnail: itemData.inv_thumbnail,
    inv_price: itemData.inv_price,
    inv_miles: itemData.inv_miles,
    inv_color: itemData.inv_color,
    classification_id: itemData.classification_id
  })
}

/* ****************************
 * Update Inventory Data
 **************************** */
invCont.updateInventory = async function (req, res, next) {
  let nav = await utilities.getNav()
  const {
    inv_id,
    inv_make,
    inv_model,
    inv_description,
    inv_image,
    inv_thumbnail,
    inv_price,
    inv_year,
    inv_miles,
    inv_color,
    classification_id,
  } = req.body
  const updateResult = await invModel.updateInventory(
    inv_id,  
    inv_make,
    inv_model,
    inv_description,
    inv_image,
    inv_thumbnail,
    inv_price,
    inv_year,
    inv_miles,
    inv_color,
    classification_id
  )

  if (updateResult) {
    const itemName = updateResult.inv_make + " " + updateResult.inv_model
    req.flash("notice", `The ${itemName} was successfully updated.`)
    res.redirect("/inv/")
  } else {
    const classificationSelect = await utilities.buildClassificationList(classification_id)
    const itemName = `${inv_make} ${inv_model}`
    req.flash("notice", "Sorry, the insert failed.")
    res.status(501).render("inventory/edit-inventory", {
      title: "Edit " + itemName,
      nav,
      classificationSelect: classificationSelect,
      errors: null,
      inv_id,
      inv_make,
      inv_model,
      inv_year,
      inv_description,
      inv_image,
      inv_thumbnail,
      inv_price,
      inv_miles,
      inv_color,
      classification_id
    })
  }
}

/* ***************************
 *  Build edit inventory view
 * ************************** */
invCont.buildDeleteConfirmationView = async function (req, res, next) {
  const inv_id = parseInt(req.params.inv_id)
  let nav = await utilities.getNav()
  const itemData = await invModel.getInventoryById(inv_id)
  const itemName = `${itemData.inv_make} ${itemData.inv_model}`
  res.render("./inventory/delete-confirm", {
    title: "Delete " + itemName,
    nav,
    errors: null,
    inv_id: itemData.inv_id,
    inv_make: itemData.inv_make,
    inv_model: itemData.inv_model,
    inv_year: itemData.inv_year,
    inv_price: itemData.inv_price,
  })
}

/* ****************************
 * Delete Inventory Item
 **************************** */
invCont.deleteInventory = async function (req, res, next) {
  let nav = await utilities.getNav()
  const inv_id = parseInt(req.body.inv_id)
  const deleteResult = await invModel.deleteInventory(inv_id)

  if (deleteResult) {
    req.flash("notice", "The vehicle was successfully deleted.")
    res.redirect("/inv/")
  } else {
    const itemName = `${req.body.inv_make} ${req.body.inv_model}`
    req.flash("notice", "Sorry, the delete failed.")
    res.redirect(`/inv/delete/${inv_id}`)
  }
}

module.exports = invCont