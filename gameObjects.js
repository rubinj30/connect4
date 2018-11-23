// using standard board 
// 7 columns x 6 rows
const playingBoard = [
    ['O', 'O', 'O', 'O', 'O', 'B'],
    ['O', 'O', 'O', 'O', 'B', 'O'],
    ['O', 'O', 'O', 'B', 'O', 'O'],
    ['O', 'O', 'B', 'O', 'O', 'O'],
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

module.exports = {
    playingBoard,
    player1,
    player2
}