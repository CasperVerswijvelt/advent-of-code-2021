const fs = require("fs");

const text = fs.readFileSync(process.argv[2]).toString();
const lines = text.split("\r\n");

let totalScore = 0
const completionScores = []

lines.forEach((line) => {

  const chars = line.split("")

  const stack = []

  let incomplete = true

  for (let character of chars) {

    let matchingClosingChar = getClosingChar(character)
    if (matchingClosingChar) {
      stack.push(matchingClosingChar)
    } else {
      // it is a closing character
      if (stack[stack.length-1] === character) {
        stack.pop()
      } else {
        incomplete = false
        let score = getCharacterScore(character)
        totalScore += score
        console.log(`Syntax error: expected ${stack[stack.length-1]}, but found ${character} instead (score ${score})`)
        break
      }
    }
  }

  if (incomplete) {

    let score = 0

    for (let i = stack.length - 1; i >= 0; i--) {
      score *= 5
      score += getCompletionScore(stack[i])
    }

    completionScores.push(score)

    console.log(`Incomplete string: adding '${stack.reverse().join("")}' (score ${score})`)
  }
});

console.log(`\nTotal score: ${totalScore}`)
console.log(`Middle completion score: ${completionScores.sort((a,b)=>a-b)[(completionScores.length-1)/2]}`)

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

function getCompletionScore(character) {
  switch(character) {
    case '}':
      return 3
    case '>':
      return 4
    case ']':
      return 2
    case ')':
      return 1
    default:
      return 0
  }
}