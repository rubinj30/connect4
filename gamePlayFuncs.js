// this will take in an array and look from bottom up if there is a piece played
// already and go up to next spot if there is one already
const dropPiece = (column, piece) => {
    let landed;
    const newColumn = column.map((space, i) => {
        if (space === '-' && !landed) {
            landed = true;
            return piece;
        } else {
            return space;
        }
    });
    return newColumn;
};

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
checkFlatBoardForWin = (board, currentTurn, interval, flatIndex) => {
    let win = false;
    let count = 0;
    board.flat().forEach((space, i) => {
        // only checks every 7 (or 5) spaces for piece
        if ((i - flatIndex) % interval === 0) {
            if (currentTurn === space) {
                count += 1;
                if (count >= 4) {
                    win = true;
                    declareWin(currentTurn);
                }
            }
        }
    });
    return win;
};

// given row index, return each item from that index in each column to create
// a row array
transformRowToColumn = (board, rowIndex) =>
    board.map(column => column[rowIndex]);

getXCoordinate = column => {
    const firstBlankSpace = column.indexOf('-');
    return firstBlankSpace;
};

getFlatIndexOfLastDropped = (xCoord, yCoord, board) => {
    // TODO: find better way to get length of column
    const length = board[0].length;
    const flatBoardIndex = xCoord + yCoord * length;
    console.log('flatIndex', flatBoardIndex);
    return flatBoardIndex;
};

const rotateBoard = (board) => board[0].map((col, i) => board.map(row => row[i]));

module.exports = {
    dropPiece,
    replaceColumn,
    checkColumnForWin,
    declareWin,
    checkFlatBoardForWin,
    transformRowToColumn,
    getXCoordinate,
    rotateBoard
};
