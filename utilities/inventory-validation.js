const { body, validationResult } = require("express-validator")
const utilities = require(".")
const validate = {}

/* *****************************
 *  Add Inventory Validation Rules
 * *************************** */
validate.inventoryRules = () => {
    return [
        body("classification_id")
            .notEmpty()
            .withMessage("Classification is required."),
        body("inv_make")
            .trim().notEmpty()
            .isLength({ min: 2 })
            .withMessage("Make is required."),
        body("inv_model")
            .trim()
            .notEmpty()
            .isLength({ min: 2 })
            .withMessage("Model is required."),
        body("inv_year")
            .isInt({ min: 1900, max: 2099 })
            .withMessage("Valid year required."),
        body("inv_description")
            .trim()
            .notEmpty()
            .withMessage("Description required."),
        body("inv_price")
            .isFloat({ min: 0 })
            .withMessage("Valid price required."),
        body("inv_miles")
            .isInt({ min: 0 })
            .withMessage("Valid mileage required."),
        body("inv_color")
            .trim().notEmpty()
            .withMessage("Color required."),
    ]
}

/* ******************************
 * Check Add Inventory data 
 * ***************************** */
validate.checkInventoryData = async (req, res, next) => {
    let errors = validationResult(req)
    if (!errors.isEmpty()) {
        let nav = await utilities.getNav();
        let classificationList = await utilities.buildClassificationList(req.body.classification_id);

        res.render("inventory/add-inventory", {
            errors,
            title: "Add Inventory",
            nav,
            classificationList,
            ...req.body
        });
        return;
    }
    next();
};

/* ******************************
 * Check Update Inventory Data
 * ***************************** */
validate.checkUpdateData = async (req, res, next) => {
    const { inv_id } = req.body;
    let errors = validationResult(req)
    if (!errors.isEmpty()) {
        let nav = await utilities.getNav();
        let classificationList = await utilities.buildClassificationList(req.body.classification_id);

        res.render("inventory/edit-inventory", {
            errors,
            title: "Edit " + `${req.body.inv_make} ${req.body.inv_model}`,
            nav,
            classificationList,
            inv_id,
            ...req.body
        });
        return;
    }
    next();
};

module.exports = validate