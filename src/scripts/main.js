import { updateURL, spaceDust } from './functions';
import router from './router';
import initGame from './game';
import { listenOnHighscore } from './socket';

const content = document.querySelector('.content-js');
const gameContainer = document.querySelector('.gameContainer-js');
const scoreContainer = document.querySelector('.highscoreContainer-js');

// Updated URL and initialize game when user is logged in
if (gameContainer) {
  updateURL(window.location.href);
  fetch('/getuser', { credentials: 'include', headers: { accept: 'application/json' } })
    .then(body => body.json())
    .then((user) => {
      const game = initGame(gameContainer, user);
      router(content, user, game);
    })
    .then(() => spaceDust())
    .catch(err => console.error(err));
}

if (scoreContainer) {
  fetch('/getscore', { credentials: 'include', headers: { accept: 'application/json' } })
  .then(body => body.json())
    .then((user) => {
      console.log(user);
    })
    .catch(err => console.error(err));
}


listenOnHighscore();
