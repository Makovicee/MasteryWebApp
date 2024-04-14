const Ajv = require("ajv");
const ajv = new Ajv();
const activityDao = require("../../dao/activityDao.js");

const schema = {
  type: "object",
  properties: {
    id: { type: "string" },
    name: { type: "string" },
    quote: { type: "string" },
    timeGoal: { type: "number" },
    deadline: { type: "string" },
    color: { type: "string" },
  },
  required: ["id"],
  additionalProperties: false,
};

async function UpdateAbl(req, res) {
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
    activity = activityDao.update(activity);
    res.json(activity);
  } catch (e) {
    res.status(500).json({ message: e.message });
  }
}

module.exports = UpdateAbl;
