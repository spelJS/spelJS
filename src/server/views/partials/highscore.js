module.exports = function highscore(highscore) {
  const showTopList = highscore;

  while (highscore.length < 3) {
    showTopList.push(null);
  }

  return `
  <div class="highscoreContainer highscoreContainer-js">
    <h2 class="headline">All Time High</h2>
    <ol class="highscore__list">
      ${highscore.map(score => `
        <li class="highscore__list-item">
          ${score ? `
              ${score.name}
              <span class="points">${score.highscore} P</span>
            ` : ''}
        </li>
      `).join('')}
    </ol>
  </div>
  `;
};
