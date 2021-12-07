const { Console } = require("console");
const fs = require("fs");

const text = fs.readFileSync(process.argv[2]).toString();
const lines = text.split("\r\n");

const numbers = lines[0].split(',')

console.log(`Initial state: \t\t${numbers.join(',')}`)

const days = 80

for (let day = 1; day <= days; day++) {

  for (let i = numbers.length - 1; i >= 0; i--) {
    
    if (numbers[i] === 0) {

      numbers[i] = 6
      numbers.push(8)
    } else {

      numbers[i]--
    }
  }

  //console.log(`After\t${day}\tdays:\t${numbers.join(',')}`)
  //console.log(day)
}

console.log(`Fish count:\t${numbers.length}`)