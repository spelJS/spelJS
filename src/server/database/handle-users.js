const fs = require('fs');

/**
 * Match user's profile id on Facebook with id in database
 * @param  {string} id     The user's unique Facebook id.
 * @return {object} user   The user with information about profile photo etc.
 */
exports.getUserById = function getUserById(id) {
  return new Promise((resolve, reject) => {
    fs.readFile('src/server/database/users.json', function readFileCallback(error, data) {
      if (error) {
        reject(error);
      } else {
        const users = JSON.parse(data); // Array with users
        const user = users.find(item => item.id === id); // Find user based on id
        resolve(user);
      }
    });
  });
};

/**
 * Add new user to database
 * @param {object}  profile   Information retrieved from Facebook profile
 * @return {object} user      The user with information about profile photo etc.
 */
exports.addUser = function addUser(profile) {
  return new Promise((resolve, reject) => {
    // Get users from database (json file)
    fs.readFile('src/server/database/users.json', (error, data) => {
      if (error) {
        reject(error);
      } else {
        const users = JSON.parse(data); // Save users in variable

        const user = {
          id: profile.id,
          name: profile.displayName,
          photo: profile.photos[0].value,
          highscore: 0
        };

        users.push(user); // Push user to list of users
        const json = JSON.stringify(users, null, 2); // Convert list to json

        fs.writeFile('src/server/database/users.json', json, 'utf8', (error) => {
          error ? reject(error) : resolve(user);
        });
      }
    });
  });
};

/**
 * Takes information about user and high score and then updates database.
 * @param  {object} data Information about current user and highscore
 * @return {object} user The that just was updated.
 */
exports.updateUserHighScore = function (data) {
  return new Promise((resolve, reject) => {
    fs.readFile('src/server/database/users.json', function readFileCallback(error, dataBase) {
      if (error) {
        reject(error);
      } else {
        const users = JSON.parse(dataBase); // Array with users
        const user = users.find(item => item.id === data.id); // Find user based on id
        user.highscore = data.highscore; // Update user with new highscore

        const json = JSON.stringify(users, null, 2); // Convert list back to json.

        fs.writeFile('src/server/database/users.json', json, 'utf8', (error) => {
          error ? reject(error) : resolve(user);
        });
      }
    });
  });
};
