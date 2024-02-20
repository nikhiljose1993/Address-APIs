import "dotenv/config.js";
import express from "express";
import bodyParser from "body-parser";

import accountRouter from "./lib/account.js";

const app = express();

app.use(bodyParser.json());
app.use("/account", accountRouter);

app.listen(3000, () => {
  console.log("Server running at port 3000");
});
