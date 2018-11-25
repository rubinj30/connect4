const game = require('./gameObj.js');
const {
    dropPiece,
    replaceColumn,
    checkColumnForWin,
    declareWin,
    checkFlatBoardForWin,
    getXCoordinate,
    rotateBoard
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
            'Please enter the column number where you want to drop your checker (1 to 7) and hit ENTER',
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

// TODO: make sure to optimize all params passed once all check funcs are called
//  and should set it up to only continue to next if the previous is false
// TODO: can use checkFlat for all 4 directional checks, so could have array of intervals and loop thru
const checkWin = (updatedBoard, droppedIndex, turn, flatIndex) => {
    const colCheck = checkFlatBoardForWin(updatedBoard, turn, 1, flatIndex);
    console.log('colcheck = ', colCheck);
    const diaganolL = checkFlatBoardForWin(updatedBoard, turn, 7, flatIndex);
    console.log('diaganolL = ', diaganolL);
    const diaganolR = checkFlatBoardForWin(updatedBoard, turn, 5, flatIndex);
    console.log('diaganolR = ', diaganolR);
    const rowCheck = checkFlatBoardForWin(updatedBoard, turn, 6, flatIndex);
    console.log('rowCheck = ', rowCheck);
    //
    // if one of the following are true then return true
    return colCheck || diaganolL || diaganolR || rowCheck;
};
const sampleGetMoveFn = async () => {
    try {
        const { board, currentTurn } = { ...game };

        // gets column index number from user
        const droppedIndex = await getDroppedIndex(currentTurn);

        // based on the above column this gets the index of the first blank space which will be needed later
        const xCoordinate = await getXCoordinate(board[droppedIndex]);

        // returns a new board with an updated column
        const updatedBoard = replaceColumn(board, droppedIndex, currentTurn);

        const rotatedBoard = rotateBoard(updatedBoard);
        rotatedBoard.unshift(
            [' ', ' ', ' ', ' ', ' ', ' ', ' '],
            ['1', '2', '3', '4', '5', '6', '7'],
            ['=', '=', '=', '=', '=', '=', '=']
        );
        console.log(rotatedBoard);


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
        console.log('win', winStatus);

        if (!winStatus) {
            updateGameAfterMove(
                updatedBoard,
                newTurn,
                winStatus,
                xCoordinate,
                droppedIndex
            );
            sampleGetMoveFn();
        } else {
            declareWin(currentTurn);
        }
        // updates the game board and player info with updated variables
    } catch (err) {
        console.log(err);
    }
};
sampleGetMoveFn();
