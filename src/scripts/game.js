import { sendScore } from './socket';
import { debounce, removeInstructions, vh, vw } from './functions';

export default function initGame(gameContainer, user) {
  const jumpPower = 9,
    highSpan = document.querySelector('.highSpan-js'),
    gravity = 0.25,
    monsterClasses = ['one', 'two', 'three'], // Monster position and class
    scoreSpan = document.querySelector('.scoreSpan-js');

  let isActive = true,
    width = gameContainer.getBoundingClientRect().width;

/* -----------------------------------------------------------------------------
  PLAYER
------------------------------------------------------------------------------*/

  const player = {
    element: document.querySelector('.player-js'),
    width: ((width > 1024) ? 175 : 100),
    x: (width * 0.80) * -1, // x = game plan's width * left 20 %
    y: 0
  };

  // Once new game has started, show Laika
  player.element.style.opacity = '1';

/* -----------------------------------------------------------------------------
  MONSTER
------------------------------------------------------------------------------*/

  /**
   * Get a random monster type on respawn.
   * @param  {array} listOfClasses An array with different type of monster looks.
   * @return {string}               A random class to change monster appearence.
   */
  function randomType(listOfClasses) {
    const randomClass = listOfClasses[Math.floor(Math.random() * listOfClasses.length)];

    return randomClass;
  }

  const monster = {
    element: document.createElement('div'),
    height: ((width > 1024) ? 75 : 50),
    width: ((width > 1024) ? 75 : 50),
    type: randomType(monsterClasses),
    x: width,
    y: 0
  };

  gameContainer.appendChild(monster.element);

/* -----------------------------------------------------------------------------
  TEMPORARY VARIABLES (UPDATED FREQUENTLY DURING GAME)
------------------------------------------------------------------------------*/

  let isJumping = false,
    instructionsShown = false,
    highest = user.highscore, // Retrieved from database
    laikaSpeed = 1000,
    monsterSpeed = 2000,
    spawnTime,
    score = 0,
    takeoff;

/* -----------------------------------------------------------------------------
  GENERAL GAME FUNCTIONS
------------------------------------------------------------------------------*/

  /**
   * Moves monster from left to right,
   * and add a new random class to it
   */
  function respawn() {
    monster.element.classList.remove(monster.type);
    monster.type = randomType(monsterClasses);
    monster.element.classList.add('monster');
    monster.element.classList.add(monster.type);
    monster.x = width;
    monster.y = 0;
    spawnTime = Date.now();
  }

  /**
   * Sets 'isJumping' to true,
   * and save current time as 'takeoff'
   */
  function jump() {
    if (isJumping) {
      return;
    }

    isJumping = true;
    takeoff = Date.now();
  }

  /**
   * When player collides with monster,
   * game starts over
   */
  function collision() {
    player.element.classList.add('damage');
    setTimeout(() => player.element.classList.remove('damage'), 500);
    laikaSpeed = 1000;
    monsterSpeed = 2000; // Reset monster speed since game is starting over
    score = 0;
    scoreSpan.innerText = score;
    respawn();
  }

/* -----------------------------------------------------------------------------
  ON FRAME
------------------------------------------------------------------------------*/

  /**
   * Move game forward on frame, using 'requestAnimationFrame'.
   * If monster reaches left side of screen,
   * points will be given to player.
   */
  function onframe() {
    if (!isActive) {
      return;
    }

    requestAnimationFrame(onframe);

    const monsterLifeSpan = (Date.now() - spawnTime) / monsterSpeed;

    /** Creates a new monster if player
     * managed to avoid the current one
     */
    if (monsterLifeSpan >= 1) {
      respawn();

      /** Makes Laika and monsters go faster
       * as user gets more points
       */
      laikaSpeed -= 25;
      monsterSpeed -= 50;

      score += 1;
      scoreSpan.innerText = score;

      if (score > highest) {
        highest = score;
        highSpan.innerText = highest;
        sendScore(user, highest); // Notifies server about new highscore
      }
    } else {
      monster.x = ((width + monster.width) * monsterLifeSpan) * -1;

      /** if player and monster are on the same spot at the same time,
       * collision will happen.
       */
      if (
        (monster.x < player.x) &&
        (monster.x > (player.x - player.width)) &&
        ((player.y * -1) < monster.height)) {
        collision();
      }
    }

    /**
    * Moves player and adds/removes CSS class 'onJump'
    * as player hit jump
    */
    if (isJumping) {
      const airtime = 60 * ((Date.now() - takeoff) / laikaSpeed),
        offset = Math.floor((airtime * jumpPower) - (0.5 * (airtime * airtime) * gravity));

      player.element.classList.add('onJump');

      if (offset <= 0) {
        isJumping = false;
        player.y = 0;
        player.element.classList.remove('onJump');
      } else {
        player.y = offset * -1;
      }
    }

    monster.element.style.transform = `translate(${monster.x}px, ${monster.y}px)`;
    player.element.style.transform = `translate(${player.x}px, ${player.y}px)`;
  }

/* -----------------------------------------------------------------------------
  EVENT LISTENERS
------------------------------------------------------------------------------*/

  // Makes the player jump by hitting 'space' or 'up arrow'
  document.addEventListener('keydown', (e) => {
    if (!isActive) {
      return;
    }
    if ((e.keyCode === 32 || e.keyCode === 38)) {
      e.preventDefault();

      // Only trigger jump when not jumping
      if (!isJumping) {
        jump();
      }

      if (!instructionsShown) {
        removeInstructions();
        instructionsShown = true;
      }
    }
  });

  // Makes the player jump by touch
  document.addEventListener('touchstart', () => {
    if (!isActive) {
      return;
    }
    if (!isJumping) { jump(); }

    if (!instructionsShown) {
      removeInstructions();
      instructionsShown = true;
    }
  });

  /**
   * Place monster and hide instructions once game is started
   */
  function start() {
    isActive = true;
    respawn();
    onframe();
  }

  /**
   * Once called, game and score counting stops
   */
  function stop() {
    isActive = false;
    score = 0;
    scoreSpan.innerText = score;
  }

  /** Returns a function that will get the current width and height of the game container.
   * The function will not be triggered as long as it continues to be invoked.
   * The function will be called after it stops being called for
   * 250 milliseconds.
   */
  window.addEventListener('resize', debounce(() => {
    width = gameContainer.getBoundingClientRect().width;

    // Only start game if in landscape mode
    if ((vw() / vh()) > 1) {
      start();
    } else {
      stop();
    }

    player.x = (width * 0.80) * -1;
  }, 250));

/* -----------------------------------------------------------------------------
  START AND RETURN
------------------------------------------------------------------------------*/

  // Only start game if in landscape mode
  if ((vw() / vh()) > 1) {
    start();
  }

  return { stop };
}
