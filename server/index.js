const express = require('express')
const app = express()
const PORT = 3001

app.use(express.json())

app.get('/', (req, res) => {
  res.send('Mood Journal API is alive!');
});

app.listen(PORT, () =>
  console.log(`Server listening on http://localhost:${PORT}`)
);