
import { Player } from "./player.js";
import { Game } from "./game.js";

const Gameboard = (() => { 
    const gameboard = [0, 1, 2, 3, 4, 5, 6, 7, 8]; 
    const tokens = [...document.querySelectorAll(".token")]; 
    const players = [...document.querySelectorAll(".player")]; 
   
 
    const renderToken = (position, player) => {
        // Seleccionar placeholder con position
        const currentToken = document.querySelector(`[data-token="${position}"]`);
    
        if (!currentToken.classList.contains("token--playerOne") || !currentToken.classList.contains("token--playerTwo") ) {
          switch(player) {
            case "playerOne": 
              currentToken.classList.add("token--playerOne");
              break;
            case "playerTwo":
              currentToken.classList.add("token--playerTwo");
              break;
          }
        } 
        
      } 

    const switchPlayer = () => { 
        if (players[0].classList.contains("current-player")) { 
            players[0].classList.remove("current-player"); 
            players[1].classList.add("current-player");
        } else { 
            players[0].classList.add("current-player"); 
            players[1].classList.remove("current-player");
        } 
    }
    
    const hoverTokens = () => { 
            tokens.forEach((token) => { 
                    token.addEventListener("mouseenter", function () { 
                        if (!token.classList.contains("token--playerOne") && !token.classList.contains("token--playerTwo")) {
                            if (players[0].classList.contains("current-player") ) { 
                                token.classList.add("token--hoverOne") 
                            } else { 
                                // placeholder.style.backgroundImage = "url(/assets/hovercross.svg)"; 
                                token.classList.add("token--hoverTwo"); 
                            } 
                        }
                    })
                    token.addEventListener("mouseleave", function () { 
                        if (!token.classList.contains("token--playerOne") && !token.classList.contains("token--playerTwo")) {
                            if (players[0].classList.contains("current-player")) { 
                                Gameboard.removeHovers(token);
                            } else { 
                                // placeholder.style.backgroundImage = "url(/assets/hovercross.svg)"; 
                                Gameboard.removeHovers(token);
                            } 
                        }
                    })           
            }) 
    } 

    const removeHovers = (token) => {
        token.classList.remove("token--hoverOne"); 
        token.classList.remove("token--hoverTwo");
    }

    const disableTokens = () => {
        tokens.forEach((token) => {
            token.style.pointerEvents = "none";
        })
    }

    const enableTokens = () => {
        tokens.forEach((token) => {
            token.style.pointerEvents = "all";
        })
    }

    const cleanBoard = () => {
        for(let i = 0; i < tokens.length; i++) {
            tokens[i].classList.remove("token--playerOne");
            tokens[i].classList.remove("token--playerTwo");
        }
    }

   
  
    return { renderToken, switchPlayer, hoverTokens, removeHovers, disableTokens, cleanBoard, enableTokens };
  })();
  
  export { Gameboard };