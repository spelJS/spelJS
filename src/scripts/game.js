import { sendScore } from './socket';
import { monsterHandler, fadeOutEffect } from './animations';

// TODO:
// 1. Check if monster is at the same place as player. If so, remove
// monsters and start over.

export default function initGame(gameContainer, user) {
  const highSpan = document.querySelector('.highSpan-js'),
    scoreSpan = document.querySelector('.scoreSpan-js'),
    player = document.querySelector('.player-js'),
    // FIXME: do we need both player and laika?
    laika = document.querySelector('.laika'),
    monsterClasses = ['one', 'two', 'three'],
    instructions = document.querySelector('.instructions-js'),
    playerTop = player.offsetTop,
    playerX = player.offsetLeft,
    jumpPower = 9,
    gravity = 0.275;

  // Updated frequently when game is active.
  let isActive = true,
    frame = 0,
    time = 0,
    playerJumpY = 0,
    score = 0,
    highest = user.highscore;

  /**
  * Fades out the game instructions after four seconds
  */
  setTimeout(() => fadeOutEffect(instructions), 4000);

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
    player.classList.remove('damage');
  }

  // FIXME: make sure that this contain as little code and calculations as
  // possible, since all of it get calculated/rendered 60 times a second.
  function render() {
    if (!isActive) {
      return;
    }

    requestAnimationFrame(render);
    frame = (frame + 1) % 8;

    // These are only used for testing purposes.
    const item = 'test';
    const posX = 2;

    // TODO: Replace this code with less demanding one
    // $('.monster').each(function (i) {
    //   var item = $(this);
    //   var posX = item.position().left; // FIXME: Stop reading from DOM

      // If the enemy leaves the stage without colliding with the player
      // if (posX < 0) {
      //   item.remove();
      //   score += 1;
      // }

      // If the player collides with the enemy
      if (((posX - playerX) < 168) && ((posX - playerX) > -25) && (playerJumpY < 50)) {
        scoreSpan.textContent = 0;
        score = 0;
        item.remove();
        player.classList.add('damage');
        setTimeout(removeDamage, 150);
      }

    // });
  }

  function removeOnJump() {
    laika.classList.remove('onJump');
  }

  // Make player jump by hitting 'space' or 'up arrow'
  document.addEventListener('keydown', function (e) {
    if (!isActive) {
      return;
    }

    if ((e.keyCode === 32 || e.keyCode === 38) && time === 0) {
      e.preventDefault();
      jump();
      laika.classList.add('onJump');
      setTimeout(removeOnJump, 700);
      // TODO: transition end
    }
  });

  /**
   * Render monsters and append them to gameContainer
   * at a random interval.
   * @param  {string} gameContainer The element that should contain monsters.
   */
  function generateMonsters(gameContainer) {
    if (!isActive) {
      return;
    }

    const monsterDiv = document.createElement('div'),
      randomClass = monsterClasses[Math.floor(Math.random() * monsterClasses.length)];

    monsterDiv.classList.add('monster', 'monster-js', randomClass);
    gameContainer.appendChild(monsterDiv);

    monsterHandler(monsterDiv)
      .then((giveScore) => {
        // gameContainer.removeChild(monsterDiv);

        // Update score if monster reached the other side
        // TODO: Right now, collision is not handled.
        if (giveScore) {
          score += 1;
          scoreSpan.textContent = score;
        }

        // Display new High Score
        if (score > highest) {
          highSpan.textContent = score;
          highest = score;
          sendScore(user, highest); // Notify server about new highscore
        }

        // Generate a new monster after 2–4 seconds
        setTimeout(() => {
          generateMonsters(gameContainer);
        }, Math.round(2000 + (Math.random() * 2000)));
      });
  }

  generateMonsters(gameContainer);
  render();

  return {
    stop() {
      isActive = false;
    }
  };
}
