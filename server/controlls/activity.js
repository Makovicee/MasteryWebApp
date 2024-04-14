const express = require("express");
const router = express.Router();

const CreateAbl = require("../abl/activity/createAbl.js");
const GetAbl = require("../abl/activity/getAbl.js");
const AddTimeAbl = require("../abl/activity/addTimeAbl.js");
const DelAbl = require("../abl/activity/delAbl.js");
const UpdateAbl = require("../abl/activity/updateAbl.js");
const GetByIdAbl = require("../abl/activity/getByIdAbl.js");

router.post("/create", (req, res) => {
  CreateAbl(req, res);
});

router.get("/get", (req, res) => {
  GetAbl(req, res);
});

router.post("/addTime", (req, res) => {
  AddTimeAbl(req, res);
});

router.post("/del", (req, res) => {
  DelAbl(req, res);
});

router.post("/update", (req, res) => {
  UpdateAbl(req, res);
});

router.get("/getById", (req, res) => {
  GetByIdAbl(req, res);
});
module.exports = router;
