const game = require('./gameObj');

// this will take in an array and look from bottom up if there is a piece played
// already and go up to next spot if there is one already
const dropPiece = (column, piece) => {
    let landed;
    const newColumn = column.map((space, i) => {
        if (space === 'O' && !landed) {
            landed = true;
            return piece;
        } else {
            return space;
        }
    });
    return newColumn;
};

// dont need anymore, just returning from a function and will update at end
// setXCoord = rowIndex => {
//     game.lastDropped.xCoord = rowIndex;
// };

// setYCoord = columnIndex => {
//     game.lastDropped.yCoord = columnIndex;
// };

// this should return a copy of the board with the updated column
replaceColumn = (board, columnIndex, currentTurn) => {
    return board.map((column, i) =>
        columnIndex === i ? dropPiece(column, currentTurn) : column
    );
};

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

// if the board is flattened then there should be the same # of pieces
// b/w ones from a specific column and then the next column but one row down
// TODO: only works from left to right if divisible by 7
// need to pass interval to check by and figure out way to get starting point for checking
checkFlatBoardForWin = (board, currentTurn, interval) => {
    let win = false;
    let count = 0;
    board.flat().map((space, i) => {
        // only checks every 7 (or 5) spaces for piece
        if (i % interval === 0) {
            if (currentTurn === space) {
                count += 1;
                if (count >= 4) {
                    win = true;
                    declareWin(currentTurn);
                }
            }
        }
    });
    console.log('win status:: ', win);
    return win;
};

checkFlatBoardForWin(game.board, 'B', 5);

// given row index, return each item from that index in each column to create
// a row array
transformRowToColumn = (board, rowIndex) =>
    board.map(column => column[rowIndex]);

getXCoordinate = (column) => {
    const firstBlankSpace = column.indexOf('O');
    return firstBlankSpace;
};

module.exports = {
    dropPiece,
    replaceColumn,
    checkColumnForWin,
    declareWin,
    checkFlatBoardForWin,
    transformRowToColumn,
    getXCoordinate,
}