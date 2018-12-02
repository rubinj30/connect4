# Connect 4
Goals:
1) build a 2 person game on the command line
2) build a 2 person game with a front end (hosted somewhere) - https://connect-4-react-rails.herokuapp.com/
3) build an AI to play against

I decided to use Node.js for the command line version and React and Rails for UI version. 

## CLI Version
#### About: 
I started with general game play functions and thinking about what the main ones would be to have a functioning game. I decided to do an array of arrays, with each of the inner arrays acting as a column. This made it easier to write a function that would easily allow me to drop a game piece into a column, as well as replace just that column. I ended up sticking with these even for the UI version. Along the way I considered doing the opposite, but didn't see any major benefits other than displaying the board in the console. 

#### Technologies:
Node.js
Inquirer.js - used for getting input from user
I was planning on using Jasmine (JS testing for non-ui environments) for testing, but I wrote tests for similar functions in enzyme/jest on the front-end.

#### To play the CLI version: 
1) in the root folder of the project, run `npm run build-cli` in the command line. This will install dependencies and start the app. 
2) if you have already installed the dependencies you can run `npm run cli`
3) player 1 ('B' for Black) and player 2 ('R' for red) will alternate picking columns to drop game pieces in by enterin 1 - 7 for a column number
4) after a game is won, "y" can be entered to start another game or "n" to stop the application

Alternatively, to start the app you can:
1) navigate to the `cli-version` directory from the root
2) `npm install` dependencies
3) `npm start` or `node index.js` to start the game


## UI version
#### Technologies:
React
Typescript
Enzyme / Jest
CSS (including Tachyons)
Rails
Postgresql
Heroku

To play in the UI:
1) in the root folder of the project, run `npm run build-ui`. This will install dependencies and start the app. 
2) if you have already installed the dependencies you can run `npm run ui`
3) just click on a column to drop you game piece there
4) there is a YES or NO toggle switch that will turn the computer on and off (it defaults to no)
5) at the bottom of the board, there is a dropdown where you can select the number of columns in the board. The number of rows will be dependent on this, as wikipedia said that most board sizes for the game had one more column than row. Making a change to this will start over a game if you are currently in the middle of one. 

Alternatively, to start the app you can:
1) `cd react-rails/client`
2) `npm install` dependencies
3) `npm start` to start the app
NOTE: i have a rails back-end that I intend to build out, but its not currently being used for game play

## Checking for win
Currently, I have two functions that specifically check for a winning combination. There are other supplemental ones involved, but two main ones that are the same in both the CLI and React version.

One of the win check functions, checks each column (an array) to see if there are four game pieces in a row that match the one provided as a parameter ('B' or 'R').  having a count variable that will increment, unless it comes across a variable that is not looking for like a space or the opposite game piece.

## AI
To initiate the AI playing, you will need to toggle the "Is computer on?" to Yes. Currently, the AI will try to identify if there is a winning move available. If there is one anywhere on the board, it will drop in the first column where that move is available. To do this, there is a function that simulates all moves and returns the resulting board of each. Then each of these boards is checked for a win with the above functions. If any of these were recognized as a win, then the first of those is played by the computer. If none of the boards are recognized with a win, then it does the same thing with the opponent's (black) game piece. 

For now, if there is not a winning move available to either player, the computer will pick a random column to play of the columns that have available spaces to be played. 

The AI will work on any size board and is a formiddable opponent if you are not careful!

## Testing
I have testing on the entire front-end covering all of the components and methods, using Jest and Enzyme. 