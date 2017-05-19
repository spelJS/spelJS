/**
 * Removes weird URL ending added by Facebook.
 * @param  {string} href  The current URL.
 */
export function updateURL(href) {
  if (href === 'https://laikas-space-adventure.herokuapp.com/play#_=_') {
    history.pushState(null, null, '/play');
  }
}

/**
* Ensures that given function only executes once during a given interval.
* @param  {function} fn      Give any function to debounce
* @param  {number}   time    The given interval (defaults to 200ms)
* @return {function}         Debounced function.
*/
export function debounce(fn, time = 200) {
  let timeout;

  return function (...args) {
    clearTimeout(timeout);
    timeout = setTimeout(() => {
      fn.apply(this, args);
    }, time);
  };
}

/**
 * Removes game instructions once user has pressed game keys
 */
export function removeInstructions() {
  const gameInstructions = document.querySelector('.gameInstructions-js');

  if (gameInstructions) {
    if (!gameInstructions.classList.contains('fadeOut')) {
      gameInstructions.classList.add('fadeOut');
      addEventListener('animationend', () => {
        gameInstructions.remove();
      });
    }
  }
}

/**
 * Get viewport width
 * @return {Number}
 */
export function vw() {
  return Math.max(document.documentElement.clientWidth, window.innerWidth || 0);
}

/**
 * Get viewport height
 * @return {Number}
 */
export function vh() {
  return Math.max(document.documentElement.clientHeight, window.innerHeight || 0);
}
