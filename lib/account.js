import express from "express";
import addressRouter from "./address.js";

const router = express.Router();

router.use((req, res, next) => {
  console.log("body", req.body);
  next();
});

router.use("/address", addressRouter);

router.get("/", (req, res) => {
  res.send("Home Page");
});

export default router;
