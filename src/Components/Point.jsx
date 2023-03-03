import React from "react";

export default function Point(props) {
  return (
    <>
      <div className="point">
        <h2>
          Player 1 : <span>{props.player1}</span> point
        </h2>
        <div className="turn">
          <h1>Player {props.turn ? "2" : "1"} turn</h1>
          <p>Người chơi 1 là 5 ô dãy ở trên</p>
          <p>Người chơi 2 là 5 ô dãy ở dưới</p>
        </div>
        <h2>
          Player 2 : <span>{props.player2}</span> point
        </h2>
      </div>
    </>
  );
}
