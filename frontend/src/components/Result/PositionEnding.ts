const PositionEnding = (position: number) => {
  if (
    (position >= 10 && position <= 20) ||
    (position % 10 != 1 && position % 10 != 2 && position % 10 != 3)
  ) {
    return "th";
  }

  switch (position % 10) {
    case 1:
      return "st";
    case 2:
      return "nd";
    case 3:
      return "rd";
    default:
      return "th";
  }
};

export default PositionEnding;
