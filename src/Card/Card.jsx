import React from "react";
import Ufo from "../SVG/Ufo";

export default function Square(props) {
  let renderMoon = props.data.pointArr.map((p) => (
    <div className="moon" key={p + "moon"}>
      <div className="craters"></div>
    </div>
  ));

  let renderArrow = (leftArrow) => {
    if (leftArrow) {
      return (
        <i
          onClick={() => console.log("left arrow was clicked")}
          className="arrow fa fa-angle-double-left"
        ></i>
      );
    } else {
      return (
        <i
          onClick={() => console.log("right arrow was clicked")}
          className="arrow fa fa-angle-double-right"
        ></i>
      );
    }
  };

  // displayLeftArrow: false,
  // displayRightArrow: false,

  return (
    <>
      {props.data.isUFO ? (
        <div
          className={`card ${props.data.isGreen ? "move-shadow" : ""}`}
          onMouseEnter={
            props.data.displayLeftArrow || props.data.displayRightArrow
              ? props.directHover
              : null
          }
          onMouseLeave={
            props.data.displayLeftArrow || props.data.displayRightArrow
              ? props.directLeave
              : null
          }
        >
          <div className="card-content">
            {!props.data.displayLeftArrow && !props.data.displayRightArrow ? (
              <Ufo />
            ) : (
              renderArrow(props.data.displayLeftArrow)
            )}
          </div>
        </div>
      ) : props.data.id >= 2 && props.data.id <= 6 ? (
        // Player 1 Cards
        <div
          className={`card ${props.data.isChoosen ? "choosing-state" : ""} ${
            props.gameState.isPlayerTwoNext ? "not-allowed" : ""
          }  ${props.data.isGreen ? "move-shadow" : ""} `}
          onClick={
            props.data.displayLeftArrow || props.data.displayRightArrow
              ? props.arrowClick
              : props.gameState.isPlayerTwoNext
              ? null
              : props.cardClick
          }
          onMouseEnter={
            props.data.displayLeftArrow || props.data.displayRightArrow
              ? props.directHover
              : null
          }
          onMouseLeave={
            props.data.displayLeftArrow || props.data.displayRightArrow
              ? props.directLeave
              : null
          }
        >
          <div
            className={`card-content ${
              props.gameState.isPlayerTwoNext ? "new-moon" : ""
            }`}
          >
            {!props.data.displayLeftArrow && !props.data.displayRightArrow
              ? renderMoon
              : renderArrow(props.data.displayLeftArrow)}
          </div>
        </div>
      ) : (
        // Player 2 Cards
        <div
          className={`card ${props.data.isChoosen ? "choosing-state" : ""} ${
            props.gameState.isPlayerTwoNext ? "" : "not-allowed"
          } ${props.data.isGreen ? "move-shadow" : ""}`}
          onClick={
            props.data.displayLeftArrow || props.data.displayRightArrow
              ? props.arrowClick
              : props.gameState.isPlayerTwoNext
              ? props.cardClick
              : null
          }
          onMouseEnter={
            props.data.displayLeftArrow || props.data.displayRightArrow
              ? props.directHover
              : null
          }
          onMouseLeave={
            props.data.displayLeftArrow || props.data.displayRightArrow
              ? props.directLeave
              : null
          }
        >
          <div
            className={`card-content ${
              props.gameState.isPlayerTwoNext ? "" : "new-moon"
            }`}
          >
            {!props.data.displayLeftArrow && !props.data.displayRightArrow
              ? renderMoon
              : renderArrow(props.data.displayLeftArrow)}
          </div>
        </div>
      )}
    </>
  );
}
