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
        validate: function (input) {
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

const getMove = async () => {
    const index = await inquirer.prompt(questions).then(answers => {
        const column = answers['column'];
        const index = column - 1;
        console.log(`You chose column #${column} (a.k.a index ${index})!`);
        return index;
    });
    return index;
};
const sampleGetMoveFn = async () => {
    const test = await getMove();
    return test;
};

sampleGetMoveFn();
