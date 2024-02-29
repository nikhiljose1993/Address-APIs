import "dotenv/config.js";
import express from "express";
import bodyParser from "body-parser";
import accountRouter from "./lib/account.js";
import pool from "./config/postgres.js";
import admin from "firebase-admin";
import { getMessaging } from "firebase-admin/messaging";
import serviceAccount from "./address-9d5cd-firebase-adminsdk-p0vy1-8b263d962f.json" assert { type: "json" };

const app = express();

app.use(bodyParser.json());

app.use("/account", accountRouter);

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});

let registrationToken = "";

app.post("/device-id", async (req, res) => {
  registrationToken = req.body.registrationToken;
  console.log(registrationToken);

  const dbResponse = await pool.query(
    `INSERT INTO fcm_token(fcm_device_id) VALUES('${registrationToken}')`
  );

  console.log(dbResponse);

  dbResponse.rowCount == 0
    ? res.status(501).send("Some thing went wrong, couldn't add the token")
    : res.status(201).send("Added token successfully");
});

const message = {
  notification: {
    title: "Test Notification",
    body: "Test notification message body",
  },
  // data: {
  //   custom_key: "custom_value",
  // },
  android: {
    priority: "high",
    notification: {
      sound: "default",
      click_action: "OPEN_ACTIVITY_1",
    },
  },
  token:
    "fAZ_o3flQWOcBAk580zHx0:APA91bF4v6fGfv3CRK67hsZ2EFwJAUZaB9HYUCXH3OasIdMD0derIJ6ldY5qRHqLZvVLjdfAkzcKxvhCsaFkYZRUe-2aaSbU5QC-HCWCkdP8wDynkDlkbX66EnSh_GsyqlTBkJxwQVOA",
};

app.post("/send", (req, res) => {
  // console.log(req.body.registrationToken);

  getMessaging()
    .send(message)
    .then((response) => {
      res.status(200).json({
        message: "Success",
      });
      console.log("Successfully sent message:", response);
    })
    .catch((error) => {
      res.status(400);
      console.log("Error sending message:", error);
    });
});

app.listen(3000, () => {
  console.log("Server running at port 3000");
});
