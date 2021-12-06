const fs = require("fs");
const { exit } = require("process");

const text = fs.readFileSync(process.argv[2]).toString();
const split = text.split("\r\n\r\n");

const numbers = split.splice(0,1)[0].split(',')

const grids = []

split.forEach(el => {

  grids.push(el.split("\r\n").map(text => text.trim().split(/\s+/)))
})

numbers.forEach (number => {
  runNumber(number)

  grids.forEach(grid => {
    if (checkGrid(grid)) {
      console.log (grid, number * gridSum(grid))
      grids.splice(grids.indexOf(grid), 1)
    }
  })
})

function runNumber (number) {

  console.log(`Running number ${number}`)

  grids.forEach (grid => {

    for (let row = 0; row < grid.length; row++) {
      for (let col = 0; col < grid[row].length; col++) {
        if (grid[row][col] === number) {
          grid[row][col] = grid[row][col] + ' '
        }
      }
    }
  })
}


function checkGrid (grid, log) {

  for (let row of grid) {
    if (row.every(el => el.endsWith(' '))) {
      return true
    }
  }

  for (let col = 0; col < grid[0].length; col++) {
    let found = true
    for (let row = 0; row < grid.length; row++) {
      if (!grid[row][col].endsWith(' ')) {
       found = false
      }
    }
    if (found) return true
  }

  return false
}

function gridSum (grid) {
  let sum = 0
  for (let row = 0; row < grid.length; row++) {
    for (let col = 0; col < grid[row].length; col++) {
      if (!grid[row][col].endsWith(' ')) {
         sum+= parseInt(grid[row][col])
      }
    }
  }
  return sum
}