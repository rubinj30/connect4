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

const getDroppedIndex = async current => {
    const index = await inquirer.prompt(questions).then(answers => {
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

updateGameAfterMove = (newTurn, updatedBoard, xCoordinate, yCoordinate, ) => {
    game.board = updatedBoard;
    game.currentTurn = newTurn;
    game.lastDropped = {
        xCoord: xCoordinate,
        yCoord: yCoordinate
    };
};

const sampleGetMoveFn = async () => {
    const { board, currentTurn } = { ...game };
    
    // gets column index number from user
    const droppedIndex = await getDroppedIndex(currentTurn);

    // based on the above column this gets the index of the first blank space which will be needed later
    const xCoordinate = getXCoordinate(board[droppedIndex]);

    // returns a new board with an updated column
    const updatedBoard = replaceColumn(board, droppedIndex, currentTurn);

    // updates which user's turn it is
    const newTurn = changeTurn(currentTurn);

    // updates the game board and player info with updated variables
    updateGameAfterMove(updatedBoard, newTurn, xCoordinate, droppedIndex);
};

sampleGetMoveFn();
