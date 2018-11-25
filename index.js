const game = require('./gameObj.js');
const {
    replaceColumn,
    declareWin,
    checkWin,
    getXCoordinate,
    rotateBoard
    // dropPiece,
    // checkColumnForWin,
    // checkFlatBoardForWin,
    // transformRowToColumn,
} = require('./gamePlayFuncs.js');

var inquirer = require('inquirer');

// regex for validation - if # of columns are dynamic, then that will need to be dynamic
// /^([1-7])$/,
var questions = [
    {
        type: 'input',
        name: 'column',
        message:
            'Pick a column 1 - 7 by entering the number and pressing ENTER\n\n            ',
        validate: function(input) {
            var done = this.async();
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
    updatedBoard,
    newTurn,
    winStatus,
    xCoordinate,
    yCoordinate
) => {
    game.board = updatedBoard;
    game.currentTurn = newTurn;
    game.winStatus = winStatus;
    game.lastDropped = {
        xCoord: xCoordinate,
        yCoord: yCoordinate
    };
};

const displayBoard = board => {
    rotatedBoard = rotateBoard(board);
    rotatedBoard.unshift(
        ['1', '2', '3', '4', '5', '6', '7'],
        ['=', '=', '=', '=', '=', '=', '=']
    );
    console.log(rotatedBoard);
};

const promptForMove = async () => {
    try {
        const { board, currentTurn } = { ...game };

        // gets column index number from user
        const droppedIndex = await getDroppedIndex(currentTurn);

        // based on the above column this gets the index of the first blank space which will be needed later
        const xCoordinate = await getXCoordinate(board[droppedIndex]);

        // returns a new board with an updated column
        const updatedBoard = replaceColumn(board, droppedIndex, currentTurn);

        displayBoard(updatedBoard);

        // updates which user's turn it is
        const newTurn = changeTurn(currentTurn);
        const flatIndex = getFlatIndexOfLastDropped(
            xCoordinate,
            droppedIndex,
            board
        );

        // should write condition to check each of the following only if win = false
        const winStatus = checkWin(
            updatedBoard,
            droppedIndex,
            currentTurn,
            flatIndex
        );

        if (!winStatus) {
            updateGameAfterMove(
                updatedBoard,
                newTurn,
                winStatus,
                xCoordinate,
                droppedIndex
            );
            promptForMove();
        } else {
            declareWin(currentTurn);
        }
        // updates the game board and player info with updated variables
    } catch (err) {
        console.log(err);
    }
};
promptForMove();
