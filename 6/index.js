const { Console } = require("console");
const fs = require("fs");

const text = fs.readFileSync(process.argv[2]).toString();
const lines = text.split("\r\n");

const numbers = lines[0].split(',')

const days = 256
const timers = Array(9).fill(0)

numbers.forEach (number => {
  timers[number]++
})

console.log(`Initial state: \t\t${numbers.join(',')}`)

for (let day = 1; day <= days; day++) {

  let cpy = timers.slice()
  
  timers[8] = cpy[0]
  timers[7] = cpy[8]
  timers[6] = cpy[7] + cpy[0]
  timers[5] = cpy[6]
  timers[4] = cpy[5]
  timers[3] = cpy[4]
  timers[2] = cpy[3]
  timers[1] = cpy[2]
  timers[0] = cpy[1]

  console.log(`After\t${day}\tdays:\t${timers.reduce((previousValue, currentValue) => previousValue + currentValue)}`)
  //console.log(day)
}

console.log(`Fish count:\t${timers.reduce((previousValue, currentValue) => previousValue + currentValue)}`)