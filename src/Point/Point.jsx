import React from "react";

export default function Point({ isPlayerTwoNext, p1Point, p2Point }) {
  return (
    <div className="playerState">
      <h1 className={isPlayerTwoNext ? null : "currentPlayer"}>P1</h1>
      <p className="point">{p1Point}</p>
      <h3>vs</h3>
      <p className="point">{p2Point}</p>
      <h1 className={isPlayerTwoNext ? "currentPlayer" : null}>P2</h1>
    </div>
  );
}
