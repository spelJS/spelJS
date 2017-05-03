const fs = require('fs');

// The empty object used to store current user in. This needs to check if
// there already is a user with that id in the json file.
const jsonObject = {
  users: []
};

/**
 * Push user ID and user name to an object and save it in users.json.
 * @param  {object} user Information about current user
 */
module.exports = function handleUsers(user) {
  jsonObject.users.push({ id: user.id, name: user.displayName });
  const json = JSON.stringify(jsonObject);
  fs.writeFile('src/server/database/users.json', json, 'utf8');
};
