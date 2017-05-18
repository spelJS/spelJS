const player = require('./player');

module.exports = function gameContainer() {
  return `
  <p class="headline instructions gameInstructions-js"></p>
  <div class="gameContainer gameContainer-js">
    <div class="player player-js">${player()}</div>
  </div>
  `;
};
