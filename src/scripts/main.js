import { updateURL } from './functions';
import updateContent from './router';
import initGame from './game';
import { listenOnHighscore } from './socket';

const content = document.querySelector('.content-js');
const gameContainer = document.querySelector('.gameContainer-js');

// Updated URL and initialize game when user is logged in
if (gameContainer) {
  updateURL(window.location.hash);
  fetch('/user', { credentials: 'include', headers: { accept: 'application/json' } })
    .then(body => body.json())
    .then((user) => {
      initGame(gameContainer, user);
    })
    .catch(err => console.error(err));
}

listenOnHighscore();

updateContent(content);
