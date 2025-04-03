const pool = require("../database/");

/* ***************************
 *  Task 3.C: Fetch reviews for a specific vehicle
 * ************************** */
async function getReviewsByInvId(inv_id) {
  try {
    const result = await pool.query(
      `SELECT r.*, a.account_firstname, a.account_lastname 
       FROM review r 
       JOIN account a ON r.account_id = a.account_id 
       WHERE r.inv_id = $1 
       ORDER BY r.review_date DESC`,
      [inv_id]
    );
    return result.rows;
  } catch (error) {
    console.error("Error fetching reviews by inv_id:", error);
    throw error;
  }
}

/* ***************************
 *  Task 4: Fetch reviews for a specific customer/account
 * ************************** */
async function getReviewsByAccountId(account_id) {
  try {
    const result = await pool.query(
      `SELECT r.*, i.inv_make, i.inv_model 
       FROM review r 
       JOIN inventory i ON r.inv_id = i.inv_id 
       WHERE r.account_id = $1 
       ORDER BY r.review_date DESC`,
      [account_id]
    );
    return result.rows;
  } catch (error) {
    console.error("Error fetching reviews by account_id:", error);
    throw error;
  }
}

/* ***************************
 *  Task 3.A: Add a new review
 * ************************** */
async function addReview(review_text, inv_id, account_id) {
  try {
    const result = await pool.query(
      `INSERT INTO review (review_text, inv_id, account_id) 
       VALUES ($1, $2, $3) RETURNING *`,
      [review_text, inv_id, account_id]
    );
    return result.rows[0];
  } catch (error) {
    console.error("Error adding review:", error);
    throw error;
  }
}

/* ***************************
 *  Task 5: Fetch a review by ID for editing
 * ************************** */
async function getReviewById(review_id) {
  try {
    const result = await pool.query(
      `SELECT * FROM review WHERE review_id = $1`,
      [review_id]
    );
    return result.rows[0];
  } catch (error) {
    console.error("Error fetching review by ID:", error);
    throw error;
  }
}

/* ***************************
 *  Task 5: Update an existing review
 * ************************** */
async function updateReview(review_id, review_text) {
  try {
    const result = await pool.query(
      `UPDATE review SET review_text = $1 
       WHERE review_id = $2 RETURNING *`,
      [review_text, review_id]
    );
    return result.rows[0];
  } catch (error) {
    console.error("Error updating review:", error);
    throw error;
  }
}

/* ***************************
 *  Task 3.B: Delete a review
 * ************************** */
async function deleteReview(review_id) {
  try {
    const result = await pool.query(
      `DELETE FROM review WHERE review_id = $1 RETURNING *`,
      [review_id]
    );
    return result.rows[0];
  } catch (error) {
    console.error("Error deleting review:", error);
    throw error;
  }
}

module.exports = { getReviewsByInvId, getReviewsByAccountId, addReview, getReviewById, updateReview, deleteReview, };