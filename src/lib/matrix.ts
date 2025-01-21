export class Matrix<T> extends Array<T[]> {
  constructor(public width: number, public height: number, initValue: T) {
    super(height);
    this.fill([]);
    for (let y = 0; y < height; y++) {
      this[y] = new Array(width).fill(initValue);
    }
  }

  has(x: number, y: number): boolean {
    return x >= 0 && x < this.width && y >= 0 && y < this.height;
  }

  get(x: number, y: number): T | void {
    if (this.has(x, y)) return this[y][x];
  }

  set(x: number, y: number, value: T): void {
    if (this.has(x, y)) this[y][x] = value;
  }

  neighbors(x: number, y: number): T[] {
    // [x - 1, y - 1], [x, y - 1], [x + 1, y - 1],
    // [x - 1, y    ],             [x + 1, y    ],
    // [x - 1, y + 1], [x, y + 1], [x + 1, y + 1],

    const northWestX = x - 1;
    const northWestY = y - 1;

    const northX = x;
    const northY = y - 1;

    const northEastX = x + 1;
    const northEastY = y - 1;

    const westX = x - 1;
    const westY = y;

    const eastX = x + 1;
    const eastY = y;

    const southWestX = x - 1;
    const southWestY = y + 1;

    const southX = x;
    const southY = y + 1;

    const southEastX = x + 1;
    const southEastY = y + 1;

    const compass = [
      [northWestX, northWestY],
      [northX, northY],
      [northEastX, northEastY],
      [westX, westY],
      [eastX, eastY],
      [southWestX, southWestY],
      [southX, southY],
      [southEastX, southEastY],
    ];

    const neighbors = [];

    for (const [x, y] of compass) {
      const value = this.get(x, y);
      if (value) neighbors.push(value);
    }

    return neighbors;
  }
}
