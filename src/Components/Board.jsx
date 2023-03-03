import React, { useState } from "react";
import Square from "./Square";
import Arrow from "./Arrow";
import Point from "./Point";
import gameData from "../InitialData";
import { mapByClick } from "./FuncBoard";

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

  let addPointToPlayer = (point, isPlayer2) => {
    if (isPlayer2) {
      setPlayerPoint((prevState) => ({
        ...prevState,
        player2: prevState.player2 + point,
      }));
    } else {
      setPlayerPoint((prevState) => ({
        ...prevState,
        player1: prevState.player1 + point,
      }));
    }
  };

  let updatePlayerPoint = (index, map, data) => {
    let indexMap = map.findIndex((a) => a == index + 1);

    if (data[index].point != 0) {
      return data;
    } else {
      let check_index = map[indexMap] - 1;
      let step = 0;
      let addPoint = 0;

      while (data[check_index].point == 0) {
        indexMap++;
        step++;
        if (indexMap > 11) {
          indexMap -= 12;
        } else if (indexMap > 23) {
          indexMap -= 24;
        }

        let ix = map[indexMap] - 1;

        // console.log("data:", data[ix]);
        addPoint = data[ix].point;
        addPointToPlayer(addPoint, gameState.isPlayerTwoNext);

        if (ix !== 0 && ix !== 11) {
          data[ix] = {
            ...data[ix],
            point: 0,
            pointArr: [],
          };
        } else {
          data[ix] = {
            ...data[ix],
            point: 0,
          };
        }

        if (step == 5) {
          return data;
        }

        indexMap++;
        indexMap > 11 ? (indexMap -= 12) : "";
        step++;
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
      <Point player1={playerPoint.player1} player2={playerPoint.player2} />
    </div>
  );
}
