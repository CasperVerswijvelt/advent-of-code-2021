const fs = require("fs");
const { exit } = require("process");

const text = fs.readFileSync(process.argv[2]).toString();
const lines = text.split("\r\n");

const entries = lines.map(line => line.split(' | ')).map(split => {
  return {
    data: split[0].split(' ').map(val => val.split('').sort().join('')),
    code: split[1].split(' ').map(val => val.split('').sort().join(''))
  }
});

let total = 0
entries.forEach((entry) => {
  
  const map = {}
  const reverseMap = {}

  function setValue(text, value) {
    reverseMap[value] = text
    map[text] = value
  }

  // Populate initial certain data
  entry.data.concat(entry.code).forEach(value => {
    let numValue = getLengthValue(value.length)
    if (numValue !== -1) {
      setValue(value, numValue)
    }
  })

  entry.data.concat(entry.code).forEach(value => {
    if (!reverseMap[value]) {

      if (value.length === 5) {
        if (matchingLetters(reverseMap[1], value) === 2) {
          setValue(value, 3)
        }
        if (matchingLetters(reverseMap[7], value) === 2 && matchingLetters(reverseMap[4], value) === 3) {
          setValue(value, 5)
        }
      }

      if (value.length === 6) {
        if (matchingLetters(reverseMap[4], value) === 4) {
          setValue(value, 9)
        }

        if (matchingLetters(reverseMap[4], value) === 3 && matchingLetters(reverseMap[1], value) === 1) {
          setValue(value, 6)
        }
      }
    }
  })

  entry.data.concat(entry.code).forEach(value => {
    if (!map[value]) {

      if (value.length === 5) {
        setValue(value, 2)
      }

      if (value.length === 6) {
        setValue(value, 0)
      }
    }
  })

  let result = ''

  entry.code.forEach(value => {
    if ((map[value] !== -1 || getLengthValue(value.length)) !== -1) {
      result += map[value] !== -1 ? map[value] : getLengthValue(value.length)
    } else {
      result += '-'
    }
  })

  console.log(result)

  total+=parseInt(result)
});

console.log(`Total: ${total}`)

function getLengthValue (length) {
  switch(length) {
    case 2:
      return 1
    case 3:
      return 7
    case 4:
      return 4
    case 7:
      return 8
  }

  return -1
}

function matchingLetters (a, b) {

  let count = 0
  a.split('').forEach(letter => {
    if (b.indexOf(letter) !== -1) count++
  })
  return count
}