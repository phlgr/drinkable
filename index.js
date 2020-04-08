const express = require('express');
const path = require('path');

const port = process.env.PORT || 8080;
const app = express();

app.use(express.static(path.join(__dirname, 'client/build')));
app.get('*', (request, response) => {
  response.sendFile(path.join(__dirname, 'client/build/index.html'));
});
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
