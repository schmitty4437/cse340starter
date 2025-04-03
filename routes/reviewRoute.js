/* ***************************
 *  Routes for Review Management
 * ************************** */

const express = require("express");
const router = new express.Router();
const utilities = require("../utilities/");
const reviewController = require("../controllers/reviewController");
const regValidate = require("../utilities/account-validation");

/* ***************************
 *  Task 3.A Route to add a review
 * ************************** */
router.post("/add", utilities.checkLogin, regValidate.reviewRules(), utilities.handleErrors(reviewController.addReview));

/* ***************************
 *  Task 3.B, 5 Route to edit a review
 * ************************** */
router.get("/edit/:review_id", utilities.checkLogin, utilities.handleErrors(reviewController.buildEditReview));

/* ***************************
 *  Task 3.B, 5 Route to update a review
 * ************************** */
router.post("/update", utilities.checkLogin, regValidate.reviewRules(), utilities.handleErrors(reviewController.updateReview));

/* ***************************
 *  Task 3.B - New POST route to handle deletion from confirmation page
 * ************************** */
router.post("/delete", utilities.checkLogin, utilities.handleErrors(reviewController.deleteReview))

/* ***************************
 *  Task 3.B Route to delete a review
 * ************************** */
router.get("/delete-confirm/:review_id", utilities.checkLogin, utilities.handleErrors(reviewController.buildDeleteReview));

module.exports = router;