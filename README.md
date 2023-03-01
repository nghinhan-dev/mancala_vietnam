# Explaining _chooseToMove(item)_ function

## 1. What is this function use for?

=> Moving points around the table

## 2. What it need ?

- Need to know which square was clicked

```javascript
let clicked_square_index = boardData.findIndex((a) => {
  return a.id == item.id;
});
```

- Need to know which direction to move

```javascript
let mapDirect = mapByClick(direct, playerturn);
```

- Need to know where is it

```javascript
let indexOfMap = mapDirect.findIndex((a) => a == item.id);
```

- How many step to move

  ```javascript
  let point = item.point;
  ```

  point need to be validate, point == 0 => return

- Clone the gameData to start updating

```javascript
let newState = boardData;
```
