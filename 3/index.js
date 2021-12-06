const fs = require("fs");

const text = fs.readFileSync(process.argv[2]).toString();
const lines = text.split("\r\n");

let gammaStr = ""
let epsilonStr = ""
let oxygenStr = ""
let co2Str = ""

let oxygenFiltered = lines.slice()
let co2Filtered = lines.slice()

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

  let mostCommon = (zeroCount > oneCount) ? '0' : '1'
  let leastCommon = (zeroCount > oneCount) ? '1' : '0'

  gammaStr += mostCommon
  epsilonStr += leastCommon

  oneCount = 0
  zeroCount = 0

  oxygenFiltered.forEach((line) => {

    if (line[i] === '1') {
      oneCount ++
    } else {
      zeroCount ++
    }
  });

  mostCommon = (zeroCount > oneCount) ? '0' : '1'
  leastCommon = (zeroCount > oneCount) ? '1' : '0'

  oxygenFiltered = oxygenFiltered.filter(el => el[i] === mostCommon)
  if (oxygenFiltered.length === 1 && !oxygenStr) {

    oxygenStr = oxygenFiltered[0]
  }

  oneCount = 0
  zeroCount = 0

  co2Filtered.forEach((line) => {

    if (line[i] === '1') {
      oneCount ++
    } else {
      zeroCount ++
    }
  });

  mostCommon = (zeroCount > oneCount) ? '0' : '1'
  leastCommon = (zeroCount > oneCount) ? '1' : '0'

  co2Filtered = co2Filtered.filter(el => el[i] === leastCommon)
  if (co2Filtered.length === 1 && !co2Str) {

    co2Str = co2Filtered[0]
  }
}

const gamma = parseInt(gammaStr, 2)
const epsilon = parseInt(epsilonStr, 2)
const oxygen = parseInt(oxygenStr, 2)
const co2 = parseInt(co2Str, 2)

console.log(`Gamma: ${gammaStr} -> ${gamma}`)
console.log(`Epsilon: ${epsilonStr} -> ${epsilon}`)
console.log(`Power: ${epsilon * gamma}`)
console.log()
console.log(`Oxygen generator: ${oxygenStr} -> ${oxygen}`)
console.log(`CO2 scrubber: ${co2Str} -> ${co2}`)
console.log(`Life support: ${oxygen * co2}`)
