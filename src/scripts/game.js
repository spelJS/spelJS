import { sendScore } from './socket';
import { debounce } from './functions';

export default function initGame(gameContainer, user) {
  const highSpan = document.querySelector('.highSpan-js'),
    scoreSpan = document.querySelector('.scoreSpan-js'),
    gameInstructions = document.querySelector('.gameInstructions-js'),
    rotateIconContainer = document.querySelector('.rotateIconContainer-js'),
    monsterClasses = ['one', 'two', 'three'], // Monster position and class
    jumpPower = 9,
    gravity = 0.25;

  // Width of Game Plan
  let width = gameContainer.getBoundingClientRect().width;

/* -----------------------------------------------------------------------------
  PLAYER
------------------------------------------------------------------------------*/

  const player = {
    element: document.querySelector('.player-js'),
    x: (width * 0.80) * -1, // x = game plan's width * left 20 %
    y: 0,
    width: ((width > 1024) ? 175 : 100)
  };

  // Once new game has started, show Laika
  player.element.style.opacity = '1';

/* -----------------------------------------------------------------------------
  MONSTERS
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

  // All the variables connected to monsters
  const monster = {
    x: width,
    y: 0,
    type: randomType(monsterClasses),
    element: document.createElement('div'),
    width: ((width > 1024) ? 75 : 50),
    height: ((width > 1024) ? 75 : 50)
  };

/* -----------------------------------------------------------------------------
  TEMPORARY VARIABLES (UPDATED FREQUENTLY)
------------------------------------------------------------------------------*/

  let isActive = true,
    isJumping = false,
    takeoff,
    spawnTime,
    monsterSpeed = 2000,
    score = 0,
    highest = user.highscore;

/* -----------------------------------------------------------------------------
  GENERAL GAME FUNCTIONS
------------------------------------------------------------------------------*/

  /**
   * Displays spacedust and fades out the game instructions when the game is started
   */
  function showAndHide() {
    gameInstructions.classList.add('fadeOut');
    rotateIconContainer.classList.add('fadeOut');
  }

  /**
   * Update container with new information about score
   * @param  {string} container The container to be updated
   * @param  {string} content   The new content of the container
   */
  function updateScore(container, content) {
    while (container.firstChild) {
      container.removeChild(container.firstChild);
    }

    const scoreInfo = document.createTextNode(content);
    container.appendChild(scoreInfo);
  }

  /**
   * Move monster from left to right, and add a new random class to it.
   */
  function respawn() {
    monster.x = width;
    monster.y = 0;
    monster.element.classList.remove(monster.type);
    monster.type = randomType(monsterClasses);
    monster.element.classList.add(monster.type);
    monster.element.classList.add('monster');
    gameContainer.appendChild(monster.element);
    spawnTime = Date.now();
  }

  /**
   * Set 'isJumping' to true, and save current time as 'takeoff'.
   */
  function jump() {
    if (isJumping) {
      return;
    }

    isJumping = true;
    player.element.style.animation = 'none';
    takeoff = Date.now();
  }

  /**
   * When player collides with monster, game starts over
   */
  function collision() {
    player.element.classList.add('damage');
    setTimeout(() => player.element.classList.remove('damage'), 500);
    score = 0;
    monsterSpeed = 2000; // Reset monster speed since game is starting over
    updateScore(scoreSpan, score);
    respawn();
  }

/* -----------------------------------------------------------------------------
  ON FRAME
------------------------------------------------------------------------------*/

  /**
   * Move game forward on frame, using 'requestAnimationFrame'. If monster reaches
   * left side of screen, points will be given to player.
   * @return {[type]} [description]
   */
  function onframe() {
    if (!isActive) {
      return;
    }

    requestAnimationFrame(onframe);

    const monsterLifeSpan = (Date.now() - spawnTime) / monsterSpeed;

    // Create a new monster if player managed to avoid the current one
    if (monsterLifeSpan >= 1) {
      respawn();

      // Make monster go randomly faster
      monsterSpeed -= (Math.floor(Math.random() * 250) + 10);

      score += 1;
      updateScore(scoreSpan, score);

      // Display new High Score
      if (score > highest) {
        highest = score;
        updateScore(highSpan, highest);
        sendScore(user, highest); // Notify server about new highscore
      }
    } else {
      monster.x = ((width + monster.width) * monsterLifeSpan) * -1;

      // if player and monster are on the same spot at the same time,
      // collision will happen.
      if (
        (monster.x < player.x) &&
        (monster.x > (player.x - player.width)) &&
        ((player.y * -1) < monster.height)) {
        collision();
      }
    }

    // Move player and and nice 'jump effect' when player jumps
    if (isJumping) {
      const airtime = 60 * ((Date.now() - takeoff) / 1000);
      const offset = Math.floor((airtime * jumpPower) - (0.5 * Math.pow(airtime, 2) * gravity));
      player.element.classList.add('onJump');

      if (offset <= 0) {
        player.y = 0;
        isJumping = false;
        player.element.classList.remove('onJump');
        player.element.style.animation = '';
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
      jump();
    }
  });

  // Makes the player jump by touch
  document.addEventListener('touchstart', () => {
    if (!isActive) {
      return;
    }
    jump();
  });

  /** Returns a function that will get the current width and height of the game container.
   * The function will not be triggered as long as it continues to be invoked.
   * The function will be called after it stops being called for
   * 250 milliseconds.
   */
  window.addEventListener('resize', debounce(() => {
    width = gameContainer.getBoundingClientRect().width;
    player.x = (width * 0.80) * -1;
  }, 250));

/* -----------------------------------------------------------------------------
  START AND RETURN
------------------------------------------------------------------------------*/

  /**
   * Place monster and hide instructions once game is started
   */
  function start() {
    respawn();
    onframe();
    showAndHide();
  }

  start();

  return {
    stop() {
      isActive = false;
      score = 0;
      updateScore(scoreSpan, score);
    }
  };
}
