const header = require('./partials/header');
const userInfo = require('./partials/user-info');
const highscore = require('./partials/highscore');
const navigation = require('./partials/navigation');
const footer = require('./partials/footer');

module.exports = function scoreView(state) {
  return `
    ${header()}
    ${userInfo(state.user)}
      <div class="spacedust"></div>
      <div class="content content-js">
        ${highscore(state.highscore)}
      </div>
    ${navigation()}
    ${footer()}
  `;
};
