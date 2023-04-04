let mapByClick = (index) => {
  // let mapindex = [0, {1, 2, 3, 4, 5}, {6, 7, 8, 9, 10}, 11];

  let left, right;

  left = index - 1;
  right = index + 1;

  if (index == 6) left = 0;
  if (index == 5) right = 11;

  return [left, right];
};

export let validateIndex = (index) => {
  // console.log("indexMap:", index);
  let result = index > 23 ? (index -= 24) : index > 11 ? (index -= 12) : index;

  // console.log("result:", result);
  return result;
};

export let getMovingMap = (direct, player) => {
  switch (direct) {
    case "forward":
      switch (player) {
        case 1:
          return [1, 2, 3, 4, 5, 6, 12, 11, 10, 9, 8, 7];
        case 2:
          return [1, 7, 8, 9, 10, 11, 12, 6, 5, 4, 3, 2];
      }
      break;
    case "backward":
      switch (player) {
        case 1:
          return [1, 7, 8, 9, 10, 11, 12, 6, 5, 4, 3, 2];
        case 2:
          return [1, 2, 3, 4, 5, 6, 12, 11, 10, 9, 8, 7];
      }
      break;
  }
};

export let handlePointerMove = (e) => {
  for (const card of document.getElementsByClassName("card")) {
    const rect = card.getBoundingClientRect(),
      x = e.clientX - rect.left,
      y = e.clientY - rect.top;

    card.style.setProperty("--mouse-x", `${x}px`);
    card.style.setProperty("--mouse-y", `${y}px`);
  }
};

export let displayArrow = (id, data) => {
  let clicked_card_index = data.findIndex((a) => {
    return a.id == id;
  });

  let left_index = mapByClick(id - 1)[0];
  let right_index = mapByClick(id - 1)[1];

  // clone cardsState
  let newCardsState = data;

  // unchoosen other cards
  newCardsState = newCardsState.map((card) => ({
    ...card,
    isChoosen: false,
    displayLeftArrow: false,
    displayRightArrow: false,
  }));

  // check re-choose the same card
  if (data[clicked_card_index].isChoosen) {
    return newCardsState;
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

  return newCardsState;
};
