const header = require('./partials/header');
const logo = require('./partials/logo');
const icon = require('./partials/facebook-icon');
const userInfo = require('./partials/user-info');
const highscore = require('./partials/highscore');
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
            <div class="content content-js">
              ${highscore(req)}
            </div>
            ${navigation()}
          `
        }
      </div>
      ${footer()}
  `;
};
