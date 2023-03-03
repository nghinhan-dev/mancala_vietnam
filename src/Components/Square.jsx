import React from "react";

export default function Square(props) {
  let renderBall = props.data.pointArr.map((p) => (
    <div className="deball" key={p}></div>
  ));

  return (
    <>
      {props.data.isStar ? (
        <div className="square">
          <i className="fa fa-star star">
            <p>{props.data.point}</p>
          </i>
          <div
            className={`star_space  ${props.data.isGreen ? "bg-green" : ""}`}
          ></div>
        </div>
      ) : props.data.id > 6 && props.data.id < 12 ? (
        <div
          className={`square ${props.data.isHover ? "bg-yellow" : ""} ${
            props.data.isGreen ? "bg-green" : ""
          } ${props.isPickSquare && props.isPlayerTwoNext ? "" : "no_cursor"} `}
          onMouseLeave={
            props.isPickSquare && props.isPlayerTwoNext
              ? props.mouseLeave
              : null
          }
          onMouseEnter={
            props.isPickSquare && props.isPlayerTwoNext
              ? props.mouseEnter
              : null
          }
          onClick={
            props.isPickSquare && props.isPlayerTwoNext ? props.click : null
          }
        >
          {renderBall}
        </div>
      ) : (
        <div
          className={`square ${props.data.isHover ? "bg-yellow" : ""} ${
            props.data.isGreen ? "bg-green" : ""
          } ${
            props.isPickSquare && !props.isPlayerTwoNext ? "" : "no_cursor"
          } `}
          onMouseLeave={
            props.isPickSquare && !props.isPlayerTwoNext
              ? props.mouseLeave
              : null
          }
          onMouseEnter={
            props.isPickSquare && !props.isPlayerTwoNext
              ? props.mouseEnter
              : null
          }
          onClick={
            props.isPickSquare && !props.isPlayerTwoNext ? props.click : null
          }
        >
          {renderBall}
        </div>
      )}
    </>
  );
}
