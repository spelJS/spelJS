import { updateURL } from './functions';
import router from './router';
import initGame from './game';
import { listenOnHighscore } from './socket';

const content = document.querySelector('.content-js');
const gameContainer = document.querySelector('.gameContainer-js');

// Updated URL and initialize game when user is logged in
if (gameContainer) {
  updateURL(window.location.href);
  fetch('/user', { credentials: 'include', headers: { accept: 'application/json' } })
    .then(body => body.json())
    .then((user) => {
      const game = initGame(gameContainer, user);
      router(content, user, game);
    })
    .catch(err => console.error(err));
}

listenOnHighscore();
