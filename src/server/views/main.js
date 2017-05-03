const header = require('./partials/header');
const gameContainer = require('./partials/game-container');
const footer = require('./partials/footer');

module.exports = function mainView(req) {
  return `
      ${header()}
        ${!req.isAuthenticated() ?
          `
            <h1 class="headline">Laika's Space Adventure</h1>
            <img src="https://upload.wikimedia.org/wikipedia/en/7/71/Laika_%28Soviet_dog%29.jpg">
            <div class="login">
              <a href="/login">Sign in with Facebook</a>
            </div>
          `
          :
          `
            <h1 class="headline">Laika's Space Adventure</h1>
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
