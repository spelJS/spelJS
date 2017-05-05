module.exports = function header() {
  return `
    <!DOCTYPE html>
    <html lang="en">
    <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <meta name="description" content="JavaScript Inl 3 -­ Kampanj">
      <meta http-equiv="X-UA-Compatible" content="ie=edge">
      <link rel="stylesheet" type="text/css" href="/style.css">
      <title>Laika's Space Adventure</title>
    </head>
    <body>
      <video loop muted autoplay class="backgroundVideo">
        <source src="img/gradient.mp4" type="video/mp4">
      </video>
      <div class="stars"></div>
      <div class="spacedust"></div>
  `;
};
