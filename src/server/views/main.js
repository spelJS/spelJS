const header = require('./partials/header');
const gameContainer = require('./partials/game-container');
const footer = require('./partials/footer');

module.exports = function mainView(req) {
  return `
      ${header()}
        ${!req.isAuthenticated() ?
          `
            <h1>Sign in to play!</h1>
            <div class="login">
              <a href="/login">Logga in</a>
            </div>
          `
          :
          `
            <h1>Hello ${JSON.stringify(req.user._json.name)}!</h1>
            ${gameContainer()}
            <pre>${JSON.stringify(req.user, null, 2)}</pre>
            <a href="/logout">Logga ut</a>
          `
        }
      </div>
      ${footer()}
  `;
};
