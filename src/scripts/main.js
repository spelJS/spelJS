import { updateURL } from './functions';
import initGame from './game';
import router from './router';

const gameContainer = document.querySelector('.gameContainer-js'),
  dynamicContainer = document.querySelector('.content-js'),
  scoreContainer = document.querySelector('.highscoreContainer-js');

// Updates URL and initialize game when user logs in
if (gameContainer) {
  updateURL(window.location.href);
  fetch('/getuser', { credentials: 'include', headers: { accept: 'application/json' } })
    .then(body => body.json())
    .then((user) => {
      const game = initGame(gameContainer, user);
      router(dynamicContainer, user, game);
    })
    .catch(err => console.error(err));
}

// Fetch highscores from database when user is visiting highscore page
if (scoreContainer) {
  fetch('/getscore', { credentials: 'include', headers: { accept: 'application/json' } })
  .then(body => body.json())
    .then((highscores) => {
      router(dynamicContainer, highscores, null);
    })
    .catch(err => console.error(err));
}
