import { Gameboard } from "./gameboard.js";
import { Player } from "./player.js";

const Game = (() => {
    const token = [...document.querySelectorAll(".token")]; 
    let currentPlayer = "playerOne";
    let playing = true; 
    // Starter Values

    const playerOne = Player("playerOne", "O");
    const playerTwo = Player("playerTwo", "X"); 

    // Listen to the Gameboard
    const listenGameboard = () => {
        token.forEach((tok) => {
            tok.addEventListener("click", function () {
                let currentPosition = tok.dataset.token;
                Game.playTurn(currentPosition);
                Gameboard.switchPlayer();
                // Remove hovers
                tok.classList.remove("token--hoverOne"); 
                tok.classList.remove("token--hoverTwo");
            })               
        })
    }

    const playTurn = (position) => {
        if(currentPlayer === "playerOne") {
            playerOne.addToken(position, playerOne.getName());
            currentPlayer = "playerTwo";
        } else {
            playerTwo.addToken(position, playerTwo.getName());
            currentPlayer = "playerOne";
        }
    }

    return { listenGameboard, playTurn, currentPlayer }
})();

export { Game };