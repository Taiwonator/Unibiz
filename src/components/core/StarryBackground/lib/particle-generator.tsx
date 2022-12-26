const particle = {
  x: 0,
  y: 0,
  vx: 0,
  vy: 0,
  radius: 0,

  create: function (
    x: number,
    y: number,
    speed: number,
    direction: number
  ): any {
    const obj = Object.create(this);
    obj.x = x;
    obj.y = y;
    obj.vx = Math.cos(direction) * speed;
    obj.vy = Math.sin(direction) * speed;
    return obj;
  },

  getSpeed: function (): number {
    return Math.sqrt(this.vx * this.vx + this.vy * this.vy);
  },

  setSpeed: function (speed: number): void {
    const heading = this.getHeading();
    this.vx = Math.cos(heading) * speed;
    this.vy = Math.sin(heading) * speed;
  },

  getHeading: function (): number {
    return Math.atan2(this.vy, this.vx);
  },

  setHeading: function (heading: number): void {
    const speed = this.getSpeed();
    this.vx = Math.cos(heading) * speed;
    this.vy = Math.sin(heading) * speed;
  },

  update: function (): void {
    this.x += this.vx;
    this.y += this.vy;
  },
};

const generateParticle = () => particle;

export default generateParticle;
