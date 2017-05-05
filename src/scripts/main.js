import initGame from './game';
import { socket } from './socket';

const gameContainer = document.querySelector('.gameContainer-js');

// Initialize game if gameContainer exists.
if (gameContainer) {
  initGame(gameContainer);
}

socket.on('new-highscore', (data) => {
  console.log('There was a new highscore');
});
