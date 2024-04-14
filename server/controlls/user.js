const express = require("express");
const router = express.Router();

const CreateAbl = require("../abl/user/createAbl.js");
const GetMrAbl = require("../abl/user/getMR.js");
const AddExpAbl = require("../abl/user/addExpAbl.js");
const DelUserAbl = require("../abl/user/delUserAbl.js");

router.post("/create", (req, res) => {
  CreateAbl(req, res);
});

router.get("/getMR", (req, res) => {
  GetMrAbl(req, res);
});

router.post("/addExp", (req, res) => {
  AddExpAbl(req, res);
});

router.post("/del", (req, res) => {
  DelUserAbl(req, res);
});
module.exports = router;
