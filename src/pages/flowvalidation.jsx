export const validateInput = (value, min = 0, max = Infinity) => {
  const number = Number(value);
  return !isNaN(number) && number >= min && number <= max;
};
