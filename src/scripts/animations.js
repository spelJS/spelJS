// TODO: This file will not be needed once we have sorted out game.

/**
 * Moves the monster from right to left. If monster reaches the position -10
 * (outside screen on the left side), promise is resolved and giveScore will
 * be set to 'true'.
 * @param  {string} monsterDiv    Element created by the function generateMonsters
 * @return {bolean} giveScore     Is return true to give user score.
 */
export function monsterHandler(monsterDiv, player) {
  const elem = monsterDiv;
  let monsterPosX = 100;
  let giveScore = false;

  return new Promise((resolve, reject) => { // FIXME: What to do on reject?
    function removeDamage() {
      player.classList.remove('damage');
    }
    function frame() {
      // If the enemy leaves the stage without colliding with the player
      if (monsterPosX === -10) {
        giveScore = true;
        clearInterval();
        elem.remove();
        resolve(giveScore);
      } else {
        // Moves the monster from right to left.
        monsterPosX -= 1;
        elem.style.left = monsterPosX + '%';

        // TODO: Fix the score (should become 0)
        // TODO: Add a position-y condition like (playerJumpY < height_of_the_monster).

        // If the player collides with the enemy
        const monsterOffsetLeft = monsterDiv.offsetLeft;
        // collisionPoint = offsetLeft of the Player plus the width of the player
        const collisionPoint = player.offsetLeft + 168;
        if (monsterOffsetLeft < collisionPoint) {
          player.classList.add('damage');
          setTimeout(removeDamage, 150);
          elem.remove();
        }
      }
    }
    setInterval(frame, 8);
  });
}

/**
  * Moves spacedust from left to right
  * @param  {string} spacedust A div element with background-image "stardust.png".
  * Located in src/server/views/partials/header.js
  */
// export function moveSpacedust(spacedust) {
//   const elem = spacedust;
//   let spacedustPos = 100;
//   function frame() {
//     if (spacedustPos === -200) {
//       spacedustPos = 100;
//     } else {
//       spacedustPos -= 1;
//       elem.style.left = spacedustPos + 'vw';
//     }
//   }
//   setInterval(frame, 15);
// }
// TODO: Change this to a CSS animation

/**
  * Fades out given elements
  * @param  {string} gameInstructions A paragraph with game instructions.
  * Located in server/views/main.js
  */
// export function fadeOutEffect(gameInstructions) {
//   const fadeTarget = gameInstructions,
//     fadeEffect = setInterval(function () {
//       if (!fadeTarget.style.opacity) {
//         fadeTarget.style.opacity = 1;
//       }
//       if (fadeTarget.style.opacity < 0.1) {
//         clearInterval(fadeEffect);
//       } else {
//         fadeTarget.style.opacity -= 0.1;
//       }
//     }, 60);
// }
