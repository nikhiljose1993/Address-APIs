import express from "express";
import addressRouter from "./address.js";

const accountRouter = express.Router();

accountRouter.use((req, res, next) => {
  // console.log("body", req.body);
  next();
});

accountRouter.use("/address", addressRouter);

accountRouter.get("/", (req, res) => {
  res.send("Home Page");
});

export default accountRouter;
