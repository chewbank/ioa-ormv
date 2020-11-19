'use strict';

const app = require('@app');

app.use("@chewbank/ioa-config");
app.use("./lib");

app.loader({
  "controller": {
    level: 50
  }
});
