type LineToAngle = (
  x1: number,
  y1: number,
  length: number,
  radians: number
) => {
  x: number;
  y: number;
};

export const lineToAngle: LineToAngle = (x1, y1, length, radians) => {
  const x2 = x1 + length * Math.cos(radians);
  const y2 = y1 + length * Math.sin(radians);
  return { x: x2, y: y2 };
};
