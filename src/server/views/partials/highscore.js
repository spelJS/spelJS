module.exports = function highscore(highscore) {
  return `
  <div class="highscoreContainer highscoreContainer-js">
    <h2 class="headline headline--highscore">All Time High</h2>
    <ol class="highscore__list">
      ${highscore.map(score => `
        <li class="highscore__list-item">
          <span class="list-content">${score.name}
            <span class="points">${score.highscore} P</span>
          </span>
        </li>
      `).join('')}
    </ol>
  </div>
  `;
};
