const playingBoard = [
    ['O', 'O', 'O', 'O', 'O', 'O'],
    ['O', 'O', 'O', 'O', 'O', 'O'],
    ['O', 'O', 'O', 'O', 'O', 'O'],
    ['O', 'O', 'O', 'O', 'O', 'O'],
    ['O', 'O', 'O', 'O', 'O', 'O'],
    ['O', 'O', 'O', 'O', 'O', 'O'],
    ['O', 'O', 'O', 'O', 'O', 'O']
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
    const newColumn = column.map((space, i) => {
        if (space === 'O' && !landed) {
            landed = true;
            return piece;
        } else {
            return space;
        }
    });
    console.log(newColumn);
    return newColumn;
};

dropPiece(playingBoard[3], 'B')

// this should return a copy of the board with the updated column
replaceColumn = (board, columnIndex) => {
    const newBoard = board.map((column, i) => {
        return columnIndex === i ? dropPiece(column, player1.piece) : column;
    });
    console.log(newBoard);
    return newBoard;
};

replaceColumn(playingBoard, 0);
