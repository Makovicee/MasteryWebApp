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

async function DelAbl(req, res) {
  try {
    const { id } = req.query;
    const isValid = ajv.validate(schema, { id });
    if (!isValid) {
      const { message, errors } = ajv.errors[0];
      res.status(400).json({
        code: "dtoInIsNotValid",
        message: "dtoIn is not valid",
        validationError: [{ message }],
      });
      return;
    }

    const activity = await activityDao.del(id);
    console.log(activity);
    if (!activity) {
      res.status(404).json({
        code: "activityNotFound",
        message: `Activity with id ${id} not found`,
      });
      return;
    }
    res.json("Activity deleted");
  } catch ({ message }) {
    res.status(500).json({ message });
  }
}

module.exports = DelAbl;
