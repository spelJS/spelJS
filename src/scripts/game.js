export default function initGame() {
  // Game Variables
  var frame = 0,
    time = 0,
    gravity = 0.3,
    jumpPower = 9,
    playerTop = 158,
    player = document.querySelector('.player'),
    playerX = parseInt({ left: player.offsetLeft, top: player.offsetTop }, 10),
    movY = 0,
    scoreSpan = document.querySelector('.scoreSpan'),
    score = 0,
    pos = ['0', '0', '-56px', '-56px', '-112px', '-112px', '-56px', '-56px'],
    monsters = document.querySelectorAll('.monster');

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
    // Removes the monster and gives a score (Obs! Funkar inte ännu)
    for (var i = 0; i < monsters.length; i++) {
      var posX = monsters[i].position().left;
      if (posX < 10) {
        monsters[i].remove();
        score += 1;
        scoreSpan.textContent = score;
        return;
      }
      // If the player collides with a monster (OBS! funkar inte ännu)
      if (posX - playerX < 56 && posX - playerX > -25 && movY < 50) {
        scoreSpan.textContent = '0';
        score = 0;
      }
    }
  }
  document.addEventListener('keydown', function (e) {
    e.preventDefault();
    // Player jumps if 'space' or 'up arrow' is pressed
    if ((e.keyCode === 32 || e.keyCode === 38) && time === 0) {
      jump();
    }
  });
  function generateMonsters() {
    var monsterDiv = document.createElement('div');
    monsterDiv.setAttribute('class', 'monster');
    document.body.appendChild(monsterDiv);
    setTimeout(function () {
      generateMonsters();
    }, Math.round(1000 + (Math.random() * 1500)));
  }
  render();
  generateMonsters();
}
