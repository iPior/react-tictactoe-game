const express = require('express');
const app = express();
const PORT = 8080;

const cors = require('cors');
const corsOptions = {
  origin: 'http://localhost:5173'
}

app.use(cors(corsOptions));

app.get('/api/claude', (req, res) => {
  res.json({message: 'Hello'});
});

app.listen(PORT, () => 
  console.log(`Server running on port ${PORT}`)
)