const fs = require("fs");

const text = fs.readFileSync(process.argv[2]).toString();

const grid = text.split("\r\n").map((line) => line.split("").map(text => parseInt(text)));

let sum = 0

for (let row = 0; row < grid.length; row++) {
  for (let col = 0; col < grid[row].length; col++) {
    if (isLowPoint(row, col)) {
      let risk = 1 + grid[row][col]
      sum += risk
    }
  }
}

function isLowPoint(row, col) {
  
  const top = (
    row === 0 || 
    grid[row][col] < grid[row - 1][col]
  )
  const bottom = (
    row === (grid.length - 1) || 
    grid[row][col] < grid[row + 1][col]
  )
  const left = (
    col === 0 || 
    grid[row][col] < grid[row][col - 1]
  )
  const rigth = (
    col === (grid[row].length - 1) || 
    grid[row][col] < grid[row][col + 1]
  )
  return top && bottom && left && rigth
}

console.log(`Sum of low point risks: ${sum}`)