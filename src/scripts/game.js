import { sendScore } from './socket';

export default function initGame(gameContainer) {
  sendScore(10);

  const highSpan = document.querySelector('.highSpan-js'),
    scoreSpan = document.querySelector('.scoreSpan-js'),
    player = document.querySelector('.player-js'),
    jumpPower = 10,
    gravity = 0.275,
    playerTop = 158,
    playerX = parseInt(player.offsetLeft, 10),
    pos = ['0', '0', '-56px', '-56px', '-112px', '-112px', '-56px', '-56px'];

  let frame = 0,
    time = 0,
    movY = 0,
    score = 0,
    highest = 0;

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
      if (((posX - playerX) < 56) && ((posX - playerX) > -25) && (movY < 50)) {
        scoreSpan.textContent = 0;
        score = 0;
        item.remove();
      }

      // Display High Score
      if (score > highest) {
        highSpan.textContent = score;
        highest = score;
      }
    });
  }

  // Player jumps if 'space' or 'up arrow' is pressed
  document.addEventListener('keydown', function (e) {
    if ((e.keyCode === 32 || e.keyCode === 38) && time === 0) {
      e.preventDefault();
      jump();
    }
  });

  function generateMonsters() {
    const monsterDiv = document.createElement('div');
    monsterDiv.classList.add('monster');
    gameContainer.appendChild(monsterDiv);
    setTimeout(function () {
      generateMonsters();
    }, Math.round(2000 + (Math.random() * 2000)));
  }

  generateMonsters();
  render();
}
