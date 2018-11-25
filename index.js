const game = require('./gameObj.js');
const { getMoveQuestions, playAgainQuestions } = require('./prompts');
const {
    replaceColumn,
    declareWin,
    checkWin,
    getXCoordinate,
    displayBoard
    // rotateBoard
    // dropPiece,
    // checkColumnForWin,
    // checkFlatBoardForWin,
    // transformRowToColumn,
} = require('./gamePlayFuncs.js');

var inquirer = require('inquirer');




const getColumnPlayedIndex = current => {
    const index = inquirer.prompt(getMoveQuestions).then(answers => {
        const column = answers['column'];
        const index = column - 1;
        console.log(
            `${current} chose column #${column} (a.k.a index ${index})!`
        );
        return index;
    });
    return index;
};

const playAgain = () => {
    const againYesOrNo = inquirer.prompt(quest).then(answers => {
        const playAgainAnswer = answers['playAgain'];
        return playAgainAnswer;
    });
    console.log('play again ---- ', againYesOrNo);
    return againYesOrNo;
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

const promptForMove = async () => {
    try {
        const { board, currentTurn } = { ...game };

        // show current state of the playing board in a playable view
        displayBoard(board);

        // gets column index number from user
        const columnPlayedIndex = await getColumnPlayedIndex(currentTurn);

        // based on the above column this gets the index of the first blank space which will be needed later
        const xCoordinate = await getXCoordinate(board[columnPlayedIndex]);

        // returns a new board with an updated column
        const updatedBoard = replaceColumn(
            board,
            columnPlayedIndex,
            currentTurn
        );

        // updates which user's turn it is
        const newTurn = changeTurn(currentTurn);
        const flatIndex = getFlatIndexOfLastDropped(
            xCoordinate,
            columnPlayedIndex,
            board
        );

        // should write condition to check each of the following only if win = false
        const winStatus = checkWin(
            updatedBoard,
            columnPlayedIndex,
            currentTurn,
            flatIndex
        );

        if (!winStatus) {
            updateGameAfterMove(
                updatedBoard,
                newTurn,
                winStatus,
                xCoordinate,
                columnPlayedIndex
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
