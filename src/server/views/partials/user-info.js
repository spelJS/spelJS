module.exports = function userInfo(user) {
  return `
  <div class="user-info">
    <div class="user-info__content">
      <p>${user.name}</p>
      <a href="/logout">Logout</a>
    </div>
    <div class="photo__container">
      <img class="photo" src="${user.photo}" alt="Photo of ${user.name}">
    </div>
  </div>
  <div class="gameInfo">
    <div class="highscore"></div>
    <p class="scoreText">Your High Score: <span class="highSpan-js">${user.highscore}</span></p>
    <p class="scoreText">Score: <span class="scoreSpan-js">0</span></p>
    <p class="gameInstructions gameInstructions-js">Space/arrow up to jump</p>
  </div>
  `;
};
