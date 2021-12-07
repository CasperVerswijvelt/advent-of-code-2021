const { Console } = require("console");
const fs = require("fs");

const text = fs.readFileSync(process.argv[2]).toString();
const lines = text.split("\r\n");

const numbers = lines[0].split(',').map(num => parseInt(num)).sort((a,b) => a - b);

const half = Math.floor(numbers.length / 2);
const median = numbers.length % 2
    ? numbers[half]
    : (numbers[half - 1] + numbers[half]) / 2.0

let min
let max
numbers.forEach (number => {
  if (typeof min === 'undefined' || number < min) {
    min = number
  }
  if (typeof max === 'undefined' || number > max) {
    max = number
  }
})

const idealPosition = median

// Bruteforce check every position
let leastFuel
for (let i = min; i <= max; i++) {
  let totalFuel = calcFuelForPosition(i)

  if (typeof leastFuel === 'undefined' || totalFuel < leastFuel) {

    leastFuel = totalFuel
  }
}

function calcFuelForPosition (position) {
  let fueld = 0
  numbers.forEach (number => {
    fueld += calcFuel(Math.abs(number - position))
  })
  return fueld
}

function calcFuel (distance) {
  let fuel = 0
  for (let i = 1; i <= distance; i++) {
    fuel+=i
  }
  return fuel
}

console.log(`Optimal fuel consumption: ${leastFuel}`)