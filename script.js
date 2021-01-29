// GAME CONTROLLER
    // start/restart game, with prompt to take in names for x and o
    // create players
    // send update with names to display controller (set names)
    // alternate whose turn
    // take input and send to board manager to update array
    // send update to display controller (set space to x or o)
    // check if winner (from board manager) and if so send update to display controller
    // 

    const game = (() => {
        
        let playerTurn = 'X';
        let gameOver = true;
        let playerX;
        let playerO;
        let winner;

        const newGame = () => {
            board.toggleForm();
            let players = board.getPlayers();
            playerX = players[0];
            playerO = players[1];
            board.updateScoreboard(playerX, playerO);
            gameOver = false;
        };

        const makeTurn = (space) => {
            if (gameOver) return;

            board.setMarker(space, playerTurn);

            // check if 3 in a row, if so, get array with spaces that win
            gameOver = board.checkWinner();

            // round over, update player score and send update to board
            if (gameOver) {
                if (gameOver[0] == 'X') { winner = playerX; }
                else { winner = playerO; }
                winner.upScore();
                board.declareWinner(winner.getName(), gameOver.slice(1));
                board.updateScoreboard(playerX, playerO);
                gameOver = false;
            }
            toggleTurn();

        };

        const reset = () => {
            playerTurn = 'X';
            board.resetBoard();
            board.toggleForm();
        };

        const toggleTurn = () => {
            if (playerTurn == 'X') playerTurn = 'O';
            else playerTurn = 'X';
        };



        return {
            makeTurn,
            reset,
            newGame
        };        


    })();




// BOARD MANAGER

const board = (() => {

    let boardArray = ['e', 'e', 'e', 'e', 'e', 'e', 'e', 'e', 'e'];

    const setMarker = (space, mark) => {
        if (boardArray[space] != 'e') return false;
        else {
            boardArray[space] = mark;
            let spaceDiv = document.getElementById(space);
            spaceDiv.textContent = mark;
            return true;
        }
    };

    // set markings to red for winning combo; update score on display
    const declareWinner = (winner, winnerArr) => {
        for (let item of winnerArr) {
            let winningDiv = document.getElementById(item);
            winningDiv.classList.toggle('winnerText');
        }     
        alert(`${winner} wins!`); 
    };

    const resetBoard = () => {
        boardArray = ['e', 'e', 'e', 'e', 'e', 'e', 'e', 'e', 'e'];
        let spaceDivs = document.getElementsByClassName('marker');
        for (let item of spaceDivs) {
            item.textContent = '';
            item.classList.remove('winnerText');
        }
    };

    const checkWinner = () => {
        //rows
        if (boardArray[0] != 'e' && boardArray[0] == boardArray[1] && boardArray[0] == boardArray[2] ) return [boardArray[0], 0, 1, 2];
        if (boardArray[3] != 'e' && boardArray[3] == boardArray[4] && boardArray[3] == boardArray[5] ) return [boardArray[3], 3, 4, 5];
        if (boardArray[6] != 'e' && boardArray[6] == boardArray[7] && boardArray[6] == boardArray[8] ) return [boardArray[6], 6, 7, 8];

        //cols
        if (boardArray[0] != 'e' && boardArray[0] == boardArray[3] && boardArray[0] == boardArray[6] ) return [boardArray[0], 0, 3, 6];
        if (boardArray[1] != 'e' && boardArray[1] == boardArray[4] && boardArray[1] == boardArray[7] ) return [boardArray[1], 1, 4, 7];
        if (boardArray[2] != 'e' && boardArray[2] == boardArray[5] && boardArray[2] == boardArray[8] ) return [boardArray[2], 2, 5, 8];

        //xxs
        if (boardArray[0] != 'e' && boardArray[0] == boardArray[4] && boardArray[0] == boardArray[8] ) return [boardArray[0], 0, 4, 8];
        if (boardArray[2] != 'e' && boardArray[2] == boardArray[4] && boardArray[2] == boardArray[6] ) return [boardArray[2], 2, 4, 6];

        return false;
    };

    const toggleForm = () => {
        let form = document.querySelector('.whiteOut');
        form.classList.toggle('showForm');
    };

    const getPlayers = () => {
        let playerXName = document.getElementById('playerX').value;
        let playerOName = document.getElementById('playerO').value;
        let playerX = Player('human', playerXName);
        let playerO = Player('human', playerOName);
        return [playerX, playerO];
    }

    const updateScoreboard = (playerX, playerO) => {
        let xscore = document.querySelector('#xScore');
        let oscore = document.querySelector('#oScore');
        xscore.textContent = `${playerX.getName()}: ${playerX.getScore()}`;
        oscore.textContent = `${playerO.getName()}: ${playerO.getScore()}`;
    }

    return {
        setMarker,
        resetBoard,
        checkWinner,
        declareWinner,
        toggleForm,
        getPlayers,
        updateScoreboard
    };

})();


    // initlize with array, all values 'e' (empty)
    // update array with x or o
    // check if winner

// DISPLAY CONTROLLER
    // initialize/reset board to empty, all spaces available
    // update with x or o on move; disable onclick for space

// PLAYERS
    // create player w/ name
    const Player = (type, name) => {
        let score = 0;
        const getName = () => name;
        const getScore = () => score;
        const getType = () => type;
        const upScore = () => {
            score++;
       };
    
       return {getName, getScore, getType, upScore}
    };
