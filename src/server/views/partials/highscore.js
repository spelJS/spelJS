const fs = require('fs');

/**
 * Match user's profile id on Facebook with id in database
 * @param  {string} id     The user's unique Facebook id.
 * @return {object} user   The user with information about profile photo etc.
 */
function getUsers() {
  return new Promise((resolve, reject) => {
    fs.readFile('src/server/database/users.json', function readFileCallback(error, data) {
      if (error) {
        reject(error);
      } else {
        const users = JSON.parse(data); // Array with users
        resolve(users);
      }
    });
  });
}

module.exports = function highscore() {
  return `
  <div class="highscoreContainer highscoreContainer-js">
    <h2 class="headline headline--highscore">All Time High</h2>
    <ol>
      <li>Tukka Teriö – 46 points</li>
      <li>Katarina Ljungdahl – 42 points</li>
      <li>Jenni Pulli – 41 points</li>
    </ol>
  </div>
  <pre>${getUsers().then(result => result)}</pre>
  `;
};
