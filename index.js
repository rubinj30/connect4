const game = require('./gameObj.js');
const {
    dropPiece,
    replaceColumn,
    declareWin,
    checkColumnForWin,
    checkFlatBoardForWin
} = require('./gamePlayFuncs.js');

var prompt = require('prompt');
var schema = {
    properties: {
        move: {
            // verifying that the user enters an integer between 1 and 7
            // i am shifting indexes up by one when asking user 1 - 7 for column numbers instead of indexes 0 - 6
            pattern: /^([1-7])$/,
            message: 'Choose column to drop checker in (enter number 1 - 7)',
            required: true
        }
    }
};

getMove = turn => {
    prompt.start();
    prompt.get(schema, function(err, result) {
        console.log(`${turn} dropped in column: ${result.move}`);
        // now I am shifting columns 1 thru 7 back to indexes 0 - 7
        return result.move - 1;
    });
};

const test = getMove('R');
console.log(test);
