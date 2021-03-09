const readline = require('readline')
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
})

var ai = 'X'
var human = 'O'
var scoreAi = []
var scoreHuman = []
var magicBoard = [2, 7, 6, 9, 5, 1, 4, 3, 8]
var board = []

function printBoard() {
  var result = ''

  for (var index = 0; index < 9; index++) {
    const value = board[index]

    if (value === undefined) {
      result += index
    } else {
      result += value
    }
    result += '\t'

    if ((index + 1) % 3 === 0) {
      result += '\n'
    }
  }
  console.log(result)
}

function didPlayerWin(score) {
  for (var i = 0; i < score.length; i++) {
    for (var j = i + 1; j < score.length; j++) {
      for (var k = j + 1; k < score.length; k++) {
        if (score[i] + score[j] + score[k] === 15) {
          return true
        }
      }
    }
  }
  return false
}

function getWinnerScore() {
  if (didPlayerWin(scoreHuman)) {
    return -1
  } else if (didPlayerWin(scoreAi)) {
    return 1
  } else if (canPlay() === false) {
    return 0
  }
  return null
}

function minimax(copyBoard, isMaximizing) {
  const winnerScore = getWinnerScore()
  if (winnerScore !== null) {
    return winnerScore
  }
  var bestScore = isMaximizing ? -Infinity : Infinity

  for (var index = 0; index < 9; index++) {
    if (copyBoard[index] === undefined) {
      copyBoard[index] = isMaximizing ? ai : human
      if (isMaximizing) {
        scoreAi.push(magicBoard[index])
      } else {
        scoreHuman.push(magicBoard[index])
      }
      var score = minimax(copyBoard, !isMaximizing)
      copyBoard[index] = undefined
      if (isMaximizing) {
        scoreAi.pop()
      } else {
        scoreHuman.pop()
      }

      if (isMaximizing) {
        bestScore = Math.max(score, bestScore)
      } else {
        bestScore = Math.min(score, bestScore)
      }
    }
  }
  return bestScore
}

function findBestMove() {
  var bestScore = -Infinity
  var move = null

  for (var index = 0; index < 9; index++) {
    if (board[index] === undefined) {
      board[index] = ai
      var score = minimax(board, false)
      board[index] = undefined

      if (score > bestScore) {
        bestScore = score
        move = index
      }
    }
  }
  return move
}

function canPlay() {
  for (var index = 0; index < 9; index++) {
    if (board[index] === undefined) {
      return true
    }
  }
  return false
}

function isCommandValid(command) {
  const formattedCommand = parseInt(command)

  if (formattedCommand >= 0 && formattedCommand < 9) {
    return true
  }
  return false
}

async function gameLoop() {
  console.log(`${human} à ton tour`)
  for await (const command of rl) {
    if (isCommandValid(command) === false) {
      console.log('Erreur: commande invalide')
    }
    else if (board[command] !== undefined) {
      console.log('Erreur: un joueur occupe déjà cette place')
    } else {
      board[command] = human
      scoreHuman.push(magicBoard[command])
      if (didPlayerWin(scoreHuman)) {
        printBoard()
        console.log(`${human} à gagné`)
        break
      }

      var move = findBestMove()
      board[move] = ai
      scoreAi.push(magicBoard[move])
      if (didPlayerWin(scoreAi)) {
        printBoard()
        console.log(`${ai} à gagné`)
        break
      }

      if (canPlay() === false) {
        printBoard()
        console.log('Égalité !')
        break
      }
      printBoard()
      console.log(`${human} à ton tour`)
    }
  }
}

var move = findBestMove()
board[move] = ai
scoreAi.push(magicBoard[move])
printBoard()
gameLoop()