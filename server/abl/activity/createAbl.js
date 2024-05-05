const Ajv = require("ajv");
const ajv = new Ajv();

const activityDao = require("../../dao/activityDao.js");

const schema = {
  type: "object",
  properties: {
    name: { type: "string" },
    quote: { type: "string" },
    timeGoal: { type: "number" },
    owner: { type: "string" },
  },
  required: ["name", "timeGoal", "owner"],
  additionalProperties: false,
};

async function CreateAbl(req, res) {
  try {
    let activity = req.body;

    // validate input
    const valid = ajv.validate(schema, activity);
    if (!valid) {
      res.status(400).json({
        code: "dtoInIsNotValid",
        message: "dtoIn is not valid",
        validationError: ajv.errors,
      });
      return;
    }

    activity = activityDao.create(activity);
    res.json(activity);
  } catch (e) {
    res.status(500).json({ message: e.message });
  }
}

module.exports = CreateAbl;
