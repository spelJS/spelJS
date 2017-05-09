const player = require('./player');

module.exports = function gameContainer(highscore) {
  return `
  <div class="gameContainer gameContainer-js">
    <div class="player player-js">${player()}</div>
  </div>
  `;
};
