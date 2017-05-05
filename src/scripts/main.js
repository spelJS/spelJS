import initGame from './game';

const gameContainer = document.querySelector('.gameContainer-js');

// Initialize game if gameContainer exists.
if (gameContainer) {
  initGame(gameContainer);
}
