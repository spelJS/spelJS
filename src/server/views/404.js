const header = require('./partials/header');
const footer = require('./partials/footer');

module.exports = function notFound(req) {
  return `
    ${header()}
      <h1 class="headline">The page you are looking for is not found</h1>
    ${footer(req)}
  `;
};
