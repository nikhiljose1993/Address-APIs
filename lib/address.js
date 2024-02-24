import express from "express";
import pool from "../config/postgres.js";

const addressRouter = express.Router();

addressRouter.post("/add", async (req, res) => {
  if (req.body === null) {
    res.status(240).send("Bad request, the request body is null");
  }
  // console.log("post", req.body);
  const { name, address1, address2, zipCode, state, country } = req.body;

  const dbResponse = await pool.query(
    `INSERT INTO address(name, address_1, address_2, zip_code, state, country)
     VALUES ('${name}', '${address1}', '${address2}', ${zipCode}, '${state}', '${country}');`
  );
  dbResponse.rowCount == 0
    ? res.status(501).send("Some thing went wrong, couldn't add the address")
    : res.status(201).send("Added address successfully");
});

addressRouter.put("/update", async (req, res) => {
  if (req.body === null) {
    res.status(400).send("Bad request, the request body is null");
  }
  const { id, name, address1, address2, zipCode, state, country } = req.body;

  const dbResponse = await pool.query(
    `UPDATE address
    SET name = '${name}', address_1 = '${address1}', address_2 = '${address2}', zip_code = ${zipCode}, state = '${state}', country = '${country}'
    WHERE id = ${id};`
  );
  // console.log(dbResponse.rowCount);
  dbResponse.rowCount == 0
    ? res.status(501).send("Some thing went wrong, couldn't update the address")
    : res.status(201).send("Updated address successfully");
});

addressRouter.delete("/delete", async (req, res) => {
  if (req.body === null) {
    res.status(400).send("Bad request, the request body is null");
  }

  const dbResponse = await pool.query(`DELETE FROM address WHERE id = ${req.body.id};`);

  dbResponse.rowCount == 0
    ? res.status(501).send("Some thing went wrong, couldn't delete the address")
    : res.status(200).send("Deleted address successfully");
});

addressRouter.get("/get-all", async (req, res) => {
  const response = await pool.query(
    `SELECT id, name, address_1 as "address1", address_2 as "address2", zip_code as "zipCode", state, country FROM address`
  );

  if (res.length > 0) {
    res.status(204).send("No address available");
  }

  res.status(200).send({ result: response.rows });
});

export default addressRouter;
