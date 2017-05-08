const player = require('./player');

module.exports = function gameContainer(highscore) {
  return `
  <div class="gameContainer gameContainer-js">
    <p>Press space or arrow up to jump</p>
    <div class="highscore"></div>
    <div>Your High Score: <span class="highSpan-js">${highscore}</span></div>
    <div>Score: <span class="scoreSpan-js">0</span></div>
    <div class="player player-js">${player()}</div>
  </div>
  `;
};
