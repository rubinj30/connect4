const board = [
    ['O', 'O', 'O', 'O', 'O', 'O'],
    ['O', 'O', 'O', 'O', 'O', 'O'],
    ['O', 'O', 'O', 'O', 'O', 'O'],
    ['O', 'O', 'O', 'O', 'O', 'O'],
    ['O', 'O', 'O', 'O', 'O', 'O'],
    ['O', 'O', 'O', 'O', 'O', 'O'],
    ['O', 'O', 'O', 'O', 'O', 'O']
];

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

dropPiece(['O', 'O', 'O', 'O', 'O', 'O'], 'B');