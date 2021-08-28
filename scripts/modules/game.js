import { Gameboard } from "./gameboard.js";
import { Player } from "./player.js";

const Game = (() => {
    const tokens = [...document.querySelectorAll(".token")]; 
    let currentPlayer = "playerOne";
    let playing = true; 
    let tokenCount = 0;
    // Starter Values

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
            if(currentPlayer === "playerOne") {
                playerOne.addToken(position, playerOne.getName());
                currentPlayer = "playerTwo";
            } else {
                playerTwo.addToken(position, playerTwo.getName());
                currentPlayer = "playerOne";
            }
        } else {
            Gameboard.disableTokens();      
        }
        Game.checkGameOver();
        
    }

    const checkGameOver = () => {
        // Check for the last tokens
        for (let i = 0; i < tokens.length; i++) {
            if(tokens[i].classList.contains("token--playerOne") || tokens[i].classList.contains("token--playerTwo")) {
                tokenCount++;
            }
        }
        console.log(tokenCount);
        if(tokenCount >= 6) {
            playing = false; 
            Gameboard.disableTokens();
        } else {
            playing = true;
            tokenCount = 0;
        }

    }

    return { listenGameboard, playTurn, currentPlayer, checkGameOver, playing }
})();

export { Game };