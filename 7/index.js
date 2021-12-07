const { Console } = require("console");
const fs = require("fs");

const text = fs.readFileSync(process.argv[2]).toString();
const lines = text.split("\r\n");

const numbers = lines[0].split(',').map(num => parseInt(num)).sort((a,b) => a - b);

const half = Math.floor(numbers.length / 2);
const median = numbers.length % 2
    ? numbers[half]
    : (numbers[half - 1] + numbers[half]) / 2.0

let fuel = 0

numbers.forEach (number => {
  fuel += Math.abs(number - median)
})

console.log(`Optimal fuel consumption: ${fuel}`)