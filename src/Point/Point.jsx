import React from "react";

export default function Point({ isPlayerTwoNext, p1Point, p2Point }) {
  let congratSound = () => {
    if (p1Point > 35 || p2Point > 35) {
      setTimeout(() => {
        document.getElementById("winnerAu").play();
      }, 300);
    }
    if (p1Point > p2Point) {
      return <h3>Player 1 won!!</h3>;
    } else {
      return <h3>Player 2 won!!</h3>;
    }
  };

  return (
    <div
      className={`gameState ${
        p1Point > 35 || p2Point > 35 ? "show_winner" : null
      } `}
    >
      <div className="playerState">
        <h1 className={isPlayerTwoNext ? null : "currentPlayer"}>P1</h1>
        <p className="point">{p1Point}</p>
        <h3>vs</h3>
        <p className="point">{p2Point}</p>
        <h1 className={isPlayerTwoNext ? "currentPlayer" : null}>P2</h1>
      </div>
      <div className="winner_notification">{congratSound()}</div>
    </div>
  );
}
