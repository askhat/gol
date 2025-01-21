import { Matrix } from "./matrix.ts";
import { Game } from "./game.ts";
import { assertEquals } from "@std/assert";

Deno.test("game#ctor", () => {
  const matrix = new Matrix(3, 3, 0);
  const game = new Game(matrix, [[0, 1], [1, 1], [2, 1]]);

  assertEquals(game.currState.get(0, 0), 0);
  assertEquals(game.currState.get(0, 1), 1);
  assertEquals(game.currState.get(0, 2), 0);

  assertEquals(game.currState.get(1, 0), 0);
  assertEquals(game.currState.get(1, 1), 1);
  assertEquals(game.currState.get(1, 2), 0);

  assertEquals(game.currState.get(2, 0), 0);
  assertEquals(game.currState.get(2, 1), 1);
  assertEquals(game.currState.get(2, 2), 0);
});

Deno.test("game#evolve", () => {
  const game = new Game(new Matrix(3, 3, 0), [[1, 0], [1, 1], [1, 2]]);

  game.evolve();

  assertEquals(game.currState.get(0, 0), 0)
  assertEquals(game.currState.get(1, 0), 0)
  assertEquals(game.currState.get(2, 0), 0)

  assertEquals(game.currState.get(0, 1), 1)
  assertEquals(game.currState.get(1, 1), 1)
  assertEquals(game.currState.get(2, 1), 1)

  assertEquals(game.currState.get(0, 2), 0)
  assertEquals(game.currState.get(1, 2), 0)
  assertEquals(game.currState.get(2, 2), 0)

  game.evolve();

  assertEquals(game.currState.get(0, 0), 0)
  assertEquals(game.currState.get(1, 0), 1)
  assertEquals(game.currState.get(2, 0), 0)

  assertEquals(game.currState.get(0, 1), 0)
  assertEquals(game.currState.get(1, 1), 1)
  assertEquals(game.currState.get(2, 1), 0)

  assertEquals(game.currState.get(0, 2), 0)
  assertEquals(game.currState.get(1, 2), 1)
  assertEquals(game.currState.get(2, 2), 0)
});
