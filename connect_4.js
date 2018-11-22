const playingBoard = [
    ['B', 'O', 'O', 'O', 'O', 'O'],
    ['O', 'O', 'O', 'O', 'O', 'O'],
    ['B', 'O', 'O', 'O', 'O', 'O'],
    ['B', 'O', 'O', 'O', 'O', 'O'],
    ['B', 'O', 'O', 'O', 'O', 'O'],
    ['B', 'O', 'O', 'O', 'O', 'O'],
    ['B', 'O', 'O', 'O', 'O', 'O']
];

player1 = {
    piece: 'B',
    wins: 0,
    losses: 0
};

player2 = {
    piece: 'R',
    wins: 0,
    losses: 0
};

// this will take in an array and look from bottom up if there is a piece played
// already and go up to next spot if there is one already
const dropPiece = (column, piece) => {
    let landed;
    return column.map((space, i) => {
        if (space === 'O' && !landed) {
            landed = true;
            return piece;
        } else {
            return space;
        }
    });
};

console.log('DROP', dropPiece(playingBoard[3], 'B'));

// this should return a copy of the board with the updated column
replaceColumn = (board, columnIndex) => {
    const newBoard = board.map((column, i) => {
        return columnIndex === i ? dropPiece(column, player1.piece) : column;
    });
    console.log(newBoard);
    return newBoard;
};

replaceColumn(playingBoard, 0);

declareWin = currentTurn => console.log(`${currentTurn} WINS!`);

// will check a given array for 4 in a row and return win status
// true if there are ever 4 in a row
checkColumnForWin = (column, currentTurn) => {
    let win = false;
    let count = 0;
    column.forEach((space, i) => {
        if (space === currentTurn) {
            count += 1;
            if (count >= 4) {
                win = true;
                declareWin(currentTurn);
            }
        } else {
            count = 0;
        }
    });
    return win;
};

// given row index, return each item from that index in each column to create
// a row array
transformRowToColumn = (board, rowIndex) =>
    board.map(column => column[rowIndex]);

console.log('transform', transformRowToColumn(playingBoard, 0));
checkColumnForWin(transformRowToColumn(playingBoard, 0), 'B');
// checkColumnForWin(['B', 'R', 'B', 'B', 'B', 'B'], 'B');

var prompt = require('prompt');
var schema = {
    properties: {
        move: {
            // verifying that the user enters an integer between 1 and 7
            // i am shifting indexes up by one when asking user 1 - 7 for column numbers instead of indexes 0 - 6
            pattern: /^([1-7])$/,
            message: 'Choose column to drop checker in (enter number 1 - 7)',
            required: true
        }
        //   password: {
        //     hidden: true
        //   }
    }
};

getMove = turn => {
    prompt.start();
    prompt.get(schema, function(err, result) {
        console.log('Command-line input received:');
        console.log(`${turn} dropped in column: ${result.move}`);
        // now I am shifting columns 1 thru 7 back to indexes 0 - 7
        return result.move - 1;
    });
};

const test = move('R')
console.log(test);