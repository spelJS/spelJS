module.exports = function mainView(req) {
  return `
    <!DOCTYPE html>
    <html lang="en">
    <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <meta http-equiv="X-UA-Compatible" content="ie=edge">
      <title>spelJS</title>
    </head>
    <body>
      <h1>Hello!</h1>
      ${!req.isAuthenticated() ?
        '<a href="/login">Logga in</a>' :
        `
          <h1>Hello ${JSON.stringify(req.user.displayName)}!</h1>
          <pre>${JSON.stringify(req.user, null, 2)}</pre>
        `
      }
      <script src="/socket.io/socket.io.js"></script>
      <script src="/main.js"></script>
    </body>
    </html>
  `;
};
