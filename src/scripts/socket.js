export const socket = io();

export function updateHighscore(score) {
  // socket.on('new highscore', console.log(`There is a new highscore: ${score}`));
}

// io.on('connection', function (socket) {
//   socket.on('on-highscore', (data) => {
//     updateUser(data.id, { highscore: data.highscore }).then(() => {
//       socket.broadcast.emit('new-highscore', data); // Send message to everyone BUT sender
//     });
//   });
// });

fetch('/user', { credentials: 'include', headers: { accept: 'application/json' }})
  .then(body => body.json())
  .then((user) => {
    socket.on('new-highscore', () => console.log('There is a new highscore'));

    setTimeout(function () {
      socket.emit('on-highscore', { id: user.id, highscore: 123 });
    }, 5000);
  })
  .catch(err => console.error(err));
