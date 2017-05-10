import { sendScore } from './socket';
import { generateMonsters } from './functions';

export default function initGame(gameContainer, user) {
  const highSpan = document.querySelector('.highSpan-js'),
    scoreSpan = document.querySelector('.scoreSpan-js'),
    player = document.querySelector('.player-js'),
    playerTop = player.offsetTop,
    playerX = player.offsetLeft,
    jumpPower = 9,
    gravity = 0.275,
    spacedust = document.querySelector('.spacedust'),
    gameInstructions = document.querySelector('.gameInstructions');

  // Updated frequently when game is active.
  let frame = 0,
    time = 0,
    playerJumpY = 0,
    score = 0,
    highest = user.highscore;

  /**
   * Displays spacedust and hides game instructions when the game begins
   */
  function addClasses() {
    spacedust.classList.add('show');
    gameInstructions.classList.add('fadeOut');
  }

  addClasses();

  /**
   * Gets called when user wants to jump to avoid enemies.
   */
  function jump() {
    time += 1;
    playerJumpY = Math.floor((time * jumpPower) - (0.5 * Math.pow(time, 2) * gravity));

    if (playerJumpY < 0) {
      playerJumpY = 0;
    }

    player.style.top = (playerTop - playerJumpY) + 'px';
    if (playerJumpY === 0) {
      time = 0;
    } else {
      requestAnimationFrame(jump);
    }
  }

  function removeDamage() {
    document.querySelector('.player').classList.remove('damage');
  }

  // FIXME: make sure that this contain as little code and calculations as
  // possible, since all of it get calculated/rendered 60 times a second.
  function render() {
    requestAnimationFrame(render);
    frame = (frame + 1) % 8;
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
      if (((posX - playerX) < 168) && ((posX - playerX) > -25) && (playerJumpY < 50)) {
        scoreSpan.textContent = 0;
        score = 0;
        item.remove();
        document.querySelector('.player').classList.add('damage');
        setTimeout(removeDamage, 150);
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
