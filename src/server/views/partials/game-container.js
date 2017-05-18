const player = require('./player');

module.exports = function gameContainer() {
  return `
  <div class="gameContainer gameContainer-js">
    <div class="player player-js">${player()}</div>
  </div>
  `;
};
