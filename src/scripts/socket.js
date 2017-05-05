export const socket = io();

/**
 * Send information about new high score and user id to server.
 * @param  {number} score The new high score.
 */
export function sendScore(score) {
  // TODO: Move this to main.js, and make sendScore take user as argument.
  fetch('/user', { credentials: 'include', headers: { accept: 'application/json' } })
    .then(body => body.json())
    .then((user) => {
      socket.emit('on-highscore', { id: user.id, highscore: score });
    })
    .catch(err => console.error(err));
}
