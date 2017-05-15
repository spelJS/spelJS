// TODO: Figure out if you need the request here.
module.exports = function highscore(highscores) {
  return `
  <div class="highscoreContainer highscoreContainer-js">
    <h2 class="headline headline--highscore">All Time High</h2>
    <ol class="highscore__list">
      ${highscores}
    </ol>
  </div>
  `;
};
