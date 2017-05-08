import { sendScore } from './socket';
import { generateMonsters } from './functions';

export default function initGame(gameContainer, user) {
  const highSpan = document.querySelector('.highSpan-js'),
    scoreSpan = document.querySelector('.scoreSpan-js'),
    player = document.querySelector('.player-js'),
    playerTop = 158,
    playerX = parseInt(player.offsetLeft, 10),
    jumpPower = 9,
    gravity = 0.4,
    pos = ['0', '0', '-168px', '-168px', '-112px', '-112px', '-168px', '-168px'];

  // Updated frequently when game is active.
  let frame = 0,
    time = 0,
    movY = 0,
    score = 0,
    highest = user.highscore;

  /**
   * Gets called when user wants to jump to avoid enemies.
   */

  function jump() {
    time += 1;
    movY = Math.floor((time * jumpPower) - (0.5 * Math.pow(time, 2) * gravity));

    if (movY < 0) {
      movY = 0;
    }

    player.style.top = (playerTop - movY) + 'px';
    if (movY === 0) {
      time = 0;
    } else {
      requestAnimationFrame(jump);
    }
  }

  // FIXME: make sure that this contain as little code and calculations as
  // possible, since all of it get calculated/rendered 60 times a second.
  function render() {
    requestAnimationFrame(render);
    frame = (frame + 1) % 8;
    player.style.backgroundPosition = pos[frame];
    scoreSpan.textContent = score;
    $('.monster').each(function (i) {
      var item = $(this);
      var posX = item.position().left;

      // If the enemy leaves the stage without colliding with the player
      if (posX < 0) {
        item.remove();
        score += 1;
      }

      // If the player collides with the enemy
      if (((posX - playerX) < 168) && ((posX - playerX) > -25) && (movY < 50)) {
        scoreSpan.textContent = 0;
        score = 0;
        item.remove();
      }

      // Display High Score
      if (score > highest) {
        highSpan.textContent = score;
        highest = score;
        sendScore(user, highest); // Send information about score and user to server
      }
    });
  }

  function removeOnJump() {
    document.querySelector('.laika').classList.remove('onJump');
  }

  // Make player jump by hitting 'space' or 'up arrow'
  document.addEventListener('keydown', function (e) {
    if ((e.keyCode === 32 || e.keyCode === 38) && time === 0) {
      e.preventDefault();
      jump();
      document.querySelector('.laika').classList.add('onJump');
      setTimeout(removeOnJump, 700);
    }
  });

  // TODO: Remove monsters when they are no longer visible
  generateMonsters(gameContainer);
  render();
}
