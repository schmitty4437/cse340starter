const reviewModel = require("../models/review-model");
const invModel = require("../models/inventory-model")
const utilities = require("../utilities/");

/* ***************************
 *  Add Review (Task 3.A)
 * ************************** */
async function addReview(req, res, next) {
  const { review_text, inv_id, account_id } = req.body;
  try {
    // Task 3.A - Insert new review
    const result = await reviewModel.addReview(review_text, parseInt(inv_id), parseInt(account_id));
    if (result) {
      req.flash("notice", "Review added successfully.");
      res.redirect(`/inv/detail/${inv_id}`);
    } else {
      req.flash("notice", "Failed to add review.");
      res.redirect(`/inv/detail/${inv_id}`);
    }
  } catch (error) {
    req.flash("notice", "Error adding review.");
    res.redirect(`/inv/detail/${inv_id}`);
  }
}

/* ***************************
 *  Build Edit Review View (Task 3.B, 5)
 * ************************** */
async function buildEditReview(req, res, next) {
  const review_id = parseInt(req.params.review_id);
  let nav = await utilities.getNav();
  try {
    // Gets the review for editing
    const review = await reviewModel.getReviewById(review_id);
    if (!review) {
      req.flash("notice", "Review not found.");
      return res.redirect("/account/");
    }
    if (res.locals.accountData.account_id !== review.account_id) {
      req.flash("notice", "You can only edit your own reviews.");
      return res.redirect("/account/");
    }

    // Get vehicle data for the title
    const vehicleData = await invModel.getInventoryById(review.inv_id);
    if (!vehicleData) {
      req.flash("notice", "Vehicle not found.");
      return res.redirect("/account/");
    }

    const title = `Edit ${vehicleData.inv_year} ${vehicleData.inv_make} ${vehicleData.inv_model} Review`;
    res.render("review/edit", {
      title,
      nav,
      errors: null,
      review_id: review.review_id,
      review_text: review.review_text,
      review_date: review.review_date,
      inv_id: review.inv_id,
    });
  } catch (error) {
    console.error("buildEditReview error:", error);
    req.flash("notice", "Error loading review.");
    res.redirect("/account/");
  }
}

/* ***************************
 *  Update Review (Task 3.B, 5)
 * ************************** */
async function updateReview(req, res, next) {
  const { review_id, review_text, inv_id } = req.body;
  let nav = await utilities.getNav();
  try {
    // Task 5 Verify ownership before update
    const review = await reviewModel.getReviewById(parseInt(review_id));
    if (!review || res.locals.accountData.account_id !== review.account_id) {
      req.flash("notice", "You can only update your own reviews.");
      return res.redirect("/account/");
    }
    // Task 5 Update review
    const result = await reviewModel.updateReview(review_id, review_text);
    if (result) {
      req.flash("notice", "Review updated successfully.");
      res.redirect("/account/");
    } else {
      req.flash("notice", "Failed to update review.");
      res.status(501).render("review/edit", {
        title: "Edit Review",
        nav,
        errors: null,
        review_id,
        review_text,
        inv_id,
      });
    }
  } catch (error) {
    req.flash("notice", "Error updating review.");
    res.status(500).render("review/edit", {
      title: "Edit Review",
      nav,
      errors: null,
      review_id,
      review_text,
      inv_id,
    });
  }
}

/* ***************************
 *  Build Delete Review (Task 3.B)
 * ************************** */
async function buildDeleteReview(req, res, next) {
    const review_id = parseInt(req.params.review_id)
    //console.log("buildDeleteReview - req.params.review_id:", req.params.review_id, "parsed review_id:", review_id)
    if (isNaN(review_id) || !req.params.review_id) {
      req.flash("notice", "Invalid review ID.")
      return res.redirect("/account/")
    }
    let nav
    try {
      nav = await utilities.getNav()
      //console.log("buildDeleteReview - Nav fetched successfully")
      const review = await reviewModel.getReviewById(review_id)
      //console.log("buildDeleteReview - Review fetched:", review)
      if (!review || res.locals.accountData.account_id !== review.account_id) {
        req.flash("notice", "You can only delete your own reviews.")
        return res.redirect("/account/")
      }
      const vehicle = await invModel.getInventoryById(review.inv_id)
      //console.log("buildDeleteReview - Vehicle fetched:", vehicle)
      const title = `Delete ${vehicle.inv_year} ${vehicle.inv_make} ${vehicle.inv_model} Review`
      res.render("review/delete", {
        title,
        nav,
        errors: null,
        review_id: review.review_id,
        review_text: review.review_text,
        review_date: review.review_date.toLocaleDateString(),
      })
    } catch (error) {
      //console.error("buildDeleteReview - Error:", error)
      req.flash("notice", "Error loading review for deletion.")
      res.redirect("/account/")
    }
  }

  /* ***************************
 *  Delete Review (Task 3.B)
 * ************************** */
  async function deleteReview(req, res, next) {
    const review_id = parseInt(req.body.review_id)
    //console.log("deleteReview - req.body.review_id:", req.body.review_id, "parsed review_id:", review_id)
    if (isNaN(review_id)) {
      req.flash("notice", "Invalid review ID.")
      return res.redirect("/account/")
    }
    try {
      const review = await reviewModel.getReviewById(review_id)
      if (!review || res.locals.accountData.account_id !== review.account_id) {
        req.flash("notice", "You can only delete your own reviews.")
        return res.redirect("/account/")
      }
      const result = await reviewModel.deleteReview(review_id)
      if (result) {
        req.flash("notice", "Review deleted successfully.")
      } else {
        req.flash("notice", "Failed to delete review.")
      }
      res.redirect("/account/")
    } catch (error) {
      req.flash("notice", "Error deleting review.")
      res.redirect("/account/")
    }
  }

module.exports = { addReview, buildEditReview, updateReview, buildDeleteReview, deleteReview };