const header = require('./partials/header');
const rotateIcon = require('./partials/rotate-icon');
const gameContainer = require('./partials/game-container');
const userInfo = require('./partials/user-info');
const navigation = require('./partials/navigation');
const footer = require('./partials/footer');

module.exports = function mainView(state) {
  return `
    ${header()}
      <div class="spacedust"></div>
      <div class="rotateIconContainer rotateIconContainer-js">
        ${rotateIcon()}
        <p class="rotateInstructions">Rotate</p>
      </div>
      <p class="headline instructions gameInstructions-js"></p>
      <div class="flexbox">
        ${userInfo(state.user)}
          <div class="content content-js">
            ${gameContainer(state.user.highscore)}
          </div>
        ${navigation()}
      </div>
    ${footer()}
  `;
};
