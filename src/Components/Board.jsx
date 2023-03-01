import React, { useState } from "react";
import Square from "./Square";
import Arrow from "./Arrow";
import gameData from "../InitialData";

export default function Board() {
  const [boardData, setBoardData] = useState(gameData);
  const [gameState, setGameState] = useState({
    isPickSquare: false,
    isPickDirect: true,
    direct: "",
    isPlayerTwoNext: false,
  });
  const [playerPoint, setPlayerPoint] = useState({
    player1: 0,
    player2: 0,
  });

  const playerOneForward = [1, 2, 3, 4, 5, 6, 12, 11, 10, 9, 8, 7];
  const playerOneBackward = [1, 7, 8, 9, 10, 11, 12, 6, 5, 4, 3, 2];

  let mapByClick = (direct, player) => {
    switch (direct) {
      case "forward":
        switch (player) {
          case 1:
            return playerOneForward;
          case 2:
            return playerOneBackward;
        }
        break;
      case "backward":
        switch (player) {
          case 1:
            return playerOneBackward;
          case 2:
            return playerOneForward;
        }
        break;
    }
  };

  let addPointToPlayer = (point, isPlayer2) => {
    if (isPlayer2) {
      setPlayerPoint((prevState) => ({
        ...prevState,
        player2: playerPoint.player2 + point,
      }));
      console.log("player 2 point :", playerPoint.player2);
    } else {
      setPlayerPoint((prevState) => ({
        ...prevState,
        player1: playerPoint.player1 + point,
      }));
      console.log("player 1 point :", playerPoint.player1);
    }
  };

  let updatePlayerPoint = (index, map, data) => {
    let indexMap = map.findIndex((a) => a == index + 1);

    if (data[index].point != 0) {
      console.log("id", index + 1, "point", data[index].point);
      return data;
    } else {
      let check_index = map[indexMap] - 1;
      console.log("map", map);
      // let addPoint = 0;

      while (data[check_index].point == 0) {
        let nextIndex;
        gameState.direct == "forward"
          ? (nextIndex = check_index + 1)
          : (nextIndex = check_index - 1);

        nextIndex == 11 ? (nextIndex = -1) : nextIndex;
        console.log("nextIndex:", nextIndex);
        // make sure check_index + 1 = [0,11]

        // addPoint = data[indexMap + 1].point;
        // take point
        // addPointToPlayer(addPoint, gameState.isPlayerTwoNext);
        //update Player Point

        console.log("data[check_index + 1]:", data[nextIndex - 1]);
        // data[indexMap + 1] = {
        //   ...data[indexMap + 1],
        //   point: 0,
        //   pointArr: [],
        // };

        indexMap += 2;
        if (indexMap > 11) {
          indexMap -= 12;
        } else if (indexMap > 23) {
          indexMap -= 24;
        }
        check_index = map[indexMap] - 1;
      }

      return data;
    }
  };

  let chooseToMove = (item) => {
    let point = item.point;
    if (point == 0) {
      return;
    }

    let mapDirect = mapByClick(
      gameState.direct,
      gameState.isPlayerTwoNext ? 2 : 1
    );

    let indexOfMap = mapDirect.findIndex((a) => a == item.id);
    let clicked_square_index = boardData.findIndex((a) => {
      return a.id == item.id;
    });

    let newState = boardData;
    newState[clicked_square_index] = {
      ...newState[clicked_square_index],
      point: 0,
      pointArr: [],
    };

    for (let i = 1; i < point + 2; i++) {
      let indexMap = indexOfMap + i;
      if (indexMap > 11) {
        indexMap -= 12;
      } else if (indexMap > 23) {
        indexMap -= 24;
      }

      if (i == point + 1) {
        newState = updatePlayerPoint(
          mapDirect[indexMap] - 1,
          mapDirect,
          newState
        );
        break;
      }

      let index = mapDirect[indexMap] - 1;

      if (index !== 0 && index !== 11) {
        newState[index] = {
          ...newState[index],
          point: newState[index].point + 1,
          pointArr: [...newState[index].pointArr, newState[index].point + 1],
        };
      } else {
        newState[index] = {
          ...newState[index],
          point: newState[index].point + 1,
        };
      }
    }

    setBoardData(() => [...newState]);
    setGameState((prevState) => ({
      ...prevState,
      isPlayerTwoNext: !gameState.isPlayerTwoNext,
      isPickSquare: false,
      isPickDirect: true,
    }));
  };

  let renderSquares = boardData.map((item) => (
    <Square
      key={item.id}
      data={item}
      isPickSquare={gameState.isPickSquare}
      isPlayerTwoNext={gameState.isPlayerTwoNext}
      click={() => chooseToMove(item)}
    />
  ));

  let moveBackward = () => {
    setGameState((prevState) => ({
      ...prevState,
      isPickSquare: true,
      isPickDirect: false,
      direct: "backward",
    }));
  };

  let moveForward = () => {
    setGameState((prevState) => ({
      ...prevState,
      isPickSquare: true,
      isPickDirect: false,
      direct: "forward",
    }));
  };

  return (
    <div className="game">
      <Arrow
        direct={gameState.direct}
        backwardChoice={() => moveBackward(gameState.isPlayerTwoNext)}
        forwardChoice={() => moveForward(gameState.isPlayerTwoNext)}
      />
      <div className="board">{renderSquares}</div>
    </div>
  );
}
