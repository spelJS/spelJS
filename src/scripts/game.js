export default function initGame() {
  // Game Variables
  var frame = 0,
    time = 0,
    gravity = 0.275,
    jumpPower = 10,
    playerTop = 158,
    player = document.querySelector('.player'),
    playerX = parseInt(player.offsetLeft, 10),
    movY = 0,
    scoreSpan = document.querySelector('.scoreSpan'),
    score = 0,
    pos = ['0', '0', '-56px', '-56px', '-112px', '-112px', '-56px', '-56px'],
    gameContainer = document.querySelector('.gameContainer-js');
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
      if (posX < 0) {
        item.remove();
        score += 1;
      }
      if (((posX - playerX) < 56) && ((posX - playerX) > -25) && (movY < 50)) {
        scoreSpan.textContent = 0;
        score = 0;
        item.remove();
      }
    });
  }
  document.addEventListener('keydown', function (e) {
    e.preventDefault();
    // Player jumps if 'space' or 'up arrow' is pressed
    if ((e.keyCode === 32 || e.keyCode === 38) && time === 0) {
      jump();
    }
  });
  function generateMonsters() {
    const monsterDiv = document.createElement('div');
    monsterDiv.setAttribute('class', 'monster');
    gameContainer.appendChild(monsterDiv);
    setTimeout(function () {
      generateMonsters();
    }, Math.round(2000 + (Math.random() * 2000)));
  }
  generateMonsters();
  render();
}
