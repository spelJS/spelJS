const header = require('./partials/header');
const logo = require('./partials/logo');
const icon = require('./partials/facebook-icon');
const gameContainer = require('./partials/game-container');
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
            <div class="user-info">
              <div class="user-info__content">
                <p>${req.user.name}</p>
                <a href="/logout">Logout</a>
              </div>
              <div class="photo__container">
                <img class="photo" src="${req.user.photo}" alt="Photo of ${req.user.name}">
              </div>
            </div>
            <div class="gameInfo">
              <div class="highscore"></div>
              <p class="scoreText">Your High Score: <span class="highSpan-js">${req.user.highscore}</span></p>
              <p class="scoreText">Score: <span class="scoreSpan-js">0</span></p>
              <p class="gameInstructions">Press space or arrow up to jump</p>
            </div>
            <div class="content content-js">
              ${gameContainer(req.user.highscore)}
            </div>
            <nav class="navigation navigation-js">
              <ul class="navigation__list">
                <li class="navigation__list-item play-js"><a href="/#play">Play Game</a></li>
                <li class="navigation__list-item highscore-js"><a href="/highscore">View Highscore</a></li>
              </ul>
            </nav>
          `
        }
      </div>
      ${footer()}
  `;
};

// <pre>${JSON.stringify(req.user, null, 2)}</pre>
