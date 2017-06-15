var express = require('express');

// Create our app
var app = express();
// Pick up port from environment (for heroku or local)
// else use 3000
const PORT = process.env.PORT || 3000;

// Need to redirect https to http:
app.use(function (req, res, next) {
  if (req.headers['x-forwarded-proto'] === 'https') {
    // Need to redirect:
    res.redirect('http://' + req.hostname + req.url);

  } else {
    // OK, it is http
    next();
  };
});

app.use(express.static('public'));

app.listen(PORT, function () {
  console.log('Express server is up on PORT '+PORT);
});
