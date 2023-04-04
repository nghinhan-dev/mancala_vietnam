import React, { useState } from "react";
import gameData from "../InitialData";
import {
  handlePointerMove,
  getMovingMap,
  displayArrow,
  validateIndex,
} from "./Board_Function";
import Card from "../Card/Card";

export default function Board() {
  const [cardsState, setCardsData] = useState(gameData);
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
    let player = gameState.isPlayerTwoNext ? 2 : 1;

    let gameMap = getMovingMap(direct, player);
    let point = newCardsState[gameState.clickedID - 1].point;

    // get the locate of clicked card and add 'point' step
    let indexOfMap = validateIndex(
      gameMap.findIndex((a) => a == gameState.clickedID) + point
    );

    // get the locate of the final mutated card
    let indexLocate = gameMap[indexOfMap] - 1;
    // make the final mutated card glowing
    newCardsState[indexLocate] = {
      ...newCardsState[indexLocate],
      isGreen: true,
    };

    setGamteState((prevState) => ({
      ...prevState,
      movingLeft: direct,
      map: gameMap,
      targetID: indexLocate,
    }));

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
    let movingMap = gameState.map;
    let point = newCardsState[gameState.clickedID - 1].point;
    let cardList = document.querySelectorAll(".card");

    newCardsState[gameState.clickedID - 1] = {
      ...newCardsState[gameState.clickedID - 1],
      point: 0,
      pointArr: [],
    };

    newCardsState = newCardsState.map((card) => ({
      ...card,
      isChoosen: false,
      displayLeftArrow: false,
      displayRightArrow: false,
      isGreen: false,
    }));

    for (let index = 1; index <= point; index++) {
      setTimeout(() => {
        document.getElementById("arrowClick").play();
        setCardsData(() => [...newCardsState]);

        let indexOfMap = validateIndex(
          movingMap.findIndex((a) => a == gameState.clickedID) + index
        );

        // get the locate of the card
        let indexLocate = movingMap[indexOfMap] - 1;

        // indicate which card is changing point
        cardList[indexLocate].classList.add("movingShadow");
        setTimeout(() => {
          cardList[indexLocate].classList.remove("movingShadow");
        }, 500);

        // update card
        if (indexLocate == 0 || indexLocate == 11) {
          newCardsState[indexLocate] = {
            ...newCardsState[indexLocate],
            point: newCardsState[indexLocate].point + 1,
          };
        } else {
          newCardsState[indexLocate] = {
            ...newCardsState[indexLocate],
            point: newCardsState[indexLocate].point + 1,
            pointArr: [
              ...newCardsState[indexLocate].pointArr,
              newCardsState[indexLocate].point + 1,
            ],
          };
        }
      }, 500 * index);
    }

    setTimeout(() => {
      setGamteState((prevState) => ({
        ...prevState,
        isPlayerTwoNext: !prevState.isPlayerTwoNext,
      }));
    }, 500 * point);
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
