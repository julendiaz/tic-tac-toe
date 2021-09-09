import { Gameboard } from "./gameboard.js";
import { Player } from "./player.js";

const Game = (() => {
    const tokens = [...document.querySelectorAll(".token")]; 
    const winnerMessage = document.querySelector(".winner-message");

    let currentPlayer = "playerOne";
    let playing = true; 
    let tokenCount = 0; 
    let playerOneTokens = [];
    let playerTwoTokens = [];
    // Starter Values
    const horizontalWins = [[0, 1, 2], [3, 4, 5], [6, 7, 8]];  
    const verticalWins = [[0, 3, 6], [1, 4, 7], [2, 5, 8]]; 
    const diagonalWin = [[0, 4, 8], [2, 4, 6]]; 

    const playerOne = Player("playerOne", "O");
    const playerTwo = Player("playerTwo", "X"); 

    // Listen to the Gameboard
    const listenGameboard = () => {
        tokens.forEach((token) => {
            token.addEventListener("click", function () {
                let currentPosition = token.dataset.token;
                Game.playTurn(currentPosition);
                Gameboard.switchPlayer();
                // Remove hovers
                Gameboard.removeHovers(token);
            })               
        })
    }

    const playTurn = (position) => {
        if (playing) {
            switch (currentPlayer) {
                case "playerOne": 
                    playerOne.addToken(position, playerOne.getName());
                    currentPlayer = "playerTwo";
                    console.log()
                    Game.checkWinner();
                    break;
                case "playerTwo":
                    playerTwo.addToken(position, playerTwo.getName());
                    currentPlayer = "playerOne";
                    Game.checkWinner();
                    break;
            }
                        
        } else {
            Gameboard.disableTokens();      
        }
        
    }

    const checkTie = () => {
        // Check for the last tokens
        for (let i = 0; i < tokens.length; i++) {
            if(tokens[i].classList.contains("token--playerOne") || tokens[i].classList.contains("token--playerTwo")) {
                tokenCount++;
            }
        }

        if(tokenCount >= 9) {
            playing = false; 
            Gameboard.disableTokens();
            winnerMessage.textContent = "It's a tie! 🤞";
        } else {
            playing = true;
            tokenCount = 0;
        }

    }

    const checkWinner = () => {
        for(let i = 0; i < tokens.length; i++) {
            if(tokens[i].classList.contains("token--playerOne")) {
                playerOneTokens.push(tokens[i].dataset.token); 
            } else if (tokens[i].classList.contains("token--playerTwo")) {
                playerTwoTokens.push(tokens[i].dataset.token); 
            } 
        } 
        console.log(playerOneTokens, playerTwoTokens);

        if (Game.checkTicTacToe(horizontalWins, playerOneTokens) || Game.checkTicTacToe(verticalWins, playerOneTokens) || Game.checkTicTacToe(diagonalWin, playerOneTokens)) {
            Gameboard.disableTokens();
            winnerMessage.textContent = "Player 1 Wins! 🔥";
            // return "playerOne wins";
        } else if (Game.checkTicTacToe(horizontalWins, playerTwoTokens) || Game.checkTicTacToe(verticalWins, playerTwoTokens) || Game.checkTicTacToe(diagonalWin, playerTwoTokens)) {
            Gameboard.disableTokens();
            winnerMessage.textContent = "Player 2 Wins! 🌊";
            // return "playerTwo wins"
        } else {
            Game.checkTie();
        }
        

        playerOneTokens = [];
        playerTwoTokens = [];
    }

    const checkTicTacToe = (arr, tokens) => {
        let matches = 0;
        // let numTokens = tokens.map(token => token.parseInt());
        for (let i = 0; i < arr.length; i++) {
            let currentBundle = arr[i];
            for (let j = 0; j < tokens.length; j++) {
                if (currentBundle.includes(parseInt(tokens[j]))) {
                    matches++;
                }
            }
            if (matches == 3) {
                return true; 
            } 
            matches = 0;
        } 
        return false;
    }

    return { listenGameboard, playTurn, currentPlayer, checkTie, playing, checkWinner, checkTicTacToe, tokenCount, playerOneTokens, playerTwoTokens }
})();

export { Game };