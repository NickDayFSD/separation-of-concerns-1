const express = require('express');
const orderController = require('./controllers/orders');
const candyController = require('./controllers/candies');
const bicycleController = require('./controllers/bicycles');
const colorController = require('./controllers/colors');
const animeController = require('./controllers/anime');
const app = express();

app.use(express.json());

app.use(orderController);
app.use(candyController);
app.use(bicycleController);
app.use(colorController);
app.use(animeController);

app.use(require('./middleware/not-found'));
app.use(require('./middleware/error'));

module.exports = app;
