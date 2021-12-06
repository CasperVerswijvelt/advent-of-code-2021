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
let aim = 0

instructions.forEach((instruction) => {

  switch(instruction.instruction) {
    case 'forward':
      pos += instruction.value
      depth += aim*instruction.value
      break
    case 'down':
      aim += instruction.value
      break
    case 'up':
      aim -= instruction.value
      break
  }
});

console.log(`Ended up at position ${pos}, ${depth}, ${aim} (${pos*depth})`)