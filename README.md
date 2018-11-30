Goals:
1) build a 2 person game on the command line
2) build a 2 person game with a front end (hosted somewhere)
3) build an AI to play against

For the final version, I plan on building out the game with Typescript/React on the front-end and Rails on the back-end. The command-line version will be a node app, so some of the functions can be re-used in version 2.

I intended on using Typescript in the node app, but ran into some issues with some of the types I was declaring after some troubelshooting I eventually abandoned. I was able to re-use several of the function in React, simply by adding types and adjusting to work with state if necessary. 

# CLI Version
To play the CLI version: 
1) navigate to the `cli-version` directory
2) `npm install` dependencies
3) `npm start` or `node index.js` to start the game
4) player 1 ('B' for Black) and player 2 ('R' for red) will alternate picking columns to drop game pieces in


# React version
To play in the UI:
1) go to the Client folder inse of the React-Rails directory
2) `npm install` dependencies
3) `npm start`
4) there is a Rails back-end with basic controllers, but I'm not really using them yet for the game
5) i intend to build it out to track player names, wins, and losses, and even the individual boards from past games
