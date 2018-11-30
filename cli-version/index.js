const game = require('./gameObj.js');
const { playAgain, getColumnPlayedIndex } = require('./prompts');
const {
    replaceColumn,
    declareWin,
    checkWin,
    getXCoordinate,
    displayBoard,
    changeTurn
} = require('./gamePlayFuncs.js');

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

updateAfterGame = (newTurn) => {
    game.board = game.blankBoard;
    game.currentTurn = newTurn;
} 

const promptForMove = async () => {
    try {
        const { board, currentTurn } = { ...game };

        // show current state of the playing board in a playable view
        displayBoard(board, currentTurn);
        console.log(`\nIt is ${currentTurn}'s move`);

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
            displayBoard(updatedBoard, currentTurn);
            updateAfterGame(newTurn);
            const answer = await playAgain();
            if (answer.includes('y')) {
                promptForMove();
            }
        }
        // updates the game board and player info with updated variables
    } catch (err) {
        console.log(err);
    }
};
promptForMove();
