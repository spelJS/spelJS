/**
 * Moves monster from right to left. If monster reaches the position -10
 * (outside screen on the left side), promise is resolved and giveScore will
 * be set to 'true'.
 * @param  {string} monsterDiv    Element created by the function generateMonsters
 * @return {bolean} giveScore     Is return true to give user score.
 */
export function monsterAnimation(monsterDiv) {
  const elem = monsterDiv;
  let monsterAnimationPos = 100;
  let giveScore = false;

  return new Promise((resolve, reject) => { // FIXME: What to do on reject?
    function frame() {
      if (monsterAnimationPos === -10) {
        giveScore = true;
        clearInterval();
        resolve(giveScore);
      } else {
        monsterAnimationPos -= 1;
        elem.style.left = monsterAnimationPos + '%';
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
export function moveSpacedust(spacedust) {
  const elem = spacedust;
  let spacedustPos = 100;
  function frame() {
    if (spacedustPos === -200) {
      spacedustPos = 100;
    } else {
      spacedustPos -= 1;
      elem.style.left = spacedustPos + 'vw';
    }
  }
  setInterval(frame, 15);
}

/**
  * Fades out given elements
  * @param  {string} gameInstructions A paragraph with game instructions.
  * Located in server/views/main.js
  */
export function fadeOutEffect(gameInstructions) {
  const fadeTarget = gameInstructions,
    fadeEffect = setInterval(function () {
      if (!fadeTarget.style.opacity) {
        fadeTarget.style.opacity = 1;
      }
      if (fadeTarget.style.opacity < 0.1) {
        clearInterval(fadeEffect);
      } else {
        fadeTarget.style.opacity -= 0.1;
      }
    }, 60);
}
