import React, { useState } from "react";
import gameData from "../InitialData";
import {
  handlePointerMove,
  mapByClick,
  mapDirect,
  validateIndex,
} from "./Board_Function";
import Card from "../Card/Card";

export default function Board() {
  const [cardsState, setCardsData] = useState(gameData);
  const [gameState, setGamteState] = useState({
    isChoosingDirect: false,
    isPlayerTwoNext: false,
    clickedID: 0,
    targetID: 0,
  });

  // manage Game State
  let handleOnClick = (id) => {
    let clicked_card_index = cardsState.findIndex((a) => {
      return a.id == id;
    });

    setGamteState((prevState) => ({ ...prevState, clickedID: id }));

    let left_index = mapByClick(id - 1)[0];
    let right_index = mapByClick(id - 1)[1];

    // change choosing direct state
    setGamteState((prevState) => ({
      ...prevState,
      isChoosingDirect: !prevState.isChoosingDirect,
    }));

    // clone cardsState
    let newCardsState = cardsState;

    // unchoosen other cards
    newCardsState = newCardsState.map((card) => ({
      ...card,
      isChoosen: false,
      displayLeftArrow: false,
      displayRightArrow: false,
    }));

    // check re-choose the same card
    if (cardsState[clicked_card_index].isChoosen) {
      return setCardsData(() => [...newCardsState]);
    }

    // chossing a card
    newCardsState[clicked_card_index] = {
      ...newCardsState[clicked_card_index],
      isChoosen: !newCardsState[clicked_card_index].isChoosen,
    };

    // displaying arrow
    // left arrow
    newCardsState[left_index] = {
      ...newCardsState[left_index],
      displayLeftArrow: true,
    };

    // right arrow
    newCardsState[right_index] = {
      ...newCardsState[right_index],
      displayRightArrow: true,
    };

    setCardsData(() => [...newCardsState]);
  };

  // hover arrow handle
  let hanldeHoverDirect = (isLeft) => {
    let newCardsState = cardsState;
    let direct = isLeft ? "backward" : "forward";
    let player = gameState.isPlayerTwoNext ? 2 : 1;

    let map = mapDirect(direct, player);
    let point = newCardsState[gameState.clickedID - 1].point;

    // get the locate of clicked card
    let indexOfMap = validateIndex(
      map.findIndex((a) => a == gameState.clickedID) + point
    );
    // console.log("indexOfMap:", indexOfMap);

    // get the locate of the final mutated card
    let indexLocate = map[indexOfMap] - 1;
    setGamteState((prevState) => ({ ...prevState, targetID: indexLocate }));
    // console.log("indexLocate:", indexLocate);

    // make the final mutated card glowing
    newCardsState[indexLocate] = {
      ...newCardsState[indexLocate],
      isGreen: true,
    };

    setCardsData(() => [...newCardsState]);
  };

  // leave arrow handle
  let hanldeLeaveDirect = () => {
    cardsState[gameState.targetID] = {
      ...cardsState[gameState.targetID],
      isGreen: false,
    };

    setCardsData(() => [...cardsState]);
  };

  // arrow click handle
  let arrowClick = () => {
    // console.log("i was clicked");
    let newCardsState = cardsState;
    newCardsState = newCardsState.map((card) => ({
      ...card,
      isGreen: false,
      displayLeftArrow: false,
      displayRightArrow: false,
      isChoosen: false,
    }));

    setCardsData(() => [...newCardsState]);

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
      cardClick={() => handleOnClick(item.id)}
      directHover={() => hanldeHoverDirect(item.displayLeftArrow)}
      directLeave={() => hanldeLeaveDirect()}
      arrowClick={() => arrowClick()}
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
