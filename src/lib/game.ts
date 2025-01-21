import { Matrix } from "./matrix.ts";

export class Game {
  nextState: Matrix<number>;

  constructor(public currState: Matrix<number>, seed: [number, number][]) {
    this.nextState = new Matrix(this.currState.width, this.currState.height, 0)
    for (const [x, y] of seed) {
      currState.set(x, y, 1);
    }
  }

  evolve() {
    for (let x = 0; x < this.currState.width; x++) {
      for (let y = 0; y < this.currState.height; y++) {
        const neighborsSum = this.currState.neighbors(x, y).reduce((a, b) => a + b, 0);
        if (neighborsSum < 2 || neighborsSum > 3) {
          this.nextState.set(x, y, 0);
        } else if (neighborsSum === 3) {
          this.nextState.set(x, y, 1);
        } else {
          this.nextState.set(x, y, this.currState.get(x, y) ?? 0);
        }
      }
    }
    this.currState = this.nextState;
    this.nextState = new Matrix(this.currState.width, this.currState.height, 0)
  }
}
