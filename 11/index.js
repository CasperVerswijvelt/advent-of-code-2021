const fs = require("fs");

const text = fs.readFileSync(process.argv[2]).toString();
const lines = text.split("\r\n");

const octopi = lines.map((line) => line.split("").map(character => parseInt(character)));

const steps = 100
let flashCount = 0

for (let i = 0;; i++) {

  // Step flashed tracker
  const flashTracker = []
  for (let row = 0; row < octopi.length; row++) {
    flashTracker[row] = []
    for (let col = 0; col < octopi[row].length; col++) {
      flashTracker[row][col] = false
    }
  }

  // Increase energy levels by 1
  for (let row = 0; row < octopi.length; row++) {
    for (let col = 0; col < octopi[row].length; col++) {
      octopi[row][col]++
    }
  }

  // Flash
  for (let row = 0; row < octopi.length; row++) {
    for (let col = 0; col < octopi[row].length; col++) {
      flashCount += checkFlashCount(row, col, flashTracker)
    }
  }

  // Reset energy of flashed octopi
  for (let row = 0; row < octopi.length; row++) {
    for (let col = 0; col < octopi[row].length; col++) {
      if (flashTracker[row][col]) {
        octopi[row][col] = 0
      }
    }
  }

  if (i === steps -1) {
    console.log(`Total flash count after ${steps} steps: ${flashCount}`)
  }

  // Check simulateneous flash
  let foundNotFlash = false
  for (let row = 0; row < octopi.length; row++) {
    for (let col = 0; col < octopi[row].length; col++) {
      if (!flashTracker[row][col]) {
        foundNotFlash = true
        break
      }
    }
    if (foundNotFlash) break
  }
  if (!foundNotFlash) {
    console.log(`First simultaneous flash at step ${i + 1}`)
    break
  }

  function checkFlashCount (row, col) {

    if (octopi[row] && typeof octopi[row][col] === 'number') {
  
      if (octopi[row][col] > 9 && !flashTracker[row][col]) {

        flashTracker[row][col] = true
    
        increaseOctopus(row - 1, col - 1)
        increaseOctopus(row - 1, col)
        increaseOctopus(row - 1, col + 1)
        increaseOctopus(row, col - 1)
        increaseOctopus(row, col + 1)
        increaseOctopus(row + 1, col - 1)
        increaseOctopus(row + 1, col)
        increaseOctopus(row + 1, col + 1)
  
        return 1 + 
          checkFlashCount(row - 1, col - 1) +
          checkFlashCount(row - 1, col) +
          checkFlashCount(row - 1, col + 1) +
          checkFlashCount(row, col - 1) +
          checkFlashCount(row, col + 1) +
          checkFlashCount(row + 1, col - 1) +
          checkFlashCount(row + 1, col) +
          checkFlashCount(row + 1, col + 1)
      }
    }
  
    return 0
  }
}

function increaseOctopus(row, col) {
  if (octopi[row] && typeof octopi[row][col] === 'number') {
    octopi[row][col]++
  }
}