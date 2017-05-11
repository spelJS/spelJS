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
 * Add new user to database, and also add this user to other user's
 * friendlist, if they are friends on Facebook.
 *
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
        const userFriendList = profile._json.friends.data;
        const friendsId = [];

        // Push all the user's friends Facebook Id's to an array
        for (let i = 0; i < userFriendList.length; i += 1) {
          friendsId.push(userFriendList[i].id);
        }

        // FIXME: Right now, there is a possibility for duplicates
        for (let i = 0; i < users.length; i += 1) {
          if (friendsId.includes(users[i].id)) {
            users[i].friends.push({
              name: profile.displayName,
              id: profile.id
            });
          }
        }

        // Create the user based on information from Facebook
        const user = {
          id: profile.id,
          name: profile.displayName,
          photo: profile.photos[0].value,
          highscore: 0,
          friends: profile._json.friends.data || [] // TODO: Is this correct?
        };

        users.push(user); // Push user to list of users
        const json = JSON.stringify(users, null, 2); // Convert list to json

        // Update database
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

/**
 * Get current user's friends' name and highscore.
 * @param  {object} user            Current user
 * @return {array}  friendsScore    A list of friends and
 *                                  current user's highscore.
 */
exports.getFriendsScore = function (user) {
  return new Promise((resolve, reject) => {
    fs.readFile('src/server/database/users.json', function readFileCallback(error, dataBase) {
      if (error) {
        reject(error);
      } else {
        const currentUser = user;
        const users = JSON.parse(dataBase);
        const friendsScore = [{
          name: currentUser.name,
          highscore: currentUser.highscore
        }];

        // Loop through database to see who are friends with current user
        for (let i = 0; i < users.length; i += 1) {
          const usersFriends = users[i].friends;

          // If friends, push their name and highscore to friendsScore.
          for (let i = 0; i < usersFriends.length; i += 1) {
            if (usersFriends[i].id === currentUser.id) {
              friendsScore.push({
                name: users[i].name,
                highscore: users[i].highscore
              });
            }
          }
        }
        resolve(friendsScore);
      }
    });
  });
};
