const header = require('./partials/header');
const gameContainer = require('./partials/game-container');
const footer = require('./partials/footer');

module.exports = function mainView(req) {
  return `
      ${header()}
        ${!req.isAuthenticated() ?
          `
            <h1>Laika's Space Adventure</h1>
            <p>Sign in to play</p>
            <div class="login">
              <a href="/login">Login</a>
            </div>
          `
          :
          `
            <h1>Laika's Space Adventure</h1>
            <div class="user-info">
              <div class="user-info__content">
                <p>You are logged in as: ${req.user.displayName}</p>
                <a href="/logout">Logout</a>
              </div>
              <img src="${req.user.photos[0].value}" alt="Photo of ${req.user.displayName}">
            </div>
            ${gameContainer()}

          `
        }
      </div>
      ${footer()}
  `;
};

// <pre>${JSON.stringify(req.user, null, 2)}</pre>
