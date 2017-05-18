import initGame from './game';
import highScoreContainer from '../server/views/partials/highscore';
import gameContainer from '../server/views/partials/game-container';
import { removeInstructions } from './functions';

export default function router(container, data, game) {
  const playGame = document.querySelector('.play-js');
  const viewHighscore = document.querySelector('.highscore-js');
  let currentGame = game;

  return new Promise((resolve, reject) => {
    if (playGame && viewHighscore) {
      playGame.addEventListener('click', (e) => {
        e.preventDefault();

        if (window.location.pathname === '/play') {
          return;
        }

        history.pushState(null, null, '/play');
        container.innerHTML = gameContainer(data.highscore);
        currentGame = initGame(container.firstElementChild, data);
        resolve();
      });

      viewHighscore.addEventListener('click', (e) => {
        currentGame.stop();
        removeInstructions();
        e.preventDefault();
        history.pushState(null, null, '/highscore');

        fetch('/getscore', { credentials: 'include', headers: { accept: 'application/json' } })
        .then(body => body.json())
          .then((highscores) => {
            container.innerHTML = highScoreContainer(highscores);
          })
          .catch(err => console.error(err));

        resolve();
      });
    } else {
      reject();
    }
  });
}
