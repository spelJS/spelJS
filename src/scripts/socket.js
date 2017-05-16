export const socket = io();

/**
 * Send information about new high score and user id to server.
 * @param  {object}   user    The current user
 * @param  {number}   score   The new high score.
 */
export function sendScore(user, score) {
  socket.emit('on-highscore', { id: user.id, name: user.name, highscore: score });
}
