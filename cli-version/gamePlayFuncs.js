// this will take in an array and look from bottom up if there is a piece played
// already and go up to next spot if there is one already
const dropPiece = (column, piece) => {
    let landed;
    const newColumn = column.map((space, i) => {
        if (space === ' ' && !landed) {
            landed = true;
            return piece;
        } else {
            return space;
        }
    });
    return newColumn;
};

// this should return a copy of the board with the updated column
const replaceColumn = (board, columnIndex, currentTurn) => {
    return board.map((column, i) =>
        columnIndex === i ? dropPiece(column, currentTurn) : column
    );
};

const changeTurn = turn => {
    return turn === 'B' ? 'R' : 'B';
};

// will check a given array for 4 in a row and return win status
// true if there are ever 4 in a row
const checkColumnForWin = (column, currentTurn) => {
    let win = false;
    let count = 0;
    column.forEach((space, i) => {
        if (space === currentTurn) {
            count += 1;
            if (count >= 4) {
                win = true;
            }
        } else {
            count = 0;
        }
    });
    return win;
};

// if the board is flattened then there should be the same # of pieces
// b/w ones from a specific column and then the next column but one row down
const checkFlatBoardForWin = (board, currentTurn, interval, flatIndex) => {
    let win = false;
    let count = 0;
    board.flat().forEach((space, i) => {
        // only checks every 7 (or 5) spaces for piece / the intervals passed in are currently hard-coded
        if ((i - flatIndex) % interval === 0) {
            if (currentTurn === space) {
                count += 1;
                if (count >= 4) {
                    win = true;
                }
            } else {
                count = 0;
            }
        }
    });
    return win;
};

// Calls the two functions that check for a win and returns true if any of thos are true
const checkWin = (updatedBoard, turn, flatIndex, colIndex) => {
    let win = false;
    const colCheck = checkColumnForWin(updatedBoard[colIndex], turn);
    const diaganolL = checkFlatBoardForWin(updatedBoard, turn, 7, flatIndex);
    const diaganolR = checkFlatBoardForWin(updatedBoard, turn, 5, flatIndex);
    const rowCheck = checkFlatBoardForWin(updatedBoard, turn, 6, flatIndex);

    // if one of the following are true then return true
    return colCheck || diaganolL || diaganolR || rowCheck;
};

const getXCoordinate = column => {
    const firstBlankSpace = column.indexOf(' ');
    return firstBlankSpace;
};

const getFlatIndexOfLastDropped = (xCoord, yCoord, board) => {
    const length = board[0].length;
    const flatBoardIndex = xCoord + yCoord * length;
    return flatBoardIndex;
};

// Next 3 functions are only used to print to console for players
const rotateBoard = board =>
    board[0].map((col, i) => board.map(row => row[row.length - 1 - i]));

const displayBoard = (board) => {
    rotatedBoard = rotateBoard(board);
    rotatedBoard.unshift(
        ['1', '2', '3', '4', '5', '6', '7'],
        ['=', '=', '=', '=', '=', '=', '=']
    );
    console.log(rotatedBoard);
};

const declareWin = currentTurn =>
    console.log(`\n  ===================================\n  ============= ${currentTurn} WINS! =============\n  ===================================`);

module.exports = {
    checkWin,
    replaceColumn,
    declareWin,
    displayBoard,
    getXCoordinate,
    changeTurn,
    getFlatIndexOfLastDropped
};
