const express = require('express');
const path = require('path');
require('dotenv').config();

const { initDatabase } = require('./lib/database');
const { setIngredientsDB } = require('./lib/models/ingredients');

const ingredients = require('./lib/routes/ingredients');
const drinks = require('./lib/routes/drinks');
const party = require('./lib/routes/party');

const port = process.env.PORT || 8080;
const app = express();

app.use(express.json());

app.use('/api/ingredients', ingredients);
app.use('/api/drinks', drinks);
app.use('/api/party', party);

app.use(express.static(path.join(__dirname, 'client/build')));
app.get('*', (request, response) => {
  response.sendFile(path.join(__dirname, 'client/build/index.html'));
});

initDatabase(process.env.MONGO_URL, process.env.MONGO_DB_NAME).then(
  async () => {
    console.log(`Database ${process.env.MONGO_DB_NAME} is ready`);

    await setIngredientsDB();

    app.listen(port, () => {
      console.log(`Server is running on http://localhost:${port}`);
    });
  }
);
