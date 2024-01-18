const bodyParser = require('body-parser');
const consola = require('consola');
const express = require('express');

require('express-async-errors');

const routes = require('./routes');

const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(routes);
app.use((err, _req, res, _next) => {
  consola.info('############## Error handling ##############');
  consola.error(err);
  res.sendStatus(500);
});
app.listen(3000, () => consola.ready('🔥 Server is listening at http://localhost:3000'));
