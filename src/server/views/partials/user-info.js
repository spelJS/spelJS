module.exports = function userInfo(req) {
  return `
  <div class="user-info">
    <div class="user-info__content">
      <p>${req.user.name}</p>
      <a href="/logout">Logout</a>
    </div>
    <div class="photo__container">
      <img class="photo" src="${req.user.photo}" alt="Photo of ${req.user.name}">
    </div>
  </div>
  <div class="gameInfo">
    <div class="highscore"></div>
    <p class="scoreText">Your High Score: <span class="highSpan-js">${req.user.highscore}</span></p>
    <p class="scoreText">Score: <span class="scoreSpan-js">0</span></p>
    <p class="gameInstructions">Press space or arrow up to jump</p>
  </div>
  `;
};
