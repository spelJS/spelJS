module.exports = function gameContainer() {
  return `
  <div class="gameContainer gameContainer-js">
    <p>Press space or arrow up to jump</p>
    <div class="high"></div>
    <div>Score:<span class="scoreSpan">0</span></div>
    <div class="player"></div>
  </div>
  `;
};
