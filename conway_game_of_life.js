const fs = require('fs');

const input = fs.readFileSync('params.txt', 'utf8');
const lines = input.split('\n');
const numGenerations = parseInt(lines[0], 10);
const fieldWidth = parseInt(lines[1].split(' ')[0], 10);
const fieldHeight = parseInt(lines[1].split(' ')[1], 10);
let startingField = lines.slice(2).map(line => line.split('').map(cell => cell === 'x' ? 1 : 0));

function saveOutput(data) {
  fs.writeFileSync('output.txt', data);
}

function printField(field) {
  let emptyArray = []
  for (let y = 0; y < fieldHeight; y++) {
    emptyArray.push(field[y].map(cell => cell === 1 ? 'x' : '.').join(''))
  }
  let fieldArray  = emptyArray.join('\n')
  return fieldArray;
}

function countNeighbors(field, x, y) {
  let neighbors = 0;
  for (let dy = -1; dy <= 1; dy++) {
    for (let dx = -1; dx <= 1; dx++) {
      if (dy === 0 && dx === 0) continue;
      let nx = x + dx;
      let ny = y + dy;
      if (nx < 0) nx = fieldWidth - 1;
      if (nx >= fieldWidth) nx = 0;
      if (ny < 0) ny = fieldHeight - 1;
      if (ny >= fieldHeight) ny = 0;
      if (field[ny][nx] === 1) neighbors++;
    }
  }
  return neighbors;

}

function updateField(field) {
  let newField = [];
  for (let y = 0; y < fieldHeight; y++) {
    newField[y] = [];
    for (let x = 0; x < fieldWidth; x++) {
      newField[y][x] = 0;
    }
  }
  for (let y = 0; y < fieldHeight; y++) {
    for (let x = 0; x < fieldWidth; x++) {
      let neighbors = countNeighbors(field, x, y);

      if (field[y][x] === 1) {
        if (neighbors === 2 || neighbors === 3) newField[y][x] = 1;
      } else {
        if (neighbors === 3) newField[y][x] = 1;
      }
    }
  }
  return newField;
}
for (let i = 0; i < numGenerations; i++) {
  startingField = updateField(startingField);
}

saveOutput(printField(startingField))

module.exports = { countNeighbors, updateField, printField, saveOutput }
