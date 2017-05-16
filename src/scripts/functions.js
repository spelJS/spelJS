/**
 * Remove weird URL ending added by Facebook.
 * @param  {string} hash The current URL.
 */
// TODO: Before publishing, this needs to be updated!
export function updateURL(href) {
  if (href === 'http://localhost:3000/play#_=_') {
    history.pushState(null, null, '/play');
  }
}
