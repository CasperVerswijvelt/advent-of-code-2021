const fs = require("fs");

const text = fs.readFileSync(process.argv[2]).toString();
const lines = text.split("\r\n");

const instructions = lines.map((line) => {
    const split = line.split(" ")
    return {
        instruction: split[0],
        value: parseInt(split[1])
    }
});

let pos = 0
let depth = 0

instructions.forEach((instruction) => {

  switch(instruction.instruction) {
    case 'forward':
      pos += instruction.value
      break
    case 'down':
      depth += instruction.value
      break
    case 'up':
      depth -= instruction.value
      break
  }
});

console.log(`Ended up at position ${pos}, ${depth} (${pos*depth})`)