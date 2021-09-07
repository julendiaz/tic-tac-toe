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
                    break;
                case "playerTwo":
                    playerTwo.addToken(position, playerTwo.getName());
                    currentPlayer = "playerOne";
                    break;
            }
            console.log(currentPlayer);
        } else {
            Gameboard.disableTokens();      
        }
        Game.checkWinner();
        Game.checkTie();
        
    }

    const checkTie = () => {
        // Check for the last tokens
        for (let i = 0; i < tokens.length; i++) {
            if(tokens[i].classList.contains("token--playerOne") || tokens[i].classList.contains("token--playerTwo")) {
                tokenCount++;
            }
        }

        if(tokenCount >= 9  ) {
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

        if (Game.checkTicTacToe(horizontalWins, playerOneTokens) || Game.checkTicTacToe(verticalWins, playerOneTokens) || Game.checkTicTacToe(diagonalWin, playerOneTokens)) {
            Gameboard.disableTokens();
            winnerMessage.textContent = "Player 1 Wins! 🔥";
            // return "playerOne wins";
        } else if (Game.checkTicTacToe(horizontalWins, playerTwoTokens) || Game.checkTicTacToe(verticalWins, playerTwoTokens) || Game.checkTicTacToe(diagonalWin, playerTwoTokens)) {
            Gameboard.disableTokens();
            winnerMessage.textContent = "Player 2 Wins! 🌊";
            // return "playerTwo wins"
        } 

        playerOneTokens = [];
        playerTwoTokens = [];
    }

    const checkTicTacToe = (arr, tokens) => {
        for (let i = 0; i < arr.length; i++) {
            let joinedArr = arr[i].sort().join("");
            let joinedTokens = tokens.sort().join("");
            if (joinedArr === joinedTokens) {
                return true; 
            } 
        }
        return false;
    }

    return { listenGameboard, playTurn, currentPlayer, checkTie, playing, checkWinner, checkTicTacToe, tokenCount, playerOneTokens, playerTwoTokens }
})();

export { Game };