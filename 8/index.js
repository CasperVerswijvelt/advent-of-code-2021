const fs = require("fs");

const text = fs.readFileSync(process.argv[2]).toString();
const lines = text.split("\r\n");

const entries = lines.map(line => line.split(' | ')).map(split => {
  return {
    data: split[0].split(' '),
    code: split[1].split(' ')
  }
});

let count = 0
entries.forEach((entry) => {

  entry.code.forEach(value => {
    switch(value.length) {
      case 2:
      case 3:
      case 4:
      case 7:
        count++
        break
    }
  })
});

console.log(`Unique values in output: ${count}`)