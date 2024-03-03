require("dotenv").config();

const express = require("express");
const mongoose = require("mongoose");
const connectToMongo = require("./db.js");

const bodyParser = require("body-parser");
const dotenv = require("dotenv");

const registration = require("./model/User.js");

const app = express();

connectToMongo();

const port = process.env.PORT || 3000;

const username = process.env.MONGODB_USERNAME;
const password = process.env.MONGODB_PASSWORD;

mongoose.connection.once("open", () => {
  console.log("connected to mongo db");
  // STARTING SERVER
  app.listen(3000, () => {
    console.log("Server started on port 3000");
  });
});

mongoose.connection.on("error", err => {
  console.log(err);
  logEvents(
    `${err.no}\t${err.code}\t${err.syscall}\t${err.hostname}`,
    "MongoError.log"
  );
});

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.get("/", (req, res) => {
  res.sendFile(__dirname + "/pages/index.html");
});

app.post("/register", async (req, res) => {
  try {
    const { name, email, password } = req.body;

    const existingUser = await registration.findOne({ email: email });
    if (!existingUser) {
      const registrationData = new registration({
        name,
        email,
        password
      });
      await registrationData.save();
      res.redirect("/success");
    } else {
      console.log("User alreadyexist");
      res.redirect("/error");
    }
  } catch (error) {
    console.log(error);
    res.redirect("error");
  }
});

app.get("/success", (req, res) => {
  res.sendFile(__dirname + "/pages/success.html");
});
app.get("/error", (req, res) => {
  res.sendFile(__dirname + "/pages/error.html");
});
app.get("/userAlreadyExist", (req, res) => {
  res.sendFile(__dirname + "/pages/userExist.html");
});
