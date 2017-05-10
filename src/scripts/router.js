const highScoreContainer = require('../server/views/partials/highscore');

export default function updateContent(container) {
  const playGame = document.querySelector('.play-js');
  const viewHighscore = document.querySelector('.highscore-js');

  return new Promise((resolve, reject) => {
    if (playGame && viewHighscore) {
      playGame.addEventListener('click', (e) => {
        e.preventDefault();
        history.pushState(null, null, '/#play');
        container.innerHTML = '<h1 class="headline">Play game!</h1>';
        resolve();
      });

      viewHighscore.addEventListener('click', (e) => {
        e.preventDefault();
        history.pushState(null, null, '/highscore');
        container.innerHTML = `${highScoreContainer()}`;
        resolve();
      });
    } else {
      reject(console.log('Oops, something went wrong!'));
    }
  });
}
