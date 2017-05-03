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
            <p>You are logged in as: ${req.user.displayName}</p>
            <img src="${req.user.photos[0].value}" alt="Photo of ${req.user.displayName}">
            ${gameContainer()}
            <a href="/logout">Logout</a>
          `
        }
      </div>
      ${footer()}
  `;
};

// <pre>${JSON.stringify(req.user, null, 2)}</pre>
