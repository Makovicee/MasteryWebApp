const express = require("express");
const cors = require("cors");
const app = express();
const port = 8000;

const activityController = require("./controlls/activity.js");
const userController = require("./controlls/user.js");

app.use(express.json()); // podpora pro application/json
app.use(express.urlencoded({ extended: true })); // podpora pro application/x-www-form-urlencoded

app.use(cors());

app.get("/", (req, res) => {
  res.send("Hello World!");
});
app.get("/hello", (req, res) => {
  res.send("Hello Worldddddddddddddddddddd!");
});
//activity
app.use("/activity", activityController);

//user
app.use("/user", userController);

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
