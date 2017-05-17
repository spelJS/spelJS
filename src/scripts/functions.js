/**
 * Remove weird URL ending added by Facebook.
 * @param  {string} hash The current URL.
 */
// TODO: Before publishing, this needs to be updated!
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
