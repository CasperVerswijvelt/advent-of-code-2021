const fs = require("fs");

const text = fs.readFileSync(process.argv[2]).toString();
const lines = text.split("\r\n");

const numbers = lines.map((line) => parseInt(line));

let previousSum
let previousPreviousNumber
let previousNumber 
let increasedCount = 0
let sumIncreasedCount = 0

numbers.forEach((num) => {

  if (previousNumber && num > previousNumber) {
      increasedCount++
  }

  if (previousNumber && previousPreviousNumber) {

    const sum = previousPreviousNumber + previousNumber + num

    if (previousSum && sum > previousSum) {

        sumIncreasedCount++
    }

    previousSum = sum
  } 

  previousPreviousNumber = previousNumber
  previousNumber = num
});

console.log(`Increase count: ${increasedCount}`)
console.log(`Sum increase count: ${sumIncreasedCount}`)