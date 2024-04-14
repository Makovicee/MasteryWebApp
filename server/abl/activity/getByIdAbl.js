const Ajv = require("ajv");
const ajv = new Ajv();
const activityDao = require("../../dao/activityDao.js");

const schema = {
  type: "object",
  properties: {
    id: { type: "string" },
  },
  required: ["id"],
  additionalProperties: false,
};

async function GetByIdAbl(req, res) {
  try {
    let param = req.body;
    const valid = ajv.validate(schema, param);
    if (!valid) {
      res.status(400).json({
        code: "dtoInIsNotValid",
        message: "dtoIn is not valid",
        validationError: ajv.errors,
      });
      return;
    }
    const activity = await activityDao.getById(param.id);
    if (!activity) {
      res.status(404).json({
        code: "activityNotFound",
        message: `activity ${param.id} not found`,
      });
      return;
    }
    res.json(activity);
  } catch (e) {
    res.status(500).json({ message: e.message });
  }
}

module.exports = GetByIdAbl;
