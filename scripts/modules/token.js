const Token = (() => {
  const tokens = document.querySelectorAll(".token");
  const newToken = document.createElement("div");
  newToken.classList.add("token__player-token");

  const addToken = () => {
    tokens.forEach((token) => {
      token.addEventListener("click", function () {
        token.append(newToken);
      });
    });
  };

  return { addToken };
})();

export { Token };
