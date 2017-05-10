module.exports = function footer(req) {
  return `
    <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.2.1/jquery.min.js"></script>
    <script src="/socket.io/socket.io.js"></script>
    <script src="/main.js"></script>
    <script>window.LAIKA_USER = ${JSON.stringify(req.user)}</script>
    </body>
    </html>
  `;
};
