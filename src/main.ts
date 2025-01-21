import { Matrix } from "./lib/matrix.ts";
import { Game } from "./lib/game.ts";
import { seed } from "./seed.ts";

const table = document.querySelector("table");
const widthInput = document.querySelector<HTMLInputElement>("#width");
const heightInput = document.querySelector<HTMLInputElement>("#height");
const evolveBtn = document.querySelector<HTMLButtonElement>("#evolve");
const seedBtn = document.querySelector<HTMLButtonElement>("#seed");
const clearBtn = document.querySelector<HTMLButtonElement>("#clear");

let game = new Game(
  new Matrix(
    Number(widthInput?.value),
    Number(heightInput?.value),
    0,
  ),
  seed,
);

function seedBoard() {
  game = new Game(
    new Matrix(
      Number(widthInput?.value) ?? 25,
      Number(heightInput?.value) ?? 25,
      0,
    ),
    seed,
  );
}

function renderBoard() {
  if (!table) return;
  table.innerHTML = "";

  for (let y = 0; y <= Number(heightInput?.value); y++) {
    const row = document.createElement("tr");
    for (let x = 0; x <= Number(widthInput?.value); x++) {
      const cell = document.createElement("td");
      cell.setAttribute("data-x", x.toString());
      cell.setAttribute("data-y", y.toString());
      cell.innerHTML = game.currState.get(x, y) ? "🌞" : "🌚";
      row.appendChild(cell);
    }
    table.appendChild(row);
  }
}

function clearBoard() {
  game = new Game(
    new Matrix(
      Number(widthInput?.value) ?? 25,
      Number(heightInput?.value) ?? 25,
      0,
    ),
    [],
  );
}

globalThis.addEventListener("DOMContentLoaded", renderBoard);

clearBtn?.addEventListener("click", () => {
  clearBoard();
  renderBoard();
});

seedBtn?.addEventListener("click", () => {
  seedBoard();
  renderBoard();
});

let timerId = 0;
evolveBtn?.addEventListener("click", () => {
  if (timerId) {
    clearInterval(timerId);
    timerId = 0;
    evolveBtn.innerHTML = "evolve";
    widthInput!.disabled = false;
    heightInput!.disabled = false;
  } else {
    timerId = setInterval(() => {
      game.evolve();
      renderBoard();
    }, 400);
    evolveBtn.innerHTML = "stop";
    widthInput!.disabled = true;
    heightInput!.disabled = true;
  }
});

table?.addEventListener("click", (e) => {
  if (timerId) return;
  const target = e.target as HTMLElement;
  if (target?.tagName !== "TD") return;
  const x = Number(target.getAttribute("data-x"));
  const y = Number(target.getAttribute("data-y"));
  game.currState.set(x, y, game.currState.get(x, y) ? 0 : 1);
  renderBoard();
});

widthInput?.addEventListener("input", (e) => {
  const target = e.target as HTMLInputElement;
  game = new Game(
    new Matrix(
      Number(target?.value),
      Number(heightInput?.value),
      0,
    ),
    seed,
  );
  renderBoard()
})

heightInput?.addEventListener("input", (e) => {
  const target = e.target as HTMLInputElement;
  game = new Game(
    new Matrix(
      Number(widthInput?.value),
      Number(target?.value),
      0,
    ),
    seed,
  );
  renderBoard()
})
