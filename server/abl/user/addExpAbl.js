const Ajv = require("ajv");
const ajv = new Ajv();

const userDao = require("../../dao/userDao.js");

const schema = {
  type: "object",
  properties: {
    id: { type: "string" },
    activityTimeGoal: { type: "number" },
  },
  required: ["id", "activityTimeGoal"],
  additionalProperties: false,
};

async function addExpAbl(req, res) {
  try {
    let user = req.body;
    const valid = ajv.validate(schema, user);
    if (!valid) {
      res.status(400).json({
        code: "dtoInIsNotValid",
        message: "dtoIn is not valid",
        validationError: ajv.errors,
      });
      return;
    }
    user = userDao.addExp(user, user.activityTimeGoal);
    res.json(user);
  } catch (e) {
    res.status(500).json({ message: e.message });
  }
}

module.exports = addExpAbl;
