import { Matrix } from "./matrix.ts";
import { assertEquals } from "@std/assert";

Deno.test("matrix#ctor", () => {
  const matrix = new Matrix(3, 3, 0);
  assertEquals(matrix.length, 3);
  for (const row of matrix) {
    assertEquals(row.length, 3);
  }
});

Deno.test("matrix#has", () => {
  const matrix = new Matrix(3, 3, 0);
  assertEquals(matrix.has(0, 0), true);
  assertEquals(matrix.has(3, 3), false);
});

Deno.test("matrix#get", () => {
  const matrix = new Matrix(3, 3, 0);
  assertEquals(matrix.get(0, 0), 0);
  matrix[1][1] = 1;
  assertEquals(matrix.get(1, 1), 1);
});

Deno.test("matrix#set", () => {
  const matrix = new Matrix(3, 3, 0);
  matrix.set(1, 1, 1);
  assertEquals(matrix[1][1], 1);
});

Deno.test("matrix#neighbors", () => {
  const matrix = new Matrix(3, 3, 0);
  matrix.set(0, 0, 1);
  matrix.set(0, 2, 1);
  matrix.set(2, 0, 1);
  matrix.set(2, 2, 1);
  assertEquals(matrix.neighbors(0, 0), [0, 0, 0]);
  assertEquals(matrix.neighbors(1, 1), [1, 0, 1, 0, 0, 1, 0, 1]);
  assertEquals(matrix.neighbors(2, 2), [0, 0, 0]);
});
