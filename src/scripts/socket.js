export function connect() {
  const socket = io();
  // Every time count is changed, the number is logged.
  socket.on('count', count => console.log(count));
}
