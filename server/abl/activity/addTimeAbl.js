const Ajv = require("ajv");
const ajv = new Ajv();

const activityDao = require("../../dao/activityDao.js");

const schema = {
  type: "object",
  properties: {
    id: { type: "string" },
    time: { type: "number", multipleOf: 0.01 },
  },
  required: ["id", "time"],
  additionalProperties: false,
};

async function AddTimeAbl(req, res) {
  try {
    const id = req.query.id;
    const { time } = req.body;
    const timeNum = parseFloat(time);
    console.log("time:", timeNum);
    console.log("reqbody:", req.body);
    console.log("id:", id);
    console.log(typeof timeNum);

    if (!timeNum && timeNum !== 0) {
      console.log("llololoolo", timeNum);
      return res
        .status(400)
        .json({ message: "Time parameter is required a si kokot" });
    }

    const activity = activityDao.addTime(id, timeNum);
    res.json(activity);
  } catch (error) {
    console.error("An error occurred:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
}

module.exports = AddTimeAbl;

module.exports = AddTimeAbl;
