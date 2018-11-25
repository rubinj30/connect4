const game = require('./gameObj.js');
const {
    dropPiece,
    replaceColumn,
    declareWin,
    checkColumnForWin,
    checkFlatBoardForWin
} = require('./gamePlayFuncs.js');

var inquirer = require('inquirer');

// regex for validation - if # of columns are dynamic, then that will need to be dynamic
// /^([1-7])$/,

var questions = [
    {
        type: 'input',
        name: 'column',
        message:
            'Please enter the column number where you want to drop your checker (1 to 7) and hit ENTER',
        validate: function(input) {
            // Declare function as asynchronous, and save the done callback
            var done = this.async();

            // Do async stuff
            setTimeout(function() {
                console.log(input, typeof input);
                if (!/^([1-7])$/.test(Number(input))) {
                    // Pass the return value in the done callback
                    done('You need to provide a number between 1 and 7');
                    return;
                }
                // Pass the return value in the done callback
                done(null, true);
            }, 300);
        }
    }
];

const getDroppedIndex = current => {
    const index = inquirer.prompt(questions).then(answers => {
        const column = answers['column'];
        const index = column - 1;
        console.log(
            `${current} chose column #${column} (a.k.a index ${index})!`
        );
        return index;
    });
    return index;
};

const changeTurn = turn => {
    return turn === 'B' ? 'R' : 'B';
};

updateGameAfterMove = (
    newTurn,
    updatedBoard,
    xCoordinate,
    yCoordinate,
    winStatus
) => {
    game.board = updatedBoard;
    game.currentTurn = newTurn;
    game.lastDropped = {
        xCoord: xCoordinate,
        yCoord: yCoordinate
    };
    game.winStatus = winStatus;
};

// TODO: make sure to optimize all params passed once all check funcs are called
//  and should set it up to only continue to next if the previous is false
// TODO: can use checkFlat for all 4 directional checks, so could have array of intervals and loop thru
const checkWin = (updatedBoard, droppedIndex, turn) => {
    const colCheck = checkColumnForWin(updatedBoard[droppedIndex], turn);
    const diaganolL = checkFlatBoardForWin(updatedBoard, turn, 7);
    const diaganolR = checkFlatBoardForWin(updatedBoard, turn, 5);
    const rowCheck = checkFlatBoardForWin(updatedBoard, turn, 6);

    // if one of the following are true then return true
    return colCheck || diaganolL || diaganolR || rowCheck;
};
while (!game.winStatus) {
    const sampleGetMoveFn = async () => {
        const { board, currentTurn } = { ...game };
        console.log(board);
        // gets column index number from user
        const droppedIndex = await getDroppedIndex(currentTurn);

        // based on the above column this gets the index of the first blank space which will be needed later
        const xCoordinate = getXCoordinate(board[droppedIndex]);

        // returns a new board with an updated column
        const updatedBoard = replaceColumn(board, droppedIndex, currentTurn);

        console.log(updatedBoard);
        // updates which user's turn it is
        const newTurn = changeTurn(currentTurn);

        // should write condition to check each of the following only if win = false
        const winStatus = checkWin(updatedBoard, droppedIndex, currentTurn);
        console.log('win', winStatus);

        // updates the game board and player info with updated variables
        updateGameAfterMove(
            updatedBoard,
            newTurn,
            xCoordinate,
            droppedIndex,
            winStatus
        );
    };
}
sampleGetMoveFn();
