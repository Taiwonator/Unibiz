type DegreesToRads = (degrees: number) => number;

export const degreesToRads: DegreesToRads = (degrees) => {
  return (degrees / 180) * Math.PI;
};
