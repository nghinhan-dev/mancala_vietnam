import React, { useState } from "react";
import gameData from "../InitialData";
import {
  handlePointerMove,
  getMovingMap,
  displayArrow,
  validateIndex,
} from "./Board_Function";
import Card from "../Card/Card";
import Point from "../Point/Point";

export default function Board() {
  const [cardsState, setCardsData] = useState(gameData);
  const [gameState, setGamteState] = useState({
    movingLeft: false,
    isPlayerTwoNext: false,
    clickedID: 0,
    lastCardIndex: 0,
    map: [],
    player1Point: 0,
    player2Point: 0,
  });

  let reportPoint = () => {
    // 0 + 1 + 2 + 3 + 4
    const sum = cardsState.reduce((accumulator, currentValue) => {
      console.log("currentValue:", currentValue.point);
      return accumulator + currentValue.point;
    }, 0);
    console.log("sum:", sum);
  };

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
      lastCardIndex: indexLocate,
    }));

    setCardsData(() => [...newCardsState]);
  };

  // leave arrow handle
  let leaveArrow = () => {
    cardsState[gameState.lastCardIndex] = {
      ...cardsState[gameState.lastCardIndex],
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
    let startIndex = movingMap.findIndex((a) => a == gameState.clickedID);

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
        console.log("im for loop");
        document.getElementById("arrowClick").play();
        setCardsData(() => [...newCardsState]);

        let indexOfMap = validateIndex(startIndex + index);

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

        if (index == point) {
          let result = turnResult(
            newCardsState,
            movingMap,
            movingMap[validateIndex(startIndex + point + 1)] - 1
          );

          gameState.isPlayerTwoNext
            ? setGamteState((prevState) => ({
                ...prevState,
                player2Point: prevState.player2Point + result,
              }))
            : setGamteState((prevState) => ({
                ...prevState,
                player1Point: prevState.player1Point + result,
              }));
        }
      }, 500 * index);
    }

    setTimeout(() => {
      console.log("hello am i before you");
      setGamteState((prevState) => ({
        ...prevState,
        isPlayerTwoNext: !prevState.isPlayerTwoNext,
      }));
    }, 500 * point);
  };

  let turnResult = (cardState, movingMap, nextCardIndex) => {
    // console.log("cardState turn:", cardState);
    let point = cardState[nextCardIndex].point;
    if (point != 0) {
      return 0;
    } else {
      // Exp :  move from Card 6 -> Card 7 (5,4,3,2,1,7)
      //      check point = Card 8.point == 0 ? getPoint(Card 9) && ++ checkPoint : return (-2-)
      //      while checkPoint == 0 => loop (-2-)
      let checkPoint = 0;
      let cardList = document.querySelectorAll(".card");
      let getPointCardIndex;
      // get which card is next
      let mapIndex = validateIndex(
        movingMap.findIndex((a) => a == nextCardIndex + 1)
      );

      cardState = cardState.map((card) => ({
        ...card,
        isChoosen: false,
        displayLeftArrow: false,
        displayRightArrow: false,
        isGreen: false,
      }));

      while (checkPoint == 0) {
        // know which card of being gotten point
        mapIndex = validateIndex(mapIndex + 1);
        // then get the index of that card
        getPointCardIndex = movingMap[mapIndex] - 1;

        if (cardState[getPointCardIndex].point == 0) {
          return point;
        }
        point += cardState[getPointCardIndex].point;

        getPointCardIndex == 0 || getPointCardIndex == 11
          ? (cardState[getPointCardIndex] = {
              ...cardState[getPointCardIndex],
              point: 0,
            })
          : (cardState[getPointCardIndex] = {
              ...cardState[getPointCardIndex],
              point: 0,
              pointArr: [],
            });

        // console.log("cardState:", cardState);
        setCardsData(() => [...cardState]);
        document.getElementById("getPoint").play();
        cardList[getPointCardIndex].classList.add("movingShadow");
        setTimeout(() => {
          cardList[getPointCardIndex].classList.remove("movingShadow");
        }, 500);

        // know which card of being gotten point
        mapIndex = validateIndex(mapIndex + 1);
        // then get the index of that card
        getPointCardIndex = movingMap[mapIndex] - 1;
        checkPoint = cardState[getPointCardIndex].point;
      }

      return point;
    }
  };

  let renderCards = cardsState.map((item) => (
    <Card
      key={item.id + "card"}
      data={item}
      isPlayerTwoNext={gameState.isPlayerTwoNext}
      cardClick={() => displayArrowClick(item.id)}
      hoverArrow={() => hoverArrow(item.displayLeftArrow)}
      leaveArrow={() => leaveArrow()}
      clickArrow={() => arrowClick()}
    />
  ));

  return (
    <div className="container">
      <Point
        isPlayerTwoNext={gameState.isPlayerTwoNext}
        p1Point={gameState.player1Point}
        p2Point={gameState.player2Point}
      />
      <div id="board" onPointerMove={(e) => handlePointerMove(e)}>
        {renderCards}
      </div>
      <button id="testBtn" onClick={() => reportPoint()}>
        GetPoin
      </button>
    </div>
  );
}
