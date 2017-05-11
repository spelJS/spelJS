module.exports = function navigation() {
  return `
  <nav class="navigation navigation-js">
    <ul class="navigation__list">
      <li class="navigation__list-item play-js"><a href="/play" data-route>Play Game</a></li>
      <li class="navigation__list-item highscore-js"><a href="/highscore">View Highscore</a></li>
    </ul>
  </nav>
  `;
};
