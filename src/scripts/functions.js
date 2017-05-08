// TODO: If generateMonsters is the only function
// that can be extracted from game.js, then move it back in.

/**
 * Render monsters and append them to gameContainer
 * at a random interval.
 * @param  {string} gameContainer The element that should contain monsters.
 */
export function generateMonsters(gameContainer) {
  const monsterDiv = document.createElement('div');
  monsterDiv.classList.add('monster');
  gameContainer.appendChild(monsterDiv);
  setTimeout(() => {
    generateMonsters(gameContainer);
  }, Math.round(2000 + (Math.random() * 2000)));
}
