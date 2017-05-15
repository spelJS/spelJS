import { sendScore } from './socket';

export default function initGame(gameContainer, user) {
  const highSpan = document.querySelector('.highSpan-js'),
    scoreSpan = document.querySelector('.scoreSpan-js'),
    gameInstructions = document.querySelector('.gameInstructions-js'),

    // Size of the game plan
    { width, height } = gameContainer.getBoundingClientRect(),

    // Variables connected to player and jump. X = gameContainers width * left 5%
    player = { element: document.querySelector('.player-js'), x: (width * 0.80) * -1, y: 0 },
    jumpPower = 9,
    gravity = 0.275,

    // Monster position and class
    monsterClasses = ['one', 'two', 'three'],
    monster = {
      x: width,
      y: 0,
      type: randomType(monsterClasses),
      element: document.createElement('div'),
      width: 50,
      height: 50
    };

  // Updated frequently when game is active.
  let isActive = true,
    isJumping = false,
    takeoff,
    spawnTime,
    score = 0,
    highest = user.highscore;

  /**
   * Displays spacedust and fades out the game instructions when the game is started
   */
  function showAndHide() {
    gameInstructions.classList.add('fadeOut');
  }

  /**
   * Get a random monster type on respawn.
   * @param  {array} listOfClasses An array with different type of monster looks.
   * @return {string}               A random class to change monster appearence.
   */
  function randomType(listOfClasses) {
    const randomClass = listOfClasses[Math.floor(Math.random() * listOfClasses.length)];

    return randomClass;
  }

  /**
   * Move monster from left to right, and add a new random class to it.
   */
  function respawn() {
    monster.x = width;
    monster.y = 0;
    monster.element.classList.remove(monster.type);
    monster.type = randomType(monsterClasses);
    monster.element.classList.add(monster.type, 'monster');
    gameContainer.appendChild(monster.element);
    spawnTime = Date.now();
  }

  /**
   * Set 'isJumping' to true, and save current time as 'takeoff'.
   */
  function jump() {
    if (isJumping) { return; }
    isJumping = true;
    player.element.style.animation = 'none';
    takeoff = Date.now();
  }

  function removeDamage() {
    player.element.classList.remove('damage');
  }

  function collision() {
    player.element.classList.add('damage');
    setTimeout(removeDamage, 500);
    score = 0;
    scoreSpan.textContent = score;
    respawn();
  }

  /**
   * Move game forward on frame, using 'requestAnimationFrame'. If monster reaches
   * left side of screen, points will be given to player.
   * @return {[type]} [description]
   */
  function onframe() {
    requestAnimationFrame(onframe);

    const monsterLifeSpan = (Date.now() - spawnTime) / 2000;

    if (monsterLifeSpan >= 1) {
      respawn();

      // Update score
      score += 1;
      scoreSpan.textContent = score;

      // Display new High Score
      if (score > highest) {
        highSpan.textContent = score;
        highest = score;
        sendScore(user, highest); // Notify server about new highscore
      }
    } else {
      monster.x = ((width + monster.width) * monsterLifeSpan) * -1;
      if (monster.x < ((width * 0.80) * -1) && ((player.y * -1) < monster.height)) {
        collision();
      }
    }

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

  function start() {
    respawn();
    onframe();
    showAndHide();
  }

  start();

  return {
    stop() {
      isActive = false;
    }
  };
}
