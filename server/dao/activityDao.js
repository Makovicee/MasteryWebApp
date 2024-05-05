const fs = require("fs");
const path = require("path");
const crypto = require("crypto");

const activityFolderPath = path.join(__dirname, "storage", "activityLog");

// Create an activity
function create(activity) {
  try {
    // generate unique id
    activity.id = crypto.randomBytes(16).toString("hex");

    //just a temporary solution, in a final version the actvity.owner will be set to the id of the user that created the activity
    //for now the owner is random when the activity is created
    // activity.owner = crypto.randomBytes(16).toString("hex");

    //set time related values
    activity.spentTime = 0;
    activity.achieved = false;
    activity.remaining = activity.timeGoal;
    activity.completionRate = 0;
    activity.claimed = false;

    const filePath = path.join(activityFolderPath, `${activity.id}.json`);
    const fileData = JSON.stringify(activity);
    fs.writeFileSync(filePath, fileData, "utf8");
    return activity;
  } catch (error) {
    throw { code: "failedToCreateEvent", message: error.message };
  }
}
// Get all activities of given owner
function get(activityOwner, status) {
  try {
    const activities = fs.readdirSync(activityFolderPath);
    const ownerActivities = [];

    // loop through all activities if user has more than one
    for (const activity of activities) {
      const activityData = fs.readFileSync(
        path.join(activityFolderPath, activity),
        "utf8"
      );
      const activityJson = JSON.parse(activityData);

      //push activities of given owner and status (if status not set, push all activities, if status is set, push only activities of given status)
      if (
        activityJson.owner === activityOwner &&
        (status == undefined || activityJson.achieved == status)
      ) {
        ownerActivities.push(activityJson);
      }
    }

    return ownerActivities.length > 0 ? ownerActivities : null;
  } catch (error) {
    throw { code: "failedToGetEvent", message: error.message };
  }
}

//add time to activity
function addTime(activityId, time) {
  try {
    const filePath = path.join(activityFolderPath, `${activityId}.json`);
    const activityData = fs.readFileSync(filePath, "utf8");
    const activityJson = JSON.parse(activityData);

    // update the time related values
    if (activityJson.achieved == false) {
      activityJson.spentTime += time;
      activityJson.remaining -= time;
      activityJson.completionRate = (
        (activityJson.spentTime / activityJson.timeGoal) *
        100
      ).toFixed(2);
    } else {
      throw new Error("Activity is already achieved cannot add more time");
    }

    // check if activity is achieved by the newly added time
    if (activityJson.remaining <= 0) {
      activityJson.achieved = true;
    }

    fs.writeFileSync(filePath, JSON.stringify(activityJson), "utf8");
    return activityJson;
  } catch (error) {
    throw { code: "failedToAddTime", message: error.message };
  }
}

//deletes the activity
function del(activityId) {
  try {
    fs.unlinkSync(path.join(activityFolderPath, `${activityId}.json`));
  } catch (error) {
    throw { code: "failedToDeleteActivity", message: error.message };
  }
  return true;
}

// update the activity selected specifics (name,quote,time goal, ...) but keep other values the same
function update(activity) {
  try {
    const filePath = path.join(activityFolderPath, `${activity.id}.json`);
    const activityData = fs.readFileSync(filePath, "utf8");
    const activityJson = JSON.parse(activityData);

    // update the activity with the new values
    Object.assign(activityJson, activity);

    // update time-related values (risk of changing timeGoal so recalculate)
    activityJson.remaining = activityJson.timeGoal - activityJson.spentTime;
    activityJson.completionRate = (
      (activityJson.spentTime / activityJson.timeGoal) *
      100
    ).toFixed(2);

    fs.writeFileSync(filePath, JSON.stringify(activityJson), "utf8");
    return activityJson;
  } catch (error) {
    throw { code: "failedToUpdateActivity", message: error.message };
  }
}

// Returns an activity based on the given id
function getById(activityId) {
  try {
    const filePath = path.join(activityFolderPath, `${activityId}.json`);
    const activityData = fs.readFileSync(filePath, "utf8");
    const activityJson = JSON.parse(activityData);

    return activityJson;
  } catch (error) {
    throw { code: "failedToGetActivityById", message: error.message };
  }
}

function getAll() {
  try {
    const files = fs.readdirSync(activityFolderPath);
    const activityList = files.map((file) => {
      const fileData = fs.readFileSync(
        path.join(activityFolderPath, file),
        "utf8"
      );
      return JSON.parse(fileData);
    });
    return activityList;
  } catch (error) {
    throw { code: "failedToListUsers", message: error.message };
  }
}

module.exports = {
  create,
  get,
  addTime,
  del,
  update,
  getById,
  getAll,
};
