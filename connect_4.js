const board = [
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
}

player2 = {
    piece: 'R',
    wins: 0,
    losses: 0
}

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
}

dropPiece(board[0], player1.piece)