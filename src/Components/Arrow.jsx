import React from "react";

export default function Direct(props) {
  return (
    <div className="direct">
      <i className="fa fa-angle-double-left" onClick={props.backwardChoice}></i>
      <i className="fa fa-flag"></i>
      <i className="fa fa-angle-double-right" onClick={props.forwardChoice}></i>
    </div>
  );
}
