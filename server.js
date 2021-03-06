const express = require('express');
const path = require('path');
require('dotenv').config();

const { initDatabase } = require('./lib/database');

const ingredients = require('./lib/routes/ingredients');
const drinks = require('./lib/routes/drinks');
const parties = require('./lib/routes/parties');
const admin = require('./lib/routes/admin');

const port = process.env.PORT || 8080;
const app = express();

app.use(express.json());

app.use('/api/ingredients', ingredients);
app.use('/api/drinks', drinks);
app.use('/api/parties', parties);
app.use('/api/admin', admin);

app.use(express.static(path.join(__dirname, 'client/build')));
app.get('*', (request, response) => {
  response.sendFile(path.join(__dirname, 'client/build/index.html'));
});

initDatabase(process.env.MONGO_URL, process.env.MONGO_DB_NAME).then(
  async () => {
    console.log(`Database ${process.env.MONGO_DB_NAME} is ready`);

    app.listen(port, () => {
      console.log(`Server is running on http://localhost:${port}`);
    });
  }
);
