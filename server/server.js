const claude = require('./utils/claude.js')
const express = require('express');
const cors = require('cors');
const app = express();
const PORT = 8080;
const corsOptions = {
  origin: 'https://react-tictactoe-ipior.netlify.app'
}

app.use(cors(corsOptions));
app.use(express.json());

app.post('/claude', (req, res) => {
  const { gameState, availableMoves } = req.body;

  claude.getMoveFromClaude(gameState, availableMoves)
    .then(response => {
      res.json(response.index); // send back response
    })
    .catch((err) => {
      res.status(500).json({ message: `Error while communicating with Claude. Error: ${err}` }); // send back error
    });
});

app.listen(PORT, () => 
  console.log(`Server running on port ${PORT}`)
)