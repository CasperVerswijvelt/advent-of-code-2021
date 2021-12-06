const fs = require("fs");

const text = fs.readFileSync(process.argv[2]).toString();
const lines = text.split("\r\n");

let gammaStr = ""
let epsilonStr = ""

for (let i = 0; i < lines[0].length; i ++) {

  oneCount = 0;
  zeroCount = 0;

  lines.forEach((line) => {

    if (line[i] === '1') {
      oneCount ++
    } else {
      zeroCount ++
    }
  });

  gammaStr += (zeroCount > oneCount) ? '0' : '1'
  epsilonStr += (zeroCount > oneCount) ? '1' : '0'
}

const gamma = parseInt(gammaStr, 2)
const epsilon = parseInt(epsilonStr, 2)

console.log(`Gamma: ${gammaStr} -> ${gamma}`)
console.log(`Epsilon: ${epsilonStr} -> ${epsilon}`)
console.log(`Power: ${epsilon * gamma}`)
