export let mapByClick = (index) => {
  // let mapindex = [0, {1, 2, 3, 4, 5}, {6, 7, 8, 9, 10}, 11];

  let left, right;

  left = index - 1;
  right = index + 1;

  if (index == 6) left = 0;
  if (index == 5) right = 11;

  return [left, right];
};

export let validateIndex = (index) => {
  let result = index > 11 ? (index -= 12) : index > 23 ? (index -= 24) : index;

  return result;
};

export let mapDirect = (direct, player) => {
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
