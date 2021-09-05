import { Gameboard } from "./modules/gameboard.js";
import { Game } from "./modules/game.js";
import { Player }  from "./modules/player.js";

Game.listenGameboard();
Gameboard.hoverTokens();
Gameboard.restartGame();