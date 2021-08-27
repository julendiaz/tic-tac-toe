
import { Player } from "./player.js";
import { Game } from "./game.js";

const Gameboard = (() => { 
    const gameboard = [0, 1, 2, 3, 4, 5, 6, 7, 8]; 
    const placeholders = [...document.querySelectorAll(".placeholder")]; 
    const players = [...document.querySelectorAll(".player")]; 
 

    const switchPlayer = () => { 
        if (players[0].classList.contains("current-player")) { 
            players[0].classList.remove("current-player"); 
            players[1].classList.add("current-player");
        } else { 
            players[0].classList.add("current-player"); 
            players[1].classList.remove("current-player");
        } 
    }
    const renderToken = (position, player) => {
        // Seleccionar placeholder con position
        const currentHolder = document.querySelector(`[data-token="${position}"]`);
        const newToken = document.createElement("div");
        newToken.classList.add("token");
    
        if (currentHolder.children.length < 1) {
          switch(player) {
            case "playerOne": 
              newToken.classList.add("token--playerOne");
              currentHolder.append(newToken);
              break;
            case "playerTwo":
              newToken.classList.add("token--playerTwo");
              currentHolder.append(newToken);
              break;
          }
        } 
      } 
  
    return { renderToken, switchPlayer };
  })();
  
  export { Gameboard };