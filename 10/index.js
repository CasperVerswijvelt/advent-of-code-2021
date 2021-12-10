const fs = require("fs");

const text = fs.readFileSync(process.argv[2]).toString();
const lines = text.split("\r\n");

let totalScore = 0

lines.forEach((line) => {

  const chars = line.split("")

  const stack = []

  let score

  for (let character of chars) {

    let matchingClosingChar = getClosingChar(character)
    if (matchingClosingChar) {
      stack.push(matchingClosingChar)
    } else {
      // it is a closing character
      if (stack[stack.length-1] === character) {
        stack.pop()
      } else {
        let score = getCharacterScore(character)
        totalScore += score
        console.log(`Expected ${stack[stack.length-1]}, but found ${character} instead (score ${score})`)
        break
      }
    }
  }
});

console.log(`Total score: ${totalScore}`)

function getClosingChar(character) {
  switch(character) {
    case '{':
      return '}'
    case '<':
      return '>'
    case '[':
      return ']'
    case '(':
      return ')'
    default:
      return ''
  }
}

function getCharacterScore(character) {
  switch(character) {
    case '}':
      return 1197
    case '>':
      return 25137
    case ']':
      return 57
    case ')':
      return 3
    default:
      return 0
  }
}