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
  const [playerState, setPlayerState] = useState({
    pointofPlayer1: 0,
    pointofPlayer2: 0,
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

  let updatePlayerPoint = (index, map, data) => {
    let indexMap = map.findIndex((a) => a == index + 1);
    // let addPoint = 0;

    if (data[index].point != 0) {
      console.log("data[index] :", data[index]);
      return data;
    } else {
      console.log("i'm calculating");

      let check_index = map[indexMap] - 1;
      console.log("data[check_index]:", data[check_index]);

      return data;
    }
  };

  let chooseToMove = (item) => {
    let point = item.point;

    let mapDirect = mapByClick(
      gameState.direct,
      gameState.isPlayerTwoNext ? 1 : 2
    );

    // console.log("mapDirect:", mapDirect);

    let indexMapDirect = mapDirect.findIndex((a) => a == item.id);
    // console.log("indexMapDirect:", indexMapDirect);

    let clicked_square_index = boardData.findIndex((a) => {
      return a.id == item.id;
    });
    // console.log("clicked_square_index:", clicked_square_index, "\n");

    let newState = boardData;
    newState[clicked_square_index] = {
      ...newState[clicked_square_index],
      point: 0,
      pointArr: [],
    };

    for (let i = 1; i < point + 2; i++) {
      let indexMap = indexMapDirect + i;
      if (indexMap > 11) {
        indexMap -= 12;
      } else if (indexMap > 23) {
        indexMap -= 24;
      }
      // make indexMap stay in the range of [0,11] (index of mapDirect)
      // => mapDirect[indexMap] = id  => id - 1 = index

      if (i == point + 1) {
        newState = updatePlayerPoint(
          mapDirect[indexMap] - 1,
          mapDirect,
          newState
        );
        break;
      }

      let index = mapDirect[indexMap] - 1;
      // console.log("index:", index);
      // mapDirect[indexMap] return the id of the square => current index = id - 1 = index of the squares which being +1 point

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
    if (!gameState.isPlayerTwoNext) {
      setGameState(() => ({
        isPickSquare: true,
        isPickDirect: false,
        isPlayerTwoNext: true,
        direct: "backward",
      }));
    } else {
      setGameState(() => ({
        isPickSquare: true,
        isPickDirect: false,
        isPlayerTwoNext: false,
        direct: "backward",
      }));
    }
  };

  let moveForward = () => {
    if (!gameState.isPlayerTwoNext) {
      setGameState(() => ({
        isPickSquare: true,
        isPickDirect: false,
        isPlayerTwoNext: true,
        direct: "forward",
      }));
    } else {
      setGameState(() => ({
        isPickSquare: true,
        isPickDirect: false,
        isPlayerTwoNext: false,
        direct: "forward",
      }));
    }
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
