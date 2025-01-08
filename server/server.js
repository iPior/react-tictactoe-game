const claude = require('./utils/claude.js')
const express = require('express');
const cors = require('cors');
const app = express();
const PORT = 8080;
const corsOptions = {
  // origin: 'https://react-tictactoe-ipior.netlify.app',
  origin: '*'  // allow all origins
}

app.use(cors(corsOptions));
app.use(express.json());

app.post('/claude', (req, res) => {
  const { gameState, availableMoves } = req.body;
  console.log(`Received request with gameState: ${JSON.stringify(gameState)} and available moves: ${JSON.stringify(availableMoves)}`);

  claude.getMoveFromClaude(gameState, availableMoves)
    .then(response => {
      console.log(JSON.stringify(response));
      try {

        res.json(response.index); // send back response
      }
      catch {
        console.error('Error while sending response to client');
      };
    })
    .catch((err) => {
      res.status(500).json({ message: `Error while communicating with Claude. Error: ${err}` }); // send back error
    });
});

app.listen(PORT, () => 
  console.log(`Server running on port ${PORT}`)
)