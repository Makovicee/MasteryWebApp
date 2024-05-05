const fs = require("fs");
const path = require("path");
const crypto = require("crypto");

const userFolderPath = path.join(__dirname, "storage", "userLog");
const activityFolderPath = path.join(__dirname, "storage", "activityLog");

// Create an user
function create(user) {
  try {
    // set default values when user is created
    user.id = crypto.randomBytes(16).toString("hex");
    user.lvl = 1;
    user.exp = 0;

    const filePath = path.join(userFolderPath, `${user.id}.json`);
    const fileData = JSON.stringify(user);
    fs.writeFileSync(filePath, fileData, "utf8");
    return user;
  } catch (error) {
    throw { code: "failedToCreateUser", message: error.message };
  }
}

// delete an user
function del(user) {
  try {
    fs.unlinkSync(path.join(userFolderPath, `${user.id}.json`));
  } catch (error) {
    throw { code: "failedToDeleteUser", message: error.message };
  }
}

function addExp(user, activityTimeGoal) {
  try {
    const filePath = path.join(userFolderPath, `${user.id}.json`);
    const fileData = fs.readFileSync(filePath, "utf8");
    const userData = JSON.parse(fileData);

    // math logic that calculates how much exp should be added based on the the completed activity (activity with bigger time goal adds more exp)
    userData.exp += 100 * (activityTimeGoal / 20);

    // math logic for experience progression increased by user level
    let lvlUpThreshold = 100 * Math.pow(1.2, userData.lvl - 1);

    // lvl up if enough exp is reached (and reset exp to 0)
    if (userData.exp >= lvlUpThreshold) {
      userData.exp = 0;
      userData.lvl += 1;
    }

    fs.writeFileSync(filePath, JSON.stringify(userData), "utf8");
    return userData;
  } catch (error) {
    throw { code: "failedToAddExp", message: error.message };
  }
}

//get users info about progress (lvl,exp and based on lvl and exp calculate honor)
//list all users
function list() {
  try {
    const files = fs.readdirSync(userFolderPath);
    const userList = files.map((file) => {
      const fileData = fs.readFileSync(path.join(userFolderPath, file), "utf8");
      const userData = JSON.parse(fileData);

      //determine users honor based on his lvl
      let honor = "";
      if (userData.lvl <= 5) {
        honor = "Apprentice";
      } else if (userData.lvl > 5 && userData.lvl <= 10) {
        honor = "Prodigy";
      } else if (userData.lvl > 10 && userData.lvl <= 15) {
        honor = "Virtuoso";
      } else if (userData.lvl > 15 && userData.lvl <= 20) {
        honor = "Connoisseur";
      } else if (userData.lvl > 20) {
        honor = "Savant";
      }

      //loop through all the users activites
      const activities = fs.readdirSync(activityFolderPath);
      let completedActivities = 0;
      let pendingActivities = 0;
      for (const activity of activities) {
        const activityData = fs.readFileSync(
          path.join(activityFolderPath, activity),
          "utf8"
        );
        const activityJson = JSON.parse(activityData);
        if (activityJson.owner === userData.id) {
          if (activityJson.achieved === true) {
            completedActivities++;
          } else {
            pendingActivities++;
          }
        }
      }

      return {
        ...userData,
        honor: honor,
        completed: completedActivities,
        pending: pendingActivities,
      };
    });
    return userList;
  } catch (error) {
    throw { code: "failedToListUsers", message: error.message };
  }
}

module.exports = { create, addExp, del, list };
