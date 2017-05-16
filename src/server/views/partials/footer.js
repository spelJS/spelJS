module.exports = function footer() {
  return `
    <script src="https://cdn.polyfill.io/v2/polyfill.min.js?features=default,fetch"></script>
    <script src="/socket.io/socket.io.js"></script>
    <script src="/main.js"></script>
    </body>
    </html>
  `;
};
