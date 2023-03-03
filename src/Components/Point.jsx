import React from "react";

export default function Point(props) {
  return (
    <>
      <div className="point">
        <h2>
          Player 1 : <span>{props.player1}</span> point
        </h2>
        <h2>
          Player 2 : <span>{props.player2}</span> point
        </h2>
      </div>
    </>
  );
}
