export const socket = io();

/**
 * Send information about new high score and user id to server.
 * @param  {number} score The new high score.
 */
export function sendScore(score) {
  fetch('/user', { credentials: 'include', headers: { accept: 'application/json' } })
    .then(body => body.json())
    .then((user) => {
      socket.emit('on-highscore', { id: user.id, highscore: score });
    })
    .catch(err => console.error(err));
}


// fetch('/user', { credentials: 'include', headers: { accept: 'application/json' }})
//   .then(body => body.json())
//   .then((user) => {
//     socket.on('new-highscore', () => console.log('There is a new highscore'));
//
//     setTimeout(function () {
//       socket.emit('on-highscore', { id: user.id, highscore: 123 });
//     }, 5000);
//   })
//   .catch(err => console.error(err));
