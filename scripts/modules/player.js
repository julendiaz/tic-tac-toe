import { Gameboard } from "./gameboard.js";

const Player = (name, token) => {
    const getName = () => name; 
    const getToken = () => token; 

    const addToken = (position, token) => {
        Gameboard.renderToken(position, token);
    }
    return {getName, getToken, addToken} 
}

export { Player };