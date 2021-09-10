import { Gameboard } from "./modules/gameboard.js";
import { Game } from "./modules/game.js";
import { Player }  from "./modules/player.js";

const restartBtn = document.querySelector(".restart");

const initGame = () => {
    Game.startGame();
    Gameboard.hoverTokens();
}

const restartGame = () => {
    restartBtn.addEventListener("click", function () {
        location.reload();
    })
}

initGame();
restartGame();