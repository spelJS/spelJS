const header = require('./partials/header');
const logo = require('./partials/logo');
const icon = require('./partials/facebook-icon');
const footer = require('./partials/footer');

module.exports = function loginView() {
  return `
    ${header()}
    ${logo()}
      <h1 class="headline">Laika's Space<br>Adventure</h1>
      <div class="login">
        <a href="/login" class="loginButton">Sign in with Facebook ${icon()}</a>
      </div>
    ${footer()}
  `;
};
