const Ajv = require("ajv");
const ajv = new Ajv();

const activityDao = require("../../dao/activityDao.js");

const schema = {
  type: "object",
  properties: {
    id: { type: "string" },
    time: { type: "number" },
  },
  required: ["id", "time"],
  additionalProperties: false,
};

async function AddTimeAbl(req, res) {
  try {
    let activity = req.body;
    const valid = ajv.validate(schema, activity);
    if (!valid) {
      res.status(400).json({
        code: "dtoInIsNotValid",
        message: "dtoIn is not valid",
        validationError: ajv.errors,
      });
      return;
    }
    activity = activityDao.addTime(activity.id, activity.time);
    res.json(activity);
  } catch (e) {
    res.status(500).json({ message: e.message });
  }
}

module.exports = AddTimeAbl;
