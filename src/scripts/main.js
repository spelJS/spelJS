import { updateURL } from './functions';
import initGame from './game';
import { listenOnHighscore } from './socket';

const gameContainer = document.querySelector('.gameContainer-js');

// Initialize game if gameContainer exists.
if (gameContainer) {
  updateURL(window.location.hash)
    .then(
      fetch('/user', { credentials: 'include', headers: { accept: 'application/json' } })
      .then(body => body.json())
      .then((user) => {
        initGame(gameContainer, user);
      })
    )
  .catch(err => console.error(err));
}

listenOnHighscore();
