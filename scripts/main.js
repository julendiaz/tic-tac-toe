import { Gameboard } from "./modules/gameboard.js";
import { Game } from "./modules/game.js";
import { Player }  from "./modules/player.js";

if (Game.playing) {
    Game.listenGameboard();
    Gameboard.hoverTokens();
}

console.log(Game.playing)