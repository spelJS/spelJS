export const socket = io();

export function connect() {
  // Every time count is changed, the number is logged.
  // socket.on('count', count => console.log(count));
}

export function updateHighscore(score) {
  // socket.on('new highscore', console.log(`There is a new highscore: ${score}`));
}

fetch('/user', { credentials: 'include', headers: { accept: 'application/json' }})
  .then(body => body.json())
  .then((user) => {
    socket.on('new-highscore', () => console.log('There is a new highscore'));

    setTimeout(function () {
      socket.emit('on-highscore', { id: user.id, highscore: 123 });
    }, 5000);
  })
  .catch(err => console.error(err));
