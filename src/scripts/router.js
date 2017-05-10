import initGame from './game';

const highScoreContainer = require('../server/views/partials/highscore');
const gameContainer = require('../server/views/partials/game-container');

// TODO: Figure out what to do with this. Also, sort out event listeners on links.

// export function setup(container) {
//   const routes = {};
//
//   document.addEventListener('click', event => {
//     if (typeof event.target.dataset.route !== 'undefined') {
//       const href = event.target.href;
//
//       history.pushState(null, null, href);
//
//       if (routes[href]) {
//         container.innerHTML = routes[href]();
//       }
//
//       event.preventDefault();
//     }
//   });
//
//   return {
//     on(route, callback) {
//       routes[route] = callback;
//     }
//   };
// }
//
// const router = setup(document.querySelector('.js-container'));
//
// router.on('/play', () => '<h1 class="headline">Play game!</h1>');

export default function router(container, user, game) {
  const playGame = document.querySelector('.play-js');
  const viewHighscore = document.querySelector('.highscore-js');
  let currentGame = game;

  return new Promise((resolve, reject) => {
    if (playGame && viewHighscore) {
      playGame.addEventListener('click', (e) => {
        e.preventDefault();
        history.pushState(null, null, '/play');
        container.innerHTML = gameContainer(user.highscore);
        currentGame = initGame(container.firstElementChild, user);
        resolve();
      });

      viewHighscore.addEventListener('click', (e) => {
        currentGame.stop();
        e.preventDefault();
        history.pushState(null, null, '/highscore');
        container.innerHTML = `${highScoreContainer()}`;
        resolve();
      });
    } else {
      reject();
    }
  });
}
