module.exports = function gameContainer() {
  return `
  <div class="gameContainer gameContainer-js">
    <p>Press space or arrow up to jump</p>
    <div class="highscore"></div>
    <div>High Score:<span class="highSpan">0</span></div>
    <div>Score:<span class="scoreSpan">0</span></div>
    <div class="player"></div>
  </div>
  `;
};
