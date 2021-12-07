const fs = require("fs");

const text = fs.readFileSync(process.argv[2]).toString();
const lines = text.split("\r\n").map((line) => {
  let points = line.split(' -> ')

  return {
    x1: parseInt(points[0].split(',')[0]),
    y1: parseInt(points[0].split(',')[1]),
    x2: parseInt(points[1].split(',')[0]),
    y2: parseInt(points[1].split(',')[1]),
  }
});
const grid = []

let count = 0

lines.forEach((line) => {

  if (line.x1 === line.x2) {
    
    let max = Math.max(line.y1, line.y2)
    let min = Math.min(line.y1, line.y2)

    for (let i = min; i <= max; i ++) {

      incrementPos(line.x1, i)
    }
  }

  if (line.y1 === line.y2) {

    let max = Math.max(line.x1, line.x2)
    let min = Math.min(line.x1, line.x2)

    for (let i = min; i <= max; i ++) {

      incrementPos(i, line.y1)
    }
  }
});

function incrementPos(x,y) {

  if (!grid[y]) {
    grid[y] = []
  }

  grid[y][x] = grid[y][x] ? grid[y][x] + 1 : 1

  if (grid[y][x] === 2) {
    count++
  }
}

console.log(`Overlapping points: ${count}`)