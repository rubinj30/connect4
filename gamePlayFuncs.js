// this will take in an array and look from bottom up if there is a piece played
// already and go up to next spot if there is one already

const dropPiece = (column, piece) => {
    let landed;
    return column.map(space => {
        if (space === 'O' && !landed) {
            landed = true;
            return piece;
        } else {
            return space;
        }
    });
};

// this should return a copy of the board with the updated column
replaceColumn = (board, columnIndex) => {
    const newBoard = board.map((column, i) => {
        return columnIndex === i ? dropPiece(column, player1.piece) : column;
    });
    return newBoard;
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
    console.log(board);
    board.flat().map((space, i) => {
        // only checks every 7 (or 5) spaces for piece
        if (i % interval === 0) {
            if (currentTurn === space) {
                count += 1;
                console.log(count);
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

checkFlatBoardForWin(playingBoard, 'B', 5);

// given row index, return each item from that index in each column to create
// a row array
transformRowToColumn = (board, rowIndex) =>
    board.map(column => column[rowIndex]);
