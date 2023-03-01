### Explaining _chooseToMove(item)_ function

```javascript
let chooseToMove = (item) => {
  let point = item.point;
  if (point == 0) {
    return;
  }
  // condition 1 : how many step to move
  // condition 2 : step = 0 => choose again!

  let mapDirect = mapByClick(
    gameState.direct,
    gameState.isPlayerTwoNext ? 2 : 1
  );
  // condition 3: which directions, map

  let indexOfMap = mapDirect.findIndex((a) => a == item.id);

  let clicked_square_index = boardData.findIndex((a) => {
    return a.id == item.id;
  });
  // condition 4: where is it

  let newState = boardData;
  newState[clicked_square_index] = {
    ...newState[clicked_square_index],
    point: 0,
    pointArr: [],
  };
  // clone data

  for (let i = 1; i < point + 2; i++) {
    // start the loop, chooseToMove only move 'point' steps, 'point + 1' is use for updatePlayerPoint
    let indexMap = indexOfMap + i;
    // (indexOfMap + i) can be > 12

    if (indexMap > 11) {
      indexMap -= 12;
    } else if (indexMap > 23) {
      indexMap -= 24;
    }
    // make sure indexMap stay in [0, 11] range, range value of GameData's indexs

    if (i == point + 1) {
      newState = updatePlayerPoint(
        mapDirect[indexMap] - 1,
        mapDirect,
        newState
      );
      break;
    }

    let index = mapDirect[indexMap] - 1;
    // mapDirect[indexMap] = which square is next
    // mapDirect[indexMap] - 1 = next square's index

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
```
