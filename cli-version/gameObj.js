// using standard board
// 7 columns x 6 rows
const game = {
    board: [
        ['B', 'B', 'B', ' ', ' ', ' '],
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

module.exports = game;
