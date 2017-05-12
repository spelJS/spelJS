import { moveSpacedust } from './animations';

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

export function spaceDust() {
  return new Promise((resolve, reject) => {
    const spacedust = document.querySelector('.spacedust');
    if (spacedust) {
      spacedust.classList.add('show');
      moveSpacedust(spacedust);
      resolve();
    } else {
      reject();
    }
  });
}
