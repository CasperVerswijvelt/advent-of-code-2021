const fs = require("fs");

const text = fs.readFileSync(process.argv[2]).toString();
const lines = text.split("\r\n");

const numbers = lines.map((line) => parseInt(line));

let previousNumber 
let increasedCount = 0

numbers.forEach((num) => {
  if (previousNumber && num > previousNumber) {
      increasedCount++
  }
  previousNumber = num
});

console.log(`Increase count: ${increasedCount}`)