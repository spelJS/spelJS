module.exports = function header() {
  return `
    <!DOCTYPE html>
    <html lang="en">
    <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <meta name="description" content="Laika's Space Adventure">
      <meta http-equiv="X-UA-Compatible" content="ie=edge">

      <link rel="stylesheet" type="text/css" href="style.css">
      <link rel="manifest" href="manifest.json">

      <link rel="apple-touch-icon" sizes="180x180" href="img/favicons/apple-touch-icon.png">
      <link rel="icon" type="image/png" sizes="32x32" href="img/favicons/favicon-32x32.png">
      <link rel="icon" type="image/png" sizes="16x16" href="img/favicons/favicon-16x16.png">
      <link rel="mask-icon" href="img/favicons/safari-pinned-tab.svg" color="#999999">

      <meta name="theme-color" content="#0c090d">
      <meta name="mobile-web-app-capable" content="yes">
      <meta name="apple-mobile-web-app-capable" content="yes">
      <meta name="application-name" content="laika">
      <meta name="apple-mobile-web-app-title" content="laika">
      <meta name="theme-color" content="#228DFF">
      <meta name="msapplication-navbutton-color" content="#228DFF">
      <meta name="apple-mobile-web-app-status-bar-style" content="black-translucent">

      <title>Laika's Space Adventure</title>
    </head>
    <body>
      <div class="stars"></div>
  `;
};
