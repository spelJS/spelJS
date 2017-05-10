const highScoreContainer = require('../server/views/partials/highscore');
// const gameContainer = require('../server/views/partials/game-container');

export default function updateContent(element, container) {
  const link = document.querySelector(element);
  if (link) {
    link.addEventListener('click', (e) => {
      e.preventDefault();

      if (element === '.play-js') {
        history.pushState(null, null, '/#play');
        container.innerHTML = '<h1>Play Game</h1>';
      } else if (element === '.highscore-js') {
        history.pushState(null, null, '/highscore');
        container.innerHTML = `${highScoreContainer()}`;
      }
    });
  }
}
