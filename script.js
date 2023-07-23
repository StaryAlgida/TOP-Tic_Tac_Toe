function createImg(src){
    const img = document.createElement("img");
    img.src = src;
    return img;
}

const winRule = (()=>{

    const findWinner = (gameBoard) =>{
        let winnerRows = checkRows(gameBoard);
        let winnerColumns = checkColumns(gameBoard);

        if(winnerRows){
            console.log(`winnerRows ${winnerRows}`);
            return winnerRows;
        }
        else if(winnerColumns){
            console.log(`winnerColumns ${winnerColumns}`);
            return winnerColumns;
        }
        else{
            return null;
        }
        
    }

    const checkTypeRows = (board, start, end) =>{
        let xCounter = 0;
        let oCounter = 0;

        for(let i = start; i <= end; i++){
            if(board[i] === 'X'){
                xCounter++;
                if(xCounter === 3) return 'X';
            }
            else if(board[i] === 'O'){
                oCounter++;
                if (oCounter === 3) return 'O';
            }
        }
        return null;
    }

    const checkTypeColumns = (board, start)=>{
        let xCounter = 0;
        let oCounter = 0;

        for(let i = start; i <= start + 6; i += 3 ){
            if(board[i] === 'X'){
                xCounter++;
                if(xCounter === 3) return 'X';
            }
            else if(board[i] === 'O'){
                oCounter++;
                if (oCounter === 3) return 'O';
            }
        }
        return null;
    }

    const checkColumns = (gameBoard) =>{
        let winner
        for(let i = 0; i <= 3; i++){
            if(winner = checkTypeColumns(gameBoard, i)){
                return winner;
            }
        }
        return null;
    }

    const checkRows = (gameBoard) =>{
        let winner;
        if(((winner = checkTypeRows(gameBoard, 0, 2)) !== null) || ((winner = checkTypeRows(gameBoard, 3, 5)) !== null)|| ((winner = checkTypeRows(gameBoard, 6, 8)) !== null)){
            return winner;
        }
        else return null;
    };
    return{findWinner};
})();

const game = (rounds) =>{
    let roundsCounter = 0;
    let score = [0,0];
    let whoType = "X"

    const player1Score = document.querySelector("#player1");
    const player2Score = document.querySelector("#player2");
    
    const setType = () =>{
        whoType = whoType === 'X' ? 'O' : 'X';
    }

    const getWhoType = () => whoType;
    const getRounds = () => rounds;

    const setScore = (winner) =>{
        if(winner.getType === 'X'){
            score[0]++;
        }
        else{
            score[1]++;
        }
    };
    const updateScore = () =>{
        player1Score.innerText = score[0];
        player2Score.innerText = score[1];
    };
    const setRound = () => roundsCounter++;

    const isWinner = (gameBoard) => winRule.findWinner(gameBoard);

    return{setScore, updateScore, setRound, setType, getWhoType, getRounds, isWinner};
}


const player = (type, img) =>{
    const getType = () => type;
    const getImg = () => img;

    return {getType, getImg};
};

let gameBoard = new Array(9).fill(0);

const player1 = player('X', "https://img.icons8.com/nolan/64/x.png");
const player2 = player('O', "https://img.icons8.com/nolan/64/o.png");
const newGame = game(2);

const fileds = document.querySelectorAll(".field");

let moveCounter = 0;

fileds.forEach(element =>{
    element.counter = 0; 
    element.addEventListener('click',()=>{

        if(newGame.getWhoType() === 'X' && element.counter === 0)
        {
            element.counter ++;
            const img = createImg(player1.getImg());
            gameBoard[element.id] = 'X';
            element.appendChild(img);

            round();
        }
        else if(element.counter === 0)
        {
            element.counter ++;
            const img = createImg(player2.getImg());
            gameBoard[element.id] = 'O';
            element.appendChild(img);

            round();
        }
        console.log(gameBoard);
        
    });
});

function round(){
    moveCounter ++;
    newGame.setType();
    let winner = NaN;
    
    if(moveCounter >= 5){
        
        if(winner = newGame.isWinner(gameBoard)){
            // console.log(winner);
            //check a winner
            //clear the board
            
        }
    }
    
}

