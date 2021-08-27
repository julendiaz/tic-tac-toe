import { Gameboard } from "./gameboard.js";
import { Player } from "./player.js";

const Game = (() => {
    const placeholders = [...document.querySelectorAll(".placeholder")]; 
    let currentPlayer = "playerOne";
    let playing = true; 
    // Starter Values

    const playerOne = Player("playerOne", "O");
    const playerTwo = Player("playerTwo", "X"); 

    // Listen to the Gameboard
    const listenGameboard = () => {
        placeholders.forEach((placeholder) => {
            placeholder.addEventListener("click", function () {
                let currentPosition = placeholder.dataset.token;
                Game.playTurn(currentPosition);
                Gameboard.switchPlayer();
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