import express from "express";
import pool from "../config/postgres.js";

const router = express.Router();

router.post("/add", async (req, res) => {
  address = req.body;
  // if (address != null) {
  //   const res = await pool.query(`INSERT INTO address(name, address_1, address_2, zip_code, state, country) VALUE(${address.name}, ${address.address1}, ${})`);
  // }

  console.log(req.body);
  res.send("added");
});

router.get("/", async (req, res) => {
  const response = await pool.query("SELECT * FROM address");
  res.send(response.rows);
});

export default router;
