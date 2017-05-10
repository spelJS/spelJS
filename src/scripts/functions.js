// TODO: If generateMonsters is the only function
// that can be extracted from game.js, then move it back in.

/**
 * Replace Facebook's return URL with '#play' when logging in.
 * @param  {string} hash The current URL.
 */
export function updateURL(hash) {
  if (hash && hash === '#_=_') {
    history.pushState(null, null, '/play');
  }
}
