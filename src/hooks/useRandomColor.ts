export const useRandomColor = (min = 150, max = 200) => {
  function randomNumber(min: number, max: number) {
    const num = Math.floor(Math.random() * (max - min) + min);
    return num;
  }

  const randomColor = (min: number, max: number) => {
    const r = randomNumber(min, max);
    const g = randomNumber(min, max);
    const b = randomNumber(min, max);

    return `rgb(${r},${g},${b})`;
  };
  return {
    randomNumber,
    randomColor,
    color: randomColor(min, max),
  };
};
