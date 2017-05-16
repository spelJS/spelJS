import { updateURL } from './functions';
import router from './router';
import initGame from './game';

const dynamicContainer = document.querySelector('.content-js');
const gameContainer = document.querySelector('.gameContainer-js');
const scoreContainer = document.querySelector('.highscoreContainer-js');

// Updated URL and initialize game when user is logged in
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

if (scoreContainer) {
  fetch('/getscore', { credentials: 'include', headers: { accept: 'application/json' } })
  .then(body => body.json())
    .then((highscores) => {
      router(dynamicContainer, highscores, null);
    })
    .catch(err => console.error(err));
}
