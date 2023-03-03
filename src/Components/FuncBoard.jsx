export let mapByClick = (direct, player) => {
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
