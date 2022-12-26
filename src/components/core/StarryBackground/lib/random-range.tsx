type RandomRange = (min: number, max: number) => number;

export const randomRange: RandomRange = (min, max) => {
  return min + Math.random() * (max - min);
};
