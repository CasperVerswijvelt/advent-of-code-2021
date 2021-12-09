const fs = require("fs");

const text = fs.readFileSync(process.argv[2]).toString();

const grid = text.split("\r\n").map((line) => line.split("").map(text => parseInt(text)));

let sum = 0
let basinSizes = []
const lowPoints = []
const checkedCoordinates = grid.map(row => row.slice().fill(false))

for (let row = 0; row < grid.length; row++) {
  for (let col = 0; col < grid[row].length; col++) {
    if (isLowPoint(row, col)) {
      lowPoints.push({
        row: row,
        col: col
      })
      let risk = 1 + grid[row][col]
      sum += risk
    }
  }
}

lowPoints.forEach(lowPoint => {
  let basinSize = findBasinSize(lowPoint.row, lowPoint.col)
  if (basinSize) {
    basinSizes.push(basinSize)
  }
})

function findBasinSize(row, col) {

  if (
    grid[row] &&
    typeof grid[row][col] === 'number' &&
    !checkedCoordinates[row][col]
  ) {

    checkedCoordinates[row][col] = true

    if (grid[row][col] === 9) return 0

    return 1 + 
      findBasinSize(row-1,col) +
      findBasinSize(row+1,col) +
      findBasinSize(row,col-1) +
      findBasinSize(row,col+1)
  }

  return 0
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
console.log(`Product of basin sizes: ${basinSizes.sort((a,b) => b-a).slice(0,3).reduce((a,b)=>a*b)}`)