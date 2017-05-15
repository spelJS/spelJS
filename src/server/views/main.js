const header = require('./partials/header');
const logo = require('./partials/logo');
const icon = require('./partials/facebook-icon');
const rotateIcon = require('./partials/rotate-icon');
const gameContainer = require('./partials/game-container');
const userInfo = require('./partials/user-info');
const navigation = require('./partials/navigation');
const footer = require('./partials/footer');

module.exports = function mainView(req) {
  return `
      ${header()}
        ${!req.isAuthenticated() ?
          `
            ${logo()}
            <h1 class="headline">Laika's Space<br>Adventure</h1>
            <div class="login">
              <a href="/login" class="loginButton">Sign in with Facebook ${icon()}</a>
            </div>
          `
          :
          `
            ${userInfo(req)}
            <div class="spacedust"></div>
            <div class="rotateIconContainer rotateIconContainer-js">
              ${rotateIcon()}
              <p class="rotateInstructions">Rotate</p>
            </div>
            <div class="content content-js">
              ${gameContainer(req.user.highscore)}
            </div>
            ${navigation()}
          `
        }
      </div>
      ${footer()}
  `;
};
