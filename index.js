const game = require('./gameObj.js');
const {
    dropPiece,
    replaceColumn,
    declareWin,
    checkColumnForWin,
    checkFlatBoardForWin
} = require('./gamePlayFuncs.js');

var inquirer = require('inquirer');

var questions = [
    {
        type: 'input',
        name: 'column',
        message:
            'Please enter the column number where you want to drop your checker (1 to 7)'
    }
];

const getMove = async () => {
    const index = await inquirer.prompt(questions).then(answers => {
        const column = answers['column'];
        const index = column - 1;
        console.log(`You chose column ${column} (AKA index ${index}!`);
        return index;
    });
    return index;
};
const sampleGetMoveFn = async () => {
    const test = await getMove();
    return test;
};

sampleGetMoveFn();