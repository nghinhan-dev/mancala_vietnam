import React, { useState } from "react";
import gameData from "../InitialData";
import {
  handlePointerMove,
  mapDirect,
  displayArrow,
  validateIndex,
} from "./Board_Function";
import Card from "../Card/Card";

export default function Board() {
  const [cardsState, setCardsData] = useState(gameData);
  const [moveState, setMoveState] = useState({
    movingLeft: false,
  });
  const [gameState, setGamteState] = useState({
    movingLeft: false,
    isPlayerTwoNext: false,
    clickedID: 0,
    targetID: 0,
    map: [],
  });

  // manage Game State
  let displayArrowClick = (id) => {
    if (cardsState[id - 1].point == 0) {
      return;
    }

    let newCardsState = displayArrow(id, cardsState);

    setGamteState((prevState) => ({ ...prevState, clickedID: id }));
    setCardsData(() => [...newCardsState]);
  };

  // hover arrow handle
  let hoverArrow = (isLeft) => {
    let newCardsState = cardsState;
    let direct = isLeft ? "backward" : "forward";
    isLeft
      ? setMoveState(() => ({
          movingLeft: true,
        }))
      : setMoveState(() => ({
          movingLeft: false,
        }));
    let player = gameState.isPlayerTwoNext ? 2 : 1;

    let gameMap = mapDirect(direct, player);
    setGamteState((prevState) => ({ ...prevState, map: gameMap }));
    let point = newCardsState[gameState.clickedID - 1].point;

    // get the locate of clicked card and add 'point' step
    let indexOfMap = validateIndex(
      gameMap.findIndex((a) => a == gameState.clickedID) + point
    );

    // get the locate of the final mutated card
    let indexLocate = gameMap[indexOfMap] - 1;
    setGamteState((prevState) => ({ ...prevState, targetID: indexLocate }));

    // make the final mutated card glowing
    newCardsState[indexLocate] = {
      ...newCardsState[indexLocate],
      isGreen: true,
    };

    setCardsData(() => [...newCardsState]);
  };

  // leave arrow handle
  let leaveArrow = () => {
    cardsState[gameState.targetID] = {
      ...cardsState[gameState.targetID],
      isGreen: false,
    };

    setCardsData(() => [...cardsState]);
  };

  // arrow click handle
  let arrowClick = () => {
    let newCardsState = cardsState;

    newCardsState = newCardsState.map((card) => ({
      ...card,
      isGreen: false,
      displayLeftArrow: false,
      displayRightArrow: false,
      isChoosen: false,
    }));

    let indexOfGameMap = gameState.map.findIndex((id) => {
      return id == gameState.clickedID;
    });

    let point = newCardsState[gameState.clickedID - 1].point;
    

    newCardsState[gameState.clickedID - 1] = {
      ...newCardsState[gameState.clickedID - 1],
      point: 0,
      pointArr: [],
    };

    
    
    setGamteState((prevState) => ({
      ...prevState,
      isPlayerTwoNext: !prevState.isPlayerTwoNext,
    }));
    
  };

  let renderCards = cardsState.map((item) => (
    <Card
      key={item.id + "card"}
      data={item}
      gameState={gameState}
      cardClick={() => displayArrowClick(item.id)}
      hoverArrow={() => hoverArrow(item.displayLeftArrow)}
      leaveArrow={() => leaveArrow()}
      clickArrow={() => arrowClick()}
    />
  ));

  return (
    <div className="container">
      <div id="board" onPointerMove={(e) => handlePointerMove(e)}>
        {renderCards}
      </div>
    </div>
  );
}
