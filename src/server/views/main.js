const header = require('./partials/header');
const gameContainer = require('./partials/game-container');
const footer = require('./partials/footer');

module.exports = function mainView(req) {
  return `
      ${header()}
      <h1>spelJS</h1>
      ${gameContainer()}
      <div class="login">
        ${!req.isAuthenticated() ?
          '<a href="/login">Logga in</a>' :
          `
            <h1>Hello ${JSON.stringify(req.user.displayName)}!</h1>
            <pre>${JSON.stringify(req.user, null, 2)}</pre>
          `
        }
      </div>
      ${footer()}
  `;
};
