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
    const id = req.query.id; // Extract ID from query string
    const valid = ajv.validate(schema, { id }); // Validate ID
    if (!valid) {
      res.status(400).json({
        code: "dtoInIsNotValid",
        message: "dtoIn is not valid",
        validationError: ajv.errors,
      });
      return;
    }
    const activity = await activityDao.getById(id);
    if (!activity) {
      res.status(404).json({
        code: "activityNotFound",
        message: `activity ${id} not found`,
      });
      return;
    }
    res.json(activity);
  } catch (e) {
    res.status(500).json({ message: e.message });
  }
}

module.exports = GetByIdAbl;
