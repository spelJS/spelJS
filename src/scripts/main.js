import initGame from './game';
import { connect } from './socket';

// Connect to the websocket server
connect();

// Start game
// TODO: First check if user is logged in
initGame();
