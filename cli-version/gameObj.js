// using standard board
// 7 columns x 6 rows
const game = {
    board: [
        [' ', ' ', ' ', ' ', ' ', ' '],
        [' ', ' ', ' ', ' ', ' ', ' '],
        [' ', ' ', ' ', ' ', ' ', ' '],
        [' ', ' ', ' ', ' ', ' ', ' '],
        [' ', ' ', ' ', ' ', ' ', ' '],
        [' ', ' ', ' ', ' ', ' ', ' '],
        [' ', ' ', ' ', ' ', ' ', ' ']
    ],
    blankBoard: [
        [' ', ' ', ' ', ' ', ' ', ' '],
        [' ', ' ', ' ', ' ', ' ', ' '],
        [' ', ' ', ' ', ' ', ' ', ' '],
        [' ', ' ', ' ', ' ', ' ', ' '],
        [' ', ' ', ' ', ' ', ' ', ' '],
        [' ', ' ', ' ', ' ', ' ', ' '],
        [' ', ' ', ' ', ' ', ' ', ' ']
    ],
    winStatus: false,
    currentTurn: 'B',
    lastDropped: {
        xCoord: 0,
        yCoord: 0
    },
    player1: {
        piece: 'B',
        wins: 0,
        losses: 0
    },
    player2: {
        piece: 'R',
        wins: 0,
        losses: 0
    }
};

// TODO: import into index and run on start up and after wins
const createBoard = (numCols, numRows) => {
    const col = Array(numRows).fill(' ');
    const board = Array(numCols).fill(col);
    game.board = board;
};

module.exports = game;
