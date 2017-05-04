const fs = require('fs');

/**
 * Read from database file. Used when file exists.
 */
function readFromDatabase() {
  fs.readFile('src/server/database/users.json', function readFileCallback(error, data) {
    if (error) {
      console.log(error);
    } else {
      const userObject = JSON.parse(data);
      console.log(userObject);
      console.log('File already exists.');
    }
  });
}

/**
 * Create a json file to store users in, used when file does not exist.
 * @param  {object} user Information about current user
 */
function createFile(user) {
  const jsonObject = {
    users: []
  };
  // Push user to object
  jsonObject.users.push({ id: user.id, name: user.displayName });
  const json = JSON.stringify(jsonObject);
  // Create file.
  fs.writeFile('src/server/database/users.json', json, 'utf8', function writeFileCallback(error, data) {
    if (error) {
      console.log(error);
    } else {
      console.log('File did not exist, now created!');
    }
  });
}

/**
 * Push user ID and user name to an object and save it in users.json.
 * @param  {object} user Information about current user
 */
module.exports = function saveUser(user) {
  fs.exists('src/server/database/users.json', (exists) => {
    exists ? readFromDatabase() : createFile(user);
  });
};
