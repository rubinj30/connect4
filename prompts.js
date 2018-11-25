const getMoveQuestions = [
    {
        type: 'input',
        name: 'column',
        message:
            'Pick a column 1 - 7 by entering the number and pressing ENTER\n\n            ',
        validate: function(input) {
            var done = this.async();
            setTimeout(function() {
                console.log(input, typeof input);
                // TODO:
                // regex for validation - if # of columns are dynamic, then that will need to be dynamic
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

const playAgainQuestions = [
    {
        type: 'input',
        name: 'playAgain',
        message:
            'Would you like to play another round? (Y or N)\n\n            ',
        validate: function(input) {
            var done = this.async();
            setTimeout(function() {
                const cleanedAnswer = input.toLowerCase().trim();
                if (!['y', 'n', 'yes', 'no'].includes(cleanedAnswer)) {
                    // Pass the return value in the done callback
                    done('You must provide a Y or N');
                    return;
                }
                // Pass the return value in the done callback
                done(null, true);
            }, 300);
        }
    }
];

module.exports = {
    getMoveQuestions,
    playAgainQuestions
};
