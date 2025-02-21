const pool = require("../database/")

/* ***************************
 *  Get all classification data
 * ************************** */
async function getClassifications(){
  return await pool.query("SELECT * FROM public.classification ORDER BY classification_name")
}

/* ***************************
 *  Get all inventory items and classification_name by classification_id
 * ************************** */
async function getInventoryByClassificationId(classification_id) {
  try {
    const data = await pool.query(
      `SELECT * FROM public.inventory AS i 
      JOIN public.classification AS c 
      ON i.classification_id = c.classification_id 
      WHERE i.classification_id = $1`,
      [classification_id]
    )
    return data.rows
  } catch (error) {
    console.error("getclassificationsbyid error " + error)
  }
}

/* ***************************
 *  Get inventory item data by inventory_id
 * ************************** */
async function getInventoryById(inv_id) {
  try {
    const data = await pool.query(
      `SELECT * FROM public.inventory WHERE inv_id = $1`,
      [inv_id]
    )
    return data.rows[0]
  }catch (error) {
    console.error("getInventoryById error " + error)
  }
}

/* *****************************
*   Create new classification
* *************************** */
async function createClassification(classification_name){
  try {
    const sql = "INSERT INTO public.classification (classification_name) VALUES ($1) RETURNING *"
    const result = await pool.query(sql, [classification_name])
    return result.rows[0]
  } catch (error) {
    return error.message
  }
}

  /* **********************
 *   Check for existing classification
 * ********************* */
  async function checkExistingClassification(classification_name){
    try {
      const sql = "SELECT * FROM classification WHERE classification_name = $1"
      const result = await pool.query(sql, [classification_name])
      return result.rowCount > 0
    } catch (error) {
      return error.message
    }
  }

module.exports = {getClassifications, getInventoryByClassificationId, getInventoryById, createClassification, checkExistingClassification};