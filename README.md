# Connect 4

https://play-connect-four.herokuapp.com/

Goals:

1. build a 2 person game on the command line
2. build a 2 person game with a front end and deploy it (link above) - i used a free version of heroku, so it may take a while to load up
3. build an AI to play against
4. learn

I decided to use Node.js for the command line version and React and Rails for UI version. I searched on google for the size of a connect 4 board and saw there were a few different ones, but the standard size was 6 rows X 7 columns. I decided to start with this, but eventually added the option in the UI for different board sizes (the user indicates the number of columns, which determines the rows). I used an array of arrays to represent the board, with the inner arrays acting as columns (although when I print to the command line I transform them to where rows are the arrays). I knew I'd need 3 different characters to represent the game pieces. I went with 'R' (for red), 'B' (for black), and a ' ' (for open spaces). Throughout the code, I typically refer to game pieces 'R' and 'B' as "piece", and open spaces as "space".

## CLI Version

#### About

First, I decided to use an array of arrays for the board with different letters representing open spaces and the game pieces I started with general game play functions and thinking about what the main ones would be to have a functioning game. I started writing functions to drop game pieces into columns provided as param, then replacing that column and returning an updataed board. Eventually, once I had all main functions needed to play a game including checking for wins, I started tying them together and prompting the user for input. I had to use a library (inquirer.js) to get user input, which was an unexpected hiccup since this is built-in to ruby and python and I assumed it was with node. Once I introduced the prompts, my file started getting out of control, so I separated it out into 3 files - 1) index.js that prompts user and runs any functions needed 2) one that has the general game play functions 3) one that holds the objects like the playing board variable. Finally, I was able to tie it all together, clean up how it prints out the command-line, and prompts users to play again without have to start up the app again.

#### Technologies

Node.js
Inquirer.js - used for getting input from user

#### To play the CLI version

1. in the root folder of the project, run `npm run build-cli` in the command line. This will install dependencies and start the app.
2. if you have already installed the dependencies you can run `npm run cli`
3. player 1 ('B' for Black) and player 2 ('R' for red) will alternate picking columns to drop game pieces in by enterin 1 - 7 for a column number
4. after a game is won, "y" can be entered to start another game or "n" to stop the application

Alternatively, to start the app you can:

1. navigate to the `cli-version` directory from the root
2. `npm install` dependencies
3. `npm start` or `node index.js` to start the game

## UI version

#### About

I used almost all the same logic and structure as in the CLI version, so getting it working was easy to get the actual game working. But, I wanted to add features like selecting board size, tracking player scores and records, and of course the AI. I abandoned the player score tracking for now, as it was not an essential requirement and the board size just seemed more attainable with the I had available. All of the game play and win checks work perfectly with the different-sized boards (dropdown to select at the bottom). In fact, it would work with any sized board as long as there is one more column than row, but I hope to do away with this requirement soon.

I used an "atomic" design for the React component tree structure. This is a method of separating concerns by component type. More can be found about it here: http://bradfrost.com/blog/post/atomic-web-design/

#### Technologies used

React
Typescript
Enzyme / Jest
Tachyons for CSS
Rails
Heroku

#### To play in the UI

1. go to https://connect-4-challenge.herokuapp.com/where it is deployed

OR, to playin locally:

1. in the root folder of the project, run `npm run build-ui`. This will install dependencies and start the app.
2. if you have already installed the dependencies you can run `npm run ui`
3. just click on a column to drop you game piece there
4. there is a YES or NO toggle switch that will turn the computer on and off (it defaults to no)
5. at the bottom of the board, there is a dropdown where you can select the number of columns in the board. The number of rows will be dependent on this, as wikipedia said that most board sizes for the game had one more column than row. Making a change to this will start over a game if you are currently in the middle of one.

Alternatively, to start the app you can:

1. `cd react-rails/client`
2. `npm install` dependencies
3. `npm start` to start the app
   NOTE - I have a rails back-end that I intend to build out to track player win-loss records, but I still have to build out the front-end to make the api calls, and decided to move past it since it was not in the required levels and wanted to turn in a reasonable amount of time

## Checking for win

Currently, I have two functions that specifically check for a winning combination. There are other supplemental ones involved, but two main ones that are the same in both the CLI and React version.

One of the win check functions, checks each column (an array) to see if there are four game pieces in a row that match the one provided as a parameter ('B' or 'R'). There is a a count and a win variable initialized at the beginning of the function that tracks the number in a row. Each time it comes across a piece that matches the param, it increments the count by one, but if it comes across the opponent piece or a space, it resets the count to 0. If at any point the count reaches 4, the win variable is changed from false to true. The function always returns true or false. The other win checking function, flattens the board with the ES6 method .flat(), at which point game pieces in a potential winning direction will all be a certain number of indexes apart. So based on the board size, I check 3 different intervals - one for a row and one for each diaganol direction.

## AI

To initiate the AI playing, you will need to toggle the "Is computer on?" to Yes. Currently, the AI will try to identify if there is a winning move available for either color. If there is one anywhere on the board, it will drop in the first column where that move is available. To do this, there is a function that simulates all moves and returns the resulting board of each. Then each of these boards is checked for a win with the above functions. If any of these were recognized as a win, then the first of those is played by the computer. If none of the boards are recognized with a win, then it does the same thing with the opponent's (black) game piece.

If there is not a winning move available to either player, the computer will play 2 moves ahead to see if it can win with two moves. If it can, it will play the first of these moves. This makes the computer a formiddable opponent!

After that, the computer will pick a random column to play of the columns that have available spaces to be played. Eventually, I plan to continue adding onto this AI.

Lastly, the AI will work on any size board. 

## Testing

I have unit tests on the entire front-end covering all of the components and methods, using Jest and Enzyme. This was definitely one of the more time-consuming things, just because the amount of methods and components I had built out. That being said it, I understand the importance of testing and believe in the value of it. Once I build out the back-end more I plan on adding Rspec tests to test the controllers.
