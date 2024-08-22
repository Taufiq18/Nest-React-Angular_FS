const express = require('express');
const app = express();
const port = 3001; // Port for Express

app.use(express.json());

app.get('/api/hello', (req, res) => {
  res.send('Hello from Express!');
});

app.listen(port, () => {
  console.log(`Express server listening at http://localhost:${port}`);
});