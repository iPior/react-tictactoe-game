# Tic Tac Toe
A webapp developed to practice React. This project is a simple implementation of the classic Tic Tac Toe game, allowing users to play against each other in a fun and interactive way. The game features a clean interface and provides real-time feedback on the game state.

## Table of Contents
- [Technologies Used](#technologies-used)
- [Hosting the Application Locally](#hosting-the-application-locally)
  - [Clone the Repository](#clone-the-repository)
  - [Install Dependencies](#install-dependencies)
  - [Insert Your Anthropic API Key](#insert-your-anthropic-api-key)
  - [Start the Development Server](#start-the-development-server)
  - [Start the Client](#start-the-client)
  - [Open in Browser](#open-in-browser)
- [Screenshots of the game](#screenshots-of-the-game)

## Technologies Used
- **React**: A JavaScript library for building user interfaces.
- **JavaScript**: The programming language used for game logic.
- **TailwindCSS**: For styling the game components.
- **HTML**: For structuring the web application.
- **Netlify**: For hosting the client.
- **Render**: For hosting the server. 
- **Anthropic API**: Choice for the AI to prompt to.

## Hosting the Application Locally
To host the Tic Tac Toe application locally, follow these steps:

1. **Clone the Repository**:
   ```bash
   git clone https://github.com/yourusername/tic-tac-toe.git
   cd tic-tac-toe
   ```

2. **Install Dependencies**:
   Make sure you have Node.js installed. Then run:
   ```bash
   npm install
   ```

3. **Insert Your Anthropic API Key**:
   Create a `.env` file in the root of your project (if it doesn't exist) and add your Anthropic API key:
   ```plaintext
   ANTHROPIC_API_KEY=your_api_key_here
   ```

4. **Start the Development Server**:
   Navigate to the server folder and start the server by running: 
   ```bash
   npm start dev
   ```

5. **Start the Client**:
   In another terminal window, navigate back to the client directory and run:
   ```bash
   npm start dev
   ```

6. **Open in Browser**:
   Navigate to `http://localhost:3000` in your web browser to view the application.

## Screenshots of the game

> Start screen of the game<br/>
![<Start Screen of the game>.](https://github.com/user-attachments/assets/1fbc3565-0c3f-443c-a11b-304b180e25d6)

> Middle of a game<br/>
![<Middle of a game>.](https://github.com/user-attachments/assets/916cca28-bea3-4a42-a054-4c1a5b8d7960)

> Winning state of the game<br/>
![<Winning state of the game>.](https://github.com/user-attachments/assets/03faed67-1793-4b8f-8f65-b567184cdc62)
