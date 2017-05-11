// TODO: Figure out if you need the request here.
module.exports = function highscore(highscores) {
  return `
  <div class="highscoreContainer highscoreContainer-js">
    <h2 class="headline headline--highscore">All Time High</h2>
    <ol>
      <li>${highscores[0].name} – ${highscores[0].highscore} points</li>
      <li>${highscores[1].name} – ${highscores[1].highscore} points</li>
    </ol>
  </div>
  `;
};
