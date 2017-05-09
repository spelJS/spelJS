const header = require('./partials/header');
const icon = require('./partials/facebook-icon');
const gameContainer = require('./partials/game-container');
const footer = require('./partials/footer');

module.exports = function mainView(req) {
  return `
      ${header()}
        ${!req.isAuthenticated() ?
          `
            <h1 class="headline">Laika's Space<br>Adventure</h1>
            <div class="login">
              <a href="/login" class="loginButton">Sign in with Facebook ${icon()}</a>
            </div>
          `
          :
          `
            <h1 class="headline">Laika's Space Adventure</h1>
            <div class="user-info">
              <div class="user-info__content">
                <p>You are logged in as: ${req.user.name}</p>
                <a href="/logout">Logout</a>
              </div>
              <img src="${req.user.photo}" alt="Photo of ${req.user.name}">
            </div>
            ${gameContainer(req.user.highscore)}
          `
        }
      </div>
      ${footer()}
  `;
};

// <pre>${JSON.stringify(req.user, null, 2)}</pre>
