// TODO: If generateMonsters is the only function
// that can be extracted from game.js, then move it back in.

/**
 * Replace Facebook's return URL with '#play' when logging in.
 * @param  {string} hash The current URL.
 */
export function updateURL(hash) {
  if (hash && hash === '#_=_') {
    window.location.hash = 'play';
  }
}

/**
 * Render monsters and append them to gameContainer
 * at a random interval.
 * @param  {string} gameContainer The element that should contain monsters.
 */
export function generateMonsters(gameContainer) {
  const monsterDiv = document.createElement('div'),
    monsterClasses = ['one', 'two', 'three'],
    randomClass = monsterClasses[Math.floor(Math.random() * monsterClasses.length)];
  monsterDiv.classList.add('monster');
  monsterDiv.classList.add(randomClass);
  gameContainer.appendChild(monsterDiv);
  setTimeout(() => {
    generateMonsters(gameContainer);
  }, Math.round(2000 + (Math.random() * 2000)));
}
