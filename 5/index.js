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

  let minX = Math.min(line.x1, line.x2)
  let maxX = Math.max(line.x1, line.x2)

  let maxY = Math.max(line.y1, line.y2)
  let minY = Math.min(line.y1, line.y2)

  if (line.x1 === line.x2) {
    
    for (let i = minY; i <= maxY; i++) {

      incrementPos(line.x1, i)
    }
  }

  if (line.y1 === line.y2) {

    for (let i = minX; i <= maxX; i++) {

      incrementPos(i, line.y1)
    }
  }

  if (Math.abs(line.y1 - line.y2) === Math.abs(line.x1 - line.x2)) {

    let startY
    
    if (minX === line.x1) {

      startY = line.y1
    } else {

      startY = line.y2
    }

    let incr = startY === minY

    for (let x = minX; x <= maxX; x ++) {

      incrementPos(x, startY + ((x-minX)*(incr? 1 : -1)))
    }
  }
});
//console.log(grid.map(arr => arr.join('')).join('\n'))

function incrementPos(x,y) {

  if (!grid[y]) {
    grid[y] = [];
  }

  grid[y][x] = grid[y][x] ? grid[y][x] + 1 : 1

  if (grid[y][x] === 2) {
    count++
  }
}

console.log(`Overlapping points: ${count}`)