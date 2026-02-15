import { pool } from "../config/db.js";

export const getCities = async (req, res) => {
  try {
    const result = await pool.query("SELECT * FROM cities");

    res.json(result.rows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const getCityByName = async (req, res) => {
  try {
    const { city } = req.params;

    const result = await pool.query(
      "SELECT * FROM cities WHERE city = $1",
      [city]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({ message: "City not found" });
    }

    res.json(result.rows[0]);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
