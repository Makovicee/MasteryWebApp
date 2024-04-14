const Ajv = require("ajv");
const ajv = new Ajv();
const activityDao = require("../../dao/activityDao.js");

const schema = {
  type: "object",
  properties: {
    owner: { type: "string" },
    status: { type: "boolean" },
  },
  required: ["owner"],
  additionalProperties: false,
};

async function GetAbl(req, res) {
  try {
    let param = req.body;

    // validate input
    const valid = ajv.validate(schema, param);
    if (!valid) {
      res.status(400).json({
        code: "dtoInIsNotValid",
        message: "dtoIn is not valid",
        validationError: ajv.errors,
      });
      return;
    }

    // get event by given owner
    const activity = await activityDao.get(param.owner, param.status);
    if (!activity) {
      res.status(404).json({
        code: "activityNotFound",
        message: `activity ${param.owner} not found`,
      });
      return;
    }

    res.json(activity);
  } catch (e) {
    res.status(500).json({ message: e.message });
  }
}

module.exports = GetAbl;
