const activityDao = require("../../dao/activityDao.js");

async function GetAllAbl(req, res) {
  try {
    const getAll = activityDao.getAll();
    res.json(getAll);
  } catch (e) {
    res.status(500).json({ message: e.message });
  }
}

module.exports = GetAllAbl;
